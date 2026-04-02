import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// GET /api/v1/calendar - List events
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    const month = searchParams.get('month'); // YYYY-MM format
    const eventType = searchParams.get('type');

    let query = supabase.from('calendar_events').select('*').order('start_date', { ascending: true });
    if (userId) query = query.eq('user_id', userId);
    if (eventType) query = query.eq('event_type', eventType);
    if (month) {
      const start = `${month}-01`;
      const [y, m] = month.split('-').map(Number);
      const end = `${y}-${String(m + 1).padStart(2, '0')}-01`;
      query = query.gte('start_date', start).lt('start_date', end);
    }

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/v1/calendar - Create event
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const body = await request.json();
    const { user_id, title, description, event_type, start_date, end_date, location, color } = body;

    if (!user_id || !title || !start_date) {
      return NextResponse.json({ error: 'user_id, title, and start_date are required' }, { status: 400 });
    }

    const { data, error } = await supabase.from('calendar_events').insert({
      user_id, title, description, event_type: event_type || 'general',
      start_date, end_date, location, color: color || '#0D9488',
    }).select().single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
