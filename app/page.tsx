'use client';

import Link from 'next/link';
import { useLang } from '@/components/providers';
import { LangToggle, ThemeToggle } from '@/components/toggles';
import { Button } from '@/components/ui/button';
import {
  ShieldCheck,
  Zap,
  Users,
  Bell,
  Mail,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

export default function HomePage() {
  const { t, lang } = useLang();
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  const features = [
    { icon: Zap, title: t.f1, desc: t.f1d },
    { icon: Users, title: t.f2, desc: t.f2d },
    { icon: Bell, title: t.f3, desc: t.f3d },
    { icon: ShieldCheck, title: t.f4, desc: t.f4d },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <img src="/vexlap_logo_fully_transparent.png" alt="VEXLAP" className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <LangToggle />
            <ThemeToggle />
            <Link href="/login">
              <Button size="sm" className="gap-2 shadow-sm">
                {t.login}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/60 via-background to-background dark:from-brand-950/40" />
          <div className="absolute -top-40 start-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl" />
          <div className="container mx-auto px-4 py-20 md:py-28 text-center">
            <div className="animate-fade-up mx-auto max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-sm text-muted-foreground mb-6 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                {t.enterprise}
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                <span className="brand-text-gradient">{t.heroTitle}</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t.heroSub}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href="/login">
                  <Button size="lg" className="gap-2 h-12 px-6 text-base shadow-lg shadow-brand-600/20">
                    {t.getStarted}
                    <Arrow className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="h-12 px-6 text-base">
                    {t.features}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">{t.features}</h2>
            <p className="mt-3 text-muted-foreground">{t.featuresSub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-20">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-brand-600 to-brand-800 p-8 md:p-12 text-white shadow-xl">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">{t.heroTitle}</h3>
                <p className="mt-3 text-white/85 leading-relaxed">{t.heroSub}</p>
                <Link href="/login" className="inline-block mt-6">
                  <Button size="lg" variant="secondary" className="gap-2">
                    {t.getStarted}
                    <Arrow className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <ul className="space-y-3">
                {[t.f1, t.f2, t.f3, t.f4].map((x) => (
                  <li key={x} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card/40">
        <div className="container mx-auto px-4 py-12 grid gap-10 md:grid-cols-3">
          <div>
            <img src="/vexlap_logo_fully_transparent.png" alt="VEXLAP" className="h-12 w-auto mb-3" />
            <p className="text-sm text-muted-foreground max-w-xs">{t.tagline}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">{t.quickLinks}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground transition">{t.home}</Link></li>
              <li><Link href="#features" className="hover:text-foreground transition">{t.features}</Link></li>
              <li><Link href="/login" className="hover:text-foreground transition">{t.login}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">{t.contact}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:info@vexlap.com" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
                  <Mail className="h-4 w-4 text-brand-600" />
                  info@vexlap.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/0105500189" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
                  <MessageCircle className="h-4 w-4 text-success" />
                  0105500189
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} VEXLAP. {t.allRightsReserved}.
        </div>
      </footer>
    </div>
  );
}
