import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// GET /api/v1/analytics - Get study analytics for a user
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
      return NextResponse.json({ error: 'user_id is required' }, { status: 400 });
    }

    // Fetch data in parallel
    const [coursesRes, sessionsRes, deadlinesRes, notesRes] = await Promise.all([
      supabase.from('courses').select('*').eq('user_id', userId),
      supabase.from('study_sessions').select('*').eq('user_id', userId).order('session_date', { ascending: false }).limit(30),
      supabase.from('deadlines').select('*').eq('user_id', userId),
      supabase.from('notes').select('id').eq('user_id', userId),
    ]);

    const courses = coursesRes.data || [];
    const sessions = sessionsRes.data || [];
    const deadlines = deadlinesRes.data || [];

    // Calculate GPA
    const totalCredits = courses.reduce((acc, c) => acc + (c.credits || 0), 0);
    const totalPoints = courses.reduce((acc, c) => acc + (c.credits || 0) * (c.grade_point || 0), 0);
    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

    // Calculate total study hours this week
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekSessions = sessions.filter(s => new Date(s.session_date) >= weekAgo);
    const totalHoursThisWeek = weekSessions.reduce((acc, s) => acc + (s.duration_minutes || 0), 0) / 60;

    // Deadline stats
    const completedDeadlines = deadlines.filter(d => d.status === 'completed').length;
    const pendingDeadlines = deadlines.filter(d => d.status === 'todo' || d.status === 'in_progress').length;

    // Daily study hours for the week (Mon-Sun)
    const dailyHours = Array.from({ length: 7 }, (_, dayIdx) => {
      const d = new Date();
      d.setDate(d.getDate() - d.getDay() + dayIdx + 1); // Mon=1
      const dateStr = d.toISOString().split('T')[0];
      const dayMins = sessions
        .filter(s => s.session_date === dateStr)
        .reduce((acc, s) => acc + (s.duration_minutes || 0), 0);
      return parseFloat((dayMins / 60).toFixed(1));
    });

    return NextResponse.json({
      data: {
        gpa: parseFloat(gpa),
        totalCredits,
        totalCourses: courses.length,
        totalStudyHoursWeek: parseFloat(totalHoursThisWeek.toFixed(1)),
        completedDeadlines,
        pendingDeadlines,
        totalNotes: notesRes.data?.length || 0,
        dailyStudyHours: dailyHours,
        courses: courses.map(c => ({
          name: c.name,
          code: c.code,
          grade: c.grade,
          gradePoint: c.grade_point,
          credits: c.credits,
        })),
      },
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
