import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// GET /api/v1/deadlines - List all deadlines for the user
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');

    let query = supabase.from('deadlines').select('*').order('due_date', { ascending: true });

    if (userId) query = query.eq('user_id', userId);
    if (status) query = query.eq('status', status);
    if (priority) query = query.eq('priority', priority);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/v1/deadlines - Create a new deadline
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const body = await request.json();
    const { user_id, title, description, course_code, subject, due_date, priority, status } = body;

    if (!user_id || !title || !due_date) {
      return NextResponse.json({ error: 'user_id, title, and due_date are required' }, { status: 400 });
    }

    const { data, error } = await supabase.from('deadlines').insert({
      user_id, title, description, course_code, subject, due_date,
      priority: priority || 'medium',
      status: status || 'todo',
    }).select().single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
