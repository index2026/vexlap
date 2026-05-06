"use client"

import { LanguageProvider } from "@/lib/language-context"
import { ThemeProvider } from "@/lib/theme-context"
import { LandingPage } from "@/components/landing-page"

export default function Page() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <LandingPage />
      </LanguageProvider>
    </ThemeProvider>
  )
}
