'use client';

import { useEffect, useState } from 'react';
import { DashboardShell } from '@/components/dashboard-shell';
import { useLang } from '@/components/providers';
import { supabase, type Student } from '@/lib/supabase';
import { loadSession } from '@/lib/session';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { GraduationCap, XCircle } from 'lucide-react';

export default function Page() {
  return (
    <DashboardShell allow={['TEACHER']}>
      <View />
    </DashboardShell>
  );
}

function View() {
  const { t } = useLang();
  const [list, setList] = useState<Student[]>([]);

  useEffect(() => {
    (async () => {
      const u = loadSession();
      if (!u?.school_id) return;
      const { data } = await supabase.from('students').select('*').eq('school_id', u.school_id);
      setList((data as Student[]) ?? []);
    })();
  }, []);

  async function markAbsent(s: Student) {
    const u = loadSession();
    if (!u?.school_id) return;
    const { error } = await supabase.from('attendance_records').insert({
      student_id: s.id,
      school_id: u.school_id,
      status: 'ABSENT',
    });
    if (error) return toast.error(error.message);
    toast.success(`${t.absent}: ${s.name}`);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">{t.students}</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => (
          <div key={s.id} className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 flex items-center justify-center">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.grade}</p>
            </div>
            <Button size="sm" variant="outline" className="gap-1" onClick={() => markAbsent(s)}>
              <XCircle className="h-4 w-4" />
              {t.absent}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
