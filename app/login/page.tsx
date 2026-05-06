'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { toast } from 'sonner';
import { supabase, type AppUser, type Role } from '@/lib/supabase';
import { saveSession } from '@/lib/session';
import { useLang } from '@/components/providers';
import { LangToggle, ThemeToggle } from '@/components/toggles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, LogIn, Copy, Home } from 'lucide-react';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

const ROUTE_BY_ROLE: Record<Role, string> = {
  SUPER_ADMIN: '/dashboard/super',
  SCHOOL_ADMIN: '/dashboard/admin',
  TEACHER: '/dashboard/teacher',
  SECURITY: '/dashboard/gate',
};

const DEMO = [
  { role: 'SUPER_ADMIN', email: 'super@vexlap.com', password: 'super123' },
  { role: 'SCHOOL_ADMIN', email: 'admin@vexlap.com', password: 'admin123' },
  { role: 'SECURITY', email: 'gate@vexlap.com', password: 'gate123' },
  { role: 'TEACHER', email: 'teacher@vexlap.com', password: 'teacher123' },
];

export default function LoginPage() {
  const { t } = useLang();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = LoginSchema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('app_users')
      .select('id, role, school_id, email, password, name')
      .eq('email', parsed.data.email)
      .maybeSingle();
    setLoading(false);

    if (error || !data) {
      toast.error('Invalid credentials');
      return;
    }
    if (data.password !== parsed.data.password) {
      toast.error('Invalid credentials');
      return;
    }
    const user: AppUser = {
      id: data.id,
      role: data.role as Role,
      school_id: data.school_id,
      email: data.email,
      name: data.name,
    };
    saveSession(user);
    toast.success(`${t.welcome}, ${user.name}`);
    router.push(ROUTE_BY_ROLE[user.role]);
  }

  function fillDemo(d: (typeof DEMO)[number]) {
    setEmail(d.email);
    setPassword(d.password);
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="relative hidden lg:flex items-center justify-center p-12 overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-900 text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_80%,white,transparent_40%)]" />
        <div className="relative max-w-md">
          <img src="/vexlap_logo_fully_transparent.png" alt="VEXLAP" className="h-16 w-auto mb-8 brightness-200" />
          <h2 className="text-3xl font-bold leading-tight">{t.heroTitle}</h2>
          <p className="mt-4 text-white/85 leading-relaxed">{t.heroSub}</p>
          <div className="mt-10 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur">
            <p className="text-sm font-semibold mb-3">{t.demoAccounts}</p>
            <div className="space-y-2">
              {DEMO.map((d) => (
                <button
                  key={d.email}
                  type="button"
                  onClick={() => fillDemo(d)}
                  className="w-full flex items-center justify-between gap-3 rounded-lg bg-white/5 hover:bg-white/15 px-3 py-2 text-sm transition"
                >
                  <span className="font-medium">{d.role}</span>
                  <span className="text-white/80 text-xs font-mono">{d.email}</span>
                  <Copy className="h-3.5 w-3.5 opacity-70" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
              <Home className="h-4 w-4" />
              {t.home}
            </Link>
            <div className="flex items-center gap-1">
              <LangToggle />
              <ThemeToggle />
            </div>
          </div>

          <div className="lg:hidden mb-6 flex justify-center">
            <img src="/vexlap_logo_fully_transparent.png" alt="VEXLAP" className="h-12 w-auto" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold">{t.signIn}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t.tagline}</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@school.com"
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full h-11 gap-2" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
              {t.signIn}
            </Button>
          </form>

          <div className="mt-8 lg:hidden rounded-xl border border-border bg-card p-4">
            <p className="text-sm font-semibold mb-2">{t.demoAccounts}</p>
            <div className="space-y-1.5">
              {DEMO.map((d) => (
                <button
                  key={d.email}
                  type="button"
                  onClick={() => fillDemo(d)}
                  className="w-full text-start rounded-md hover:bg-muted px-2 py-1.5 text-xs flex justify-between"
                >
                  <span className="font-medium">{d.role}</span>
                  <span className="font-mono text-muted-foreground">{d.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
