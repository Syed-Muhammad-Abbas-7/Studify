import { NextResponse } from 'next/server';
import { callGroqAI } from '@/lib/groq';

export async function POST(req: Request) {
  try {
    const { subjects, preferredHours, examDates } = await req.json();

    const prompt = `You are an AI Study Planner. Create a strict, realistic study plan.
    Subjects: ${subjects?.join(', ')}
    Exam Dates: ${JSON.stringify(examDates)}
    Daily Available Hours: ${preferredHours}
    
    Output JSON format only: 
    { "plan": [ { "day": "Monday", "focus": "Physics", "hours": 2, "tips": "Focus on chapters 1-3" } ] }`;

    const aiResponse = await callGroqAI([
      { role: 'system', content: 'You calculate optimized study timetables returning pure JSON.' },
      { role: 'user', content: prompt }
    ]);

    // Cleanup potential markdown blocks
    const jsonStr = aiResponse.replace(/```json/g, '').replace(/```/g, '');
    const data = JSON.parse(jsonStr);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Study Planner API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to generate study plan' }, { status: 500 });
  }
}
