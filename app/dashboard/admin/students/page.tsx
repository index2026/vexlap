'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import { DashboardShell } from '@/components/dashboard-shell';
import { useLang } from '@/components/providers';
import { supabase, type Student } from '@/lib/supabase';
import { loadSession } from '@/lib/session';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, GraduationCap } from 'lucide-react';

const NewStudent = z.object({
  name: z.string().min(2),
  grade: z.string().min(1),
  rfid_uid: z.string().min(3).regex(/^[A-Za-z0-9:_-]+$/),
});

export default function Page() {
  return (
    <DashboardShell allow={['SCHOOL_ADMIN']}>
      <View />
    </DashboardShell>
  );
}

function View() {
  const { t } = useLang();
  const [list, setList] = useState<Student[]>([]);
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [uid, setUid] = useState('');

  async function load() {
    const u = loadSession();
    if (!u?.school_id) return;
    const { data } = await supabase
      .from('students')
      .select('*')
      .eq('school_id', u.school_id)
      .order('created_at', { ascending: false });
    setList((data as Student[]) ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const u = loadSession();
    if (!u?.school_id) return;
    const parsed = NewStudent.safeParse({ name, grade, rfid_uid: uid });
    if (!parsed.success) return toast.error('Invalid data');
    const { error } = await supabase.from('students').insert({ ...parsed.data, school_id: u.school_id });
    if (error) return toast.error(error.message);
    toast.success('Student added');
    setName('');
    setGrade('');
    setUid('');
    load();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">{t.students}</h1>

      <form onSubmit={add} className="rounded-2xl border border-border bg-card p-5 grid gap-4 md:grid-cols-4">
        <div>
          <Label>{t.name}</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label>{t.grade}</Label>
          <Input value={grade} onChange={(e) => setGrade(e.target.value)} required />
        </div>
        <div>
          <Label>{t.rfidUid}</Label>
          <Input value={uid} onChange={(e) => setUid(e.target.value)} required placeholder="RFID-XXXX" />
        </div>
        <div className="flex items-end">
          <Button type="submit" className="w-full gap-2">
            <Plus className="h-4 w-4" />
            {t.add}
          </Button>
        </div>
      </form>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="text-start p-4 font-semibold">{t.name}</th>
                <th className="text-start p-4 font-semibold">{t.grade}</th>
                <th className="text-start p-4 font-semibold">{t.rfidUid}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {list.map((s) => (
                <tr key={s.id} className="hover:bg-muted/30 transition">
                  <td className="p-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 flex items-center justify-center">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{s.name}</span>
                  </td>
                  <td className="p-4 text-muted-foreground">{s.grade}</td>
                  <td className="p-4 font-mono text-xs">{s.rfid_uid}</td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-muted-foreground">—</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
