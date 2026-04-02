import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// GET /api/v1/groups/[id]/messages - Get messages for a group
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = createServerClient();
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    const { data, error } = await supabase
      .from('group_messages')
      .select('*, profiles:user_id(full_name, avatar_url)')
      .eq('group_id', id)
      .order('created_at', { ascending: true })
      .limit(limit);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/v1/groups/[id]/messages - Send a message
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = createServerClient();
    const { id } = await params;
    const body = await request.json();
    const { user_id, content, file_url, file_name, file_size } = body;

    if (!user_id || !content) {
      return NextResponse.json({ error: 'user_id and content are required' }, { status: 400 });
    }

    const { data, error } = await supabase.from('group_messages').insert({
      group_id: id, user_id, content, file_url, file_name, file_size,
    }).select('*, profiles:user_id(full_name, avatar_url)').single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
