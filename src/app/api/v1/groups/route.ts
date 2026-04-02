import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// GET /api/v1/groups - List study groups for the user
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
      return NextResponse.json({ error: 'user_id is required' }, { status: 400 });
    }

    // Get groups the user is a member of
    const { data: memberships, error: memErr } = await supabase
      .from('group_members')
      .select('group_id, role')
      .eq('user_id', userId);

    if (memErr) return NextResponse.json({ error: memErr.message }, { status: 500 });

    const groupIds = (memberships || []).map(m => m.group_id);
    if (groupIds.length === 0) return NextResponse.json({ data: [] });

    const { data: groups, error: grpErr } = await supabase
      .from('study_groups')
      .select('*')
      .in('id', groupIds);

    if (grpErr) return NextResponse.json({ error: grpErr.message }, { status: 500 });
    return NextResponse.json({ data: groups });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/v1/groups - Create a new study group
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const body = await request.json();
    const { name, short_code, description, color, created_by } = body;

    if (!name || !short_code || !created_by) {
      return NextResponse.json({ error: 'name, short_code, and created_by are required' }, { status: 400 });
    }

    // Create group
    const { data: group, error: grpErr } = await supabase.from('study_groups').insert({
      name, short_code, description, color: color || '#0D9488', created_by,
    }).select().single();

    if (grpErr) return NextResponse.json({ error: grpErr.message }, { status: 500 });

    // Add creator as admin member
    await supabase.from('group_members').insert({
      group_id: group.id, user_id: created_by, role: 'admin',
    });

    return NextResponse.json({ data: group }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
