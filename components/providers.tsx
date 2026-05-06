'use client';

import { ThemeProvider } from 'next-themes';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { translations, type Lang, type Dict } from '@/lib/i18n';

type LangCtx = {
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
};

const LangContext = createContext<LangCtx | null>(null);

export function useLang() {
  const c = useContext(LangContext);
  if (!c) throw new Error('useLang outside provider');
  return c;
}

function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (typeof window !== 'undefined' && localStorage.getItem('vexlap-lang')) as Lang | null;
    if (stored === 'ar' || stored === 'en') setLangState(stored);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('vexlap-lang', lang);
  }, [lang, mounted]);

  const setLang = (l: Lang) => setLangState(l);
  const t = translations[lang];

  return <LangContext.Provider value={{ lang, t, setLang }}>{children}</LangContext.Provider>;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <LangProvider>{children}</LangProvider>
    </ThemeProvider>
  );
}
