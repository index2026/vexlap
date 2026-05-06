'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun, Languages } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLang } from './providers';
import { Button } from './ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {mounted && theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
      className="gap-2"
    >
      <Languages className="h-4 w-4" />
      {lang === 'ar' ? 'EN' : 'AR'}
    </Button>
  );
}
