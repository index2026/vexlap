'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import { DashboardShell } from '@/components/dashboard-shell';
import { useLang } from '@/components/providers';
import { supabase, type School } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Building2 } from 'lucide-react';

const NewSchool = z.object({
  name: z.string().min(2),
  cut_off_time: z.string().regex(/^\d{2}:\d{2}$/),
});

export default function Page() {
  return (
    <DashboardShell allow={['SUPER_ADMIN']}>
      <View />
    </DashboardShell>
  );
}

function View() {
  const { t } = useLang();
  const [list, setList] = useState<School[]>([]);
  const [name, setName] = useState('');
  const [cut, setCut] = useState('09:00');

  async function load() {
    const { data } = await supabase.from('schools').select('*').order('created_at', { ascending: false });
    setList((data as School[]) ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const parsed = NewSchool.safeParse({ name, cut_off_time: cut });
    if (!parsed.success) return toast.error('Invalid data');
    const { error } = await supabase.from('schools').insert(parsed.data);
    if (error) return toast.error(error.message);
    toast.success('School added');
    setName('');
    setCut('09:00');
    load();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">{t.schools}</h1>
      <form onSubmit={add} className="rounded-2xl border border-border bg-card p-5 grid gap-4 md:grid-cols-3">
        <div>
          <Label>{t.name}</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label>{t.cutOffTime}</Label>
          <Input type="time" value={cut} onChange={(e) => setCut(e.target.value)} />
        </div>
        <div className="flex items-end">
          <Button type="submit" className="w-full gap-2">
            <Plus className="h-4 w-4" />
            {t.add}
          </Button>
        </div>
      </form>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="divide-y divide-border">
          {list.map((s) => (
            <div key={s.id} className="flex items-center gap-4 p-4">
              <div className="h-10 w-10 rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 flex items-center justify-center">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{s.name}</p>
                <p className="text-xs text-muted-foreground">{t.cutOffTime}: {s.cut_off_time}</p>
              </div>
            </div>
          ))}
          {list.length === 0 && <p className="p-8 text-center text-muted-foreground text-sm">—</p>}
        </div>
      </div>
    </div>
  );
}
