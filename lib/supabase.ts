import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anon, {
  auth: { persistSession: false },
});

export type Role = 'SUPER_ADMIN' | 'SCHOOL_ADMIN' | 'TEACHER' | 'SECURITY';

export type AppUser = {
  id: string;
  role: Role;
  school_id: string | null;
  email: string;
  name: string;
};

export type Student = {
  id: string;
  school_id: string;
  name: string;
  rfid_uid: string;
  grade: string;
};

export type AttendanceRecord = {
  id: string;
  student_id: string;
  school_id: string;
  timestamp: string;
  status: 'PRESENT' | 'ABSENT';
};

export type School = {
  id: string;
  name: string;
  cut_off_time: string;
};
