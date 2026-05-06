'use client';

import { useEffect, useState } from 'react';
import { DashboardShell } from '@/components/dashboard-shell';
import { useLang } from '@/components/providers';
import { supabase } from '@/lib/supabase';
import { loadSession } from '@/lib/session';
import { Users, CheckCircle2, XCircle } from 'lucide-react';

export default function Page() {
  return (
    <DashboardShell allow={['SCHOOL_ADMIN']}>
      <View />
    </DashboardShell>
  );
}

function View() {
  const { t } = useLang();
  const [stats, setStats] = useState({ total: 0, present: 0, absent: 0 });

  useEffect(() => {
    (async () => {
      const u = loadSession();
      if (!u?.school_id) return;
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const { count: total } = await supabase
        .from('students')
        .select('*', { count: 'exact', head: true })
        .eq('school_id', u.school_id);

      const { data: atts } = await supabase
        .from('attendance_records')
        .select('student_id')
        .eq('school_id', u.school_id)
        .gte('timestamp', todayStart.toISOString());

      const present = new Set((atts ?? []).map((a: any) => a.student_id)).size;
      setStats({ total: total ?? 0, present, absent: Math.max(0, (total ?? 0) - present) });
    })();
  }, []);

  const cards = [
    { label: t.totalStudents, value: stats.total, icon: Users, color: 'bg-brand-600' },
    { label: t.presentToday, value: stats.present, icon: CheckCircle2, color: 'bg-emerald-600' },
    { label: t.absentToday, value: stats.absent, icon: XCircle, color: 'bg-rose-600' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">{t.dashboard}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className={`h-10 w-10 rounded-lg ${c.color} text-white flex items-center justify-center mb-3`}>
              <c.icon className="h-5 w-5" />
            </div>
            <p className="text-sm text-muted-foreground">{c.label}</p>
            <p className="text-3xl font-bold mt-1">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
