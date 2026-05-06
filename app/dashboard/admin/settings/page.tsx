'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import { DashboardShell } from '@/components/dashboard-shell';
import { useLang } from '@/components/providers';
import { supabase } from '@/lib/supabase';
import { loadSession } from '@/lib/session';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Schema = z.object({
  name: z.string().min(2),
  cut_off_time: z.string().regex(/^\d{2}:\d{2}$/),
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
  const [name, setName] = useState('');
  const [cut, setCut] = useState('09:00');
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const u = loadSession();
      if (!u?.school_id) return;
      const { data } = await supabase.from('schools').select('*').eq('id', u.school_id).maybeSingle();
      if (data) {
        setId(data.id);
        setName(data.name);
        setCut(data.cut_off_time);
      }
    })();
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    const parsed = Schema.safeParse({ name, cut_off_time: cut });
    if (!parsed.success) return toast.error('Invalid data');
    const { error } = await supabase.from('schools').update(parsed.data).eq('id', id);
    if (error) return toast.error(error.message);
    toast.success('Saved');
  }

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl md:text-3xl font-bold">{t.settings}</h1>
      <form onSubmit={save} className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <div>
          <Label>{t.name}</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label>{t.cutOffTime}</Label>
          <Input type="time" value={cut} onChange={(e) => setCut(e.target.value)} />
        </div>
        <Button type="submit" className="w-full">{t.save}</Button>
      </form>
    </div>
  );
}
