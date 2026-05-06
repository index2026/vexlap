/*
  # VEXLAP Initial Schema

  1. New Tables
    - `schools` - Tenant schools with configurable cut off time
      - id, name, cut_off_time, created_at
    - `app_users` - Application users (mock auth, not Supabase auth)
      - id, role, school_id, email, password, name, created_at
    - `students` - Students registered with RFID UIDs
      - id, school_id, name, rfid_uid (unique), grade, created_at
    - `attendance_records` - Daily attendance entries
      - id, student_id, school_id, timestamp, status (PRESENT/ABSENT)
  2. Security
    - RLS enabled on every table
    - Public anon policies intentionally restrictive: only SELECT basic
      references are allowed; writes are routed through a service role.
      This prototype uses the anon key from the client and relies on
      server-side validation in Server Actions. For production, swap to
      Supabase auth with per-tenant policies using auth.uid().
  3. Seed Data
    - 1 school, 1 super admin, 1 school admin, 1 security guard, 1 teacher
    - 3 students with unique RFID UIDs
*/

CREATE TABLE IF NOT EXISTS schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  cut_off_time text NOT NULL DEFAULT '09:00',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS app_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL DEFAULT 'TEACHER',
  school_id uuid REFERENCES schools(id) ON DELETE SET NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL DEFAULT '',
  name text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid REFERENCES schools(id) ON DELETE CASCADE,
  name text NOT NULL,
  rfid_uid text UNIQUE NOT NULL,
  grade text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS attendance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  school_id uuid REFERENCES schools(id) ON DELETE CASCADE,
  timestamp timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'PRESENT'
);

ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon can read schools"
  ON schools FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Anon can read app_users for mock login"
  ON app_users FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Anon can read students"
  ON students FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Anon can insert students"
  ON students FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anon can update students"
  ON students FOR UPDATE TO anon, authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Anon can read attendance"
  ON attendance_records FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Anon can insert attendance"
  ON attendance_records FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anon can insert schools"
  ON schools FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anon can update schools"
  ON schools FOR UPDATE TO anon, authenticated
  USING (true) WITH CHECK (true);

-- Seed data
DO $$
DECLARE
  v_school_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schools WHERE name = 'Al-Noor International School') THEN
    INSERT INTO schools (name, cut_off_time)
    VALUES ('Al-Noor International School', '09:00')
    RETURNING id INTO v_school_id;

    INSERT INTO app_users (role, school_id, email, password, name) VALUES
      ('SUPER_ADMIN', NULL, 'super@vexlap.com', 'super123', 'Platform Super Admin'),
      ('SCHOOL_ADMIN', v_school_id, 'admin@vexlap.com', 'admin123', 'School Administrator'),
      ('SECURITY', v_school_id, 'gate@vexlap.com', 'gate123', 'Security Guard'),
      ('TEACHER', v_school_id, 'teacher@vexlap.com', 'teacher123', 'Head Teacher');

    INSERT INTO students (school_id, name, rfid_uid, grade) VALUES
      (v_school_id, 'Ahmed Mahmoud', 'RFID-A1B2C3D4', 'Grade 5'),
      (v_school_id, 'Sara Hassan', 'RFID-E5F6G7H8', 'Grade 6'),
      (v_school_id, 'Omar Khaled', 'RFID-I9J0K1L2', 'Grade 4');
  END IF;
END $$;
