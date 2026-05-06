'use client';

import { useEffect, useState } from 'react';
import { DashboardShell } from '@/components/dashboard-shell';
import { useLang } from '@/components/providers';
import { supabase, type Student } from '@/lib/supabase';
import { loadSession } from '@/lib/session';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

type Row = Student & { present: boolean; at: string | null };

export default function Page() {
  return (
    <DashboardShell allow={['SCHOOL_ADMIN', 'TEACHER']}>
      <View />
    </DashboardShell>
  );
}

function View() {
  const { t, lang } = useLang();
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    (async () => {
      const u = loadSession();
      if (!u?.school_id) return;
      const dayStart = new Date();
      dayStart.setHours(0, 0, 0, 0);

      const [{ data: students }, { data: atts }] = await Promise.all([
        supabase.from('students').select('*').eq('school_id', u.school_id),
        supabase
          .from('attendance_records')
          .select('student_id, timestamp')
          .eq('school_id', u.school_id)
          .gte('timestamp', dayStart.toISOString()),
      ]);

      const map = new Map<string, string>();
      (atts ?? []).forEach((a: any) => map.set(a.student_id, a.timestamp));
      setRows(
        ((students as Student[]) ?? []).map((s) => ({
          ...s,
          present: map.has(s.id),
          at: map.get(s.id) ?? null,
        }))
      );
    })();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">{t.attendance} — {t.today}</h1>
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-start p-4">{t.name}</th>
                <th className="text-start p-4">{t.grade}</th>
                <th className="text-start p-4">{t.status}</th>
                <th className="text-start p-4">{t.today}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-muted/30">
                  <td className="p-4 font-medium">{r.name}</td>
                  <td className="p-4 text-muted-foreground">{r.grade}</td>
                  <td className="p-4">
                    {r.present ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-2.5 py-1 text-xs font-semibold">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {t.present}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 px-2.5 py-1 text-xs font-semibold">
                        <XCircle className="h-3.5 w-3.5" />
                        {t.absent}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-muted-foreground text-xs">
                    {r.at ? (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {new Date(r.at).toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-US')}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
