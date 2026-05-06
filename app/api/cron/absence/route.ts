import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );

  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);

  const [{ data: schools }, { data: students }, { data: atts }] = await Promise.all([
    supabase.from('schools').select('*'),
    supabase.from('students').select('*'),
    supabase
      .from('attendance_records')
      .select('student_id')
      .gte('timestamp', dayStart.toISOString()),
  ]);

  const presentIds = new Set((atts ?? []).map((a: any) => a.student_id));
  const missing: { name: string; rfid_uid: string; school: string }[] = [];
  const schoolMap = new Map((schools ?? []).map((s: any) => [s.id, s.name]));

  for (const s of students ?? []) {
    if (!presentIds.has(s.id)) {
      const msg = `Simulating WhatsApp/SMS to parents: ${s.name} is absent.`;
      console.log(msg);
      missing.push({
        name: s.name,
        rfid_uid: s.rfid_uid,
        school: schoolMap.get(s.school_id) ?? 'Unknown',
      });
    }
  }

  return NextResponse.json({
    date: new Date().toISOString(),
    totalStudents: students?.length ?? 0,
    present: presentIds.size,
    absent: missing.length,
    missing,
  });
}
