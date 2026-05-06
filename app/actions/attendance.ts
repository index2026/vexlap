'use server';

import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const ScanSchema = z.object({
  rfidUid: z.string().trim().min(3).max(128).regex(/^[A-Za-z0-9:_-]+$/),
  schoolId: z.string().uuid(),
});

export type ScanResult =
  | { ok: true; studentName: string; grade: string; at: string }
  | { ok: false; error: string };

export async function registerAttendance(input: {
  rfidUid: string;
  schoolId: string;
}): Promise<ScanResult> {
  const parsed = ScanSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: 'Invalid input' };
  }
  const supabase = createClient(url, anon, { auth: { persistSession: false } });

  const { data: student, error: sErr } = await supabase
    .from('students')
    .select('id, name, grade, school_id')
    .eq('rfid_uid', parsed.data.rfidUid)
    .eq('school_id', parsed.data.schoolId)
    .maybeSingle();

  if (sErr || !student) {
    return { ok: false, error: 'Card not recognized' };
  }

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { data: existing } = await supabase
    .from('attendance_records')
    .select('id, timestamp')
    .eq('student_id', student.id)
    .gte('timestamp', todayStart.toISOString())
    .maybeSingle();

  if (existing) {
    return {
      ok: true,
      studentName: student.name,
      grade: student.grade,
      at: existing.timestamp,
    };
  }

  const now = new Date().toISOString();
  const { error: iErr } = await supabase.from('attendance_records').insert({
    student_id: student.id,
    school_id: student.school_id,
    timestamp: now,
    status: 'PRESENT',
  });

  if (iErr) {
    return { ok: false, error: 'Failed to save' };
  }

  return { ok: true, studentName: student.name, grade: student.grade, at: now };
}
