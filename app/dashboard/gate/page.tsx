'use client';

import { useEffect, useRef, useState } from 'react';
import { DashboardShell } from '@/components/dashboard-shell';
import { useLang } from '@/components/providers';
import { loadSession } from '@/lib/session';
import { registerAttendance, type ScanResult } from '@/app/actions/attendance';
import { CheckCircle2, XCircle, ScanLine, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

type Feedback =
  | { kind: 'idle' }
  | { kind: 'success'; name: string; grade: string; at: string }
  | { kind: 'error'; msg: string };

export default function GatePage() {
  return (
    <DashboardShell allow={['SECURITY', 'SCHOOL_ADMIN']}>
      <GateView />
    </DashboardShell>
  );
}

function GateView() {
  const { t, lang } = useLang();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);
  const [fb, setFb] = useState<Feedback>({ kind: 'idle' });
  const [count, setCount] = useState(0);
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const id = setInterval(() => {
      if (document.activeElement !== inputRef.current) inputRef.current?.focus();
    }, 800);
    return () => clearInterval(id);
  }, []);

  async function submit(uid: string) {
    const user = loadSession();
    if (!user?.school_id) {
      setFb({ kind: 'error', msg: 'No school context' });
      return;
    }
    setBusy(true);
    const res: ScanResult = await registerAttendance({
      rfidUid: uid,
      schoolId: user.school_id,
    });
    setBusy(false);
    if (res.ok) {
      setFb({ kind: 'success', name: res.studentName, grade: res.grade, at: res.at });
      setCount((c) => c + 1);
    } else {
      setFb({ kind: 'error', msg: res.error });
    }
    if (resetTimer.current) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setFb({ kind: 'idle' }), 2800);
    setValue('');
    inputRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const v = value.trim();
      if (v.length >= 3) submit(v);
    }
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center">
      <div
        className={cn(
          'relative w-full max-w-2xl rounded-3xl border p-8 md:p-14 text-center transition-all duration-300 shadow-xl',
          fb.kind === 'success' && 'bg-success text-success-foreground border-success',
          fb.kind === 'error' && 'bg-destructive text-destructive-foreground border-destructive',
          fb.kind === 'idle' && 'bg-card border-border'
        )}
      >
        {fb.kind === 'idle' && (
          <>
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 animate-pulse-ring">
              <ScanLine className="h-12 w-12" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">{t.scanCard}</h2>
            <p className="mt-3 text-muted-foreground">{t.scanHint}</p>
            {busy && <p className="mt-4 text-sm text-brand-600">...</p>}
          </>
        )}

        {fb.kind === 'success' && (
          <div className="animate-fade-up">
            <CheckCircle2 className="mx-auto h-24 w-24" strokeWidth={2.2} />
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold">{t.success}</h2>
            <p className="mt-4 text-2xl md:text-3xl font-bold">{fb.name}</p>
            <p className="mt-1 text-base opacity-90">{fb.grade}</p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm opacity-90">
              <Clock className="h-4 w-4" />
              {new Date(fb.at).toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-US')}
            </p>
          </div>
        )}

        {fb.kind === 'error' && (
          <div className="animate-fade-up">
            <XCircle className="mx-auto h-24 w-24" strokeWidth={2.2} />
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold">{t.invalidCard}</h2>
            <p className="mt-3 opacity-90">{fb.msg}</p>
          </div>
        )}

        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          className="absolute inset-0 w-full h-full opacity-0 cursor-default"
          autoFocus
          aria-label="RFID reader input"
          autoComplete="off"
        />
      </div>

      <div className="mt-6 text-sm text-muted-foreground">
        {t.totalStudents}: <span className="font-semibold text-foreground">{count}</span>
      </div>
    </div>
  );
}
