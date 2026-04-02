import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// GET /api/v1/courses - List courses for GPA calculator
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    let query = supabase.from('courses').select('*').order('created_at', { ascending: true });
    if (userId) query = query.eq('user_id', userId);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/v1/courses - Add a new course
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const body = await request.json();
    const { user_id, name, code, credits, grade, grade_point, semester } = body;

    if (!user_id || !name || !code) {
      return NextResponse.json({ error: 'user_id, name, and code are required' }, { status: 400 });
    }

    const { data, error } = await supabase.from('courses').insert({
      user_id, name, code, credits: credits || 3, grade, grade_point, semester,
    }).select().single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
