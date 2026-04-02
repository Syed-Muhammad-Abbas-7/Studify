import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// GET /api/v1/dashboard - Aggregate dashboard data
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
      return NextResponse.json({ error: 'user_id is required' }, { status: 400 });
    }

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    // Fetch everything in parallel
    const [profileRes, deadlinesRes, eventsRes, sessionsRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).single(),
      supabase.from('deadlines').select('*').eq('user_id', userId)
        .gte('due_date', now.toISOString()).order('due_date', { ascending: true }).limit(5),
      supabase.from('calendar_events').select('*').eq('user_id', userId)
        .gte('start_date', now.toISOString()).order('start_date', { ascending: true }).limit(3),
      supabase.from('study_sessions').select('*').eq('user_id', userId)
        .order('session_date', { ascending: false }).limit(30),
    ]);

    const profile = profileRes.data;
    const upcomingDeadlines = deadlinesRes.data || [];
    const upcomingEvents = eventsRes.data || [];
    const recentSessions = sessionsRes.data || [];

    // Calculate streak
    let streakCount = 0;
    const sessionDates = [...new Set(recentSessions.map(s => s.session_date))].sort().reverse();
    const today = new Date(todayStr);
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const checkStr = checkDate.toISOString().split('T')[0];
      if (sessionDates.includes(checkStr)) {
        streakCount++;
      } else if (i > 0) {
        break; // Streak broken
      }
    }

    return NextResponse.json({
      data: {
        profile: {
          name: profile?.full_name || 'Student',
          avatar_url: profile?.avatar_url,
          major: profile?.major,
          streak: streakCount,
        },
        upcomingDeadlines,
        upcomingEvents,
        streakDays: sessionDates.slice(0, 28),
        todayStudyMinutes: recentSessions
          .filter(s => s.session_date === todayStr)
          .reduce((acc, s) => acc + (s.duration_minutes || 0), 0),
      },
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
