import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// GET /api/v1/notes
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    const collection = searchParams.get('collection');

    let query = supabase.from('notes').select('*').order('updated_at', { ascending: false });
    if (userId) query = query.eq('user_id', userId);
    if (collection) query = query.eq('collection', collection);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/v1/notes
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const body = await request.json();
    const { user_id, title, content, collection, tags, course_code } = body;

    if (!user_id || !title) {
      return NextResponse.json({ error: 'user_id and title are required' }, { status: 400 });
    }

    const { data, error } = await supabase.from('notes').insert({
      user_id, title, content: content || '', collection, tags: tags || [], course_code,
    }).select().single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
