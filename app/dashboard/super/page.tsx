'use client';

import { useEffect, useState } from 'react';
import { DashboardShell } from '@/components/dashboard-shell';
import { useLang } from '@/components/providers';
import { supabase } from '@/lib/supabase';
import { Building2, Users, CalendarCheck, TrendingUp } from 'lucide-react';

export default function Page() {
  return (
    <DashboardShell allow={['SUPER_ADMIN']}>
      <SuperView />
    </DashboardShell>
  );
}

function SuperView() {
  const { t } = useLang();
  const [stats, setStats] = useState({ schools: 0, students: 0, attendance: 0 });

  useEffect(() => {
    (async () => {
      const [{ count: s }, { count: st }, { count: a }] = await Promise.all([
        supabase.from('schools').select('*', { count: 'exact', head: true }),
        supabase.from('students').select('*', { count: 'exact', head: true }),
        supabase.from('attendance_records').select('*', { count: 'exact', head: true }),
      ]);
      setStats({ schools: s ?? 0, students: st ?? 0, attendance: a ?? 0 });
    })();
  }, []);

  const cards = [
    { label: t.schools, value: stats.schools, icon: Building2, color: 'bg-brand-600' },
    { label: t.totalStudents, value: stats.students, icon: Users, color: 'bg-sky-600' },
    { label: t.attendance, value: stats.attendance, icon: CalendarCheck, color: 'bg-emerald-600' },
    { label: 'Growth', value: '+12%', icon: TrendingUp, color: 'bg-amber-600' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">{t.dashboard}</h1>
        <p className="text-muted-foreground mt-1">{t.enterprise}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className={`h-10 w-10 rounded-lg ${c.color} text-white flex items-center justify-center mb-3`}>
              <c.icon className="h-5 w-5" />
            </div>
            <p className="text-sm text-muted-foreground">{c.label}</p>
            <p className="text-2xl font-bold mt-1">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-semibold mb-2">{t.schools}</h2>
        <p className="text-sm text-muted-foreground">Manage platform-wide tenants.</p>
      </div>
    </div>
  );
}
