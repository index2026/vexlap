'use client';

import { useEffect, useState } from 'react';
import { DashboardShell } from '@/components/dashboard-shell';
import { useLang } from '@/components/providers';
import { supabase } from '@/lib/supabase';
import { loadSession } from '@/lib/session';
import { Users } from 'lucide-react';

export default function Page() {
  return (
    <DashboardShell allow={['TEACHER']}>
      <View />
    </DashboardShell>
  );
}

function View() {
  const { t } = useLang();
  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {
      const u = loadSession();
      if (!u?.school_id) return;
      const { count } = await supabase
        .from('students')
        .select('*', { count: 'exact', head: true })
        .eq('school_id', u.school_id);
      setCount(count ?? 0);
    })();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">{t.dashboard}</h1>
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm max-w-sm">
        <div className="h-10 w-10 rounded-lg bg-brand-600 text-white flex items-center justify-center mb-3">
          <Users className="h-5 w-5" />
        </div>
        <p className="text-sm text-muted-foreground">{t.totalStudents}</p>
        <p className="text-3xl font-bold mt-1">{count}</p>
      </div>
    </div>
  );
}
