'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { loadSession, clearSession } from '@/lib/session';
import { useLang } from './providers';
import { LangToggle, ThemeToggle } from './toggles';
import { Button } from './ui/button';
import type { Role, AppUser } from '@/lib/supabase';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  Settings,
  ScanLine,
  LogOut,
  Menu,
  X,
  CalendarCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItem = { href: string; label: string; icon: any };

function useNav(role: Role | null): NavItem[] {
  const { t } = useLang();
  if (!role) return [];
  switch (role) {
    case 'SUPER_ADMIN':
      return [
        { href: '/dashboard/super', label: t.dashboard, icon: LayoutDashboard },
        { href: '/dashboard/super/schools', label: t.schools, icon: Building2 },
      ];
    case 'SCHOOL_ADMIN':
      return [
        { href: '/dashboard/admin', label: t.dashboard, icon: LayoutDashboard },
        { href: '/dashboard/admin/students', label: t.students, icon: GraduationCap },
        { href: '/dashboard/admin/attendance', label: t.attendance, icon: CalendarCheck },
        { href: '/dashboard/admin/settings', label: t.settings, icon: Settings },
      ];
    case 'TEACHER':
      return [
        { href: '/dashboard/teacher', label: t.dashboard, icon: LayoutDashboard },
        { href: '/dashboard/teacher/students', label: t.students, icon: Users },
      ];
    case 'SECURITY':
      return [{ href: '/dashboard/gate', label: t.rfidGate, icon: ScanLine }];
  }
}

export function DashboardShell({
  children,
  allow,
}: {
  children: ReactNode;
  allow: Role[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { t, lang } = useLang();
  const [user, setUser] = useState<AppUser | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const u = loadSession();
    if (!u) {
      router.replace('/login');
      return;
    }
    if (!allow.includes(u.role)) {
      router.replace('/login');
      return;
    }
    setUser(u);
    setReady(true);
  }, [allow, router]);

  const nav = useNav(user?.role ?? null);

  function signOut() {
    clearSession();
    router.replace('/login');
  }

  if (!ready || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-8 w-8 rounded-full border-2 border-brand-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  const side = lang === 'ar' ? 'right' : 'left';

  return (
    <div className="min-h-screen bg-muted/30">
      <aside
        className={cn(
          'fixed inset-y-0 z-40 w-72 bg-card border-border flex flex-col transition-transform',
          side === 'right' ? 'right-0 border-s' : 'left-0 border-e',
          open ? 'translate-x-0' : side === 'right' ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <img src="/vexlap_logo_fully_transparent.png" alt="VEXLAP" className="h-9 w-auto" />
          </Link>
          <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition',
                  active
                    ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="rounded-lg bg-muted p-3">
            <p className="text-sm font-semibold truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-brand-600 font-bold">{user.role}</p>
          </div>
          <Button variant="outline" className="w-full mt-3 gap-2" onClick={signOut}>
            <LogOut className="h-4 w-4" />
            {t.logout}
          </Button>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      <div className={cn('flex flex-col min-h-screen', side === 'right' ? 'lg:pe-72' : 'lg:ps-72')}>
        <header className="sticky top-0 z-20 h-16 border-b border-border bg-background/80 backdrop-blur-lg flex items-center px-4 gap-3">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-sm font-semibold text-muted-foreground truncate flex-1">
            {t.welcome}, {user.name}
          </h1>
          <LangToggle />
          <ThemeToggle />
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
