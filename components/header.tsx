"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Moon, Sun, Globe, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/language-context"

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar")
  }

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                src="/images/vexlap-logo.png"
                alt="VEXLAP Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tight text-foreground">
              VEXLAP
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              {t("nav.features")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              {t("nav.howItWorks")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              {t("nav.contact")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full hover:bg-primary/10"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4 md:w-5 md:h-5" />
              <span className="sr-only">
                {language === "ar" ? "EN" : "AR"}
              </span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full hover:bg-primary/10"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <Moon className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </Button>

            {/* CTA Button - Desktop */}
            <Button
              size="sm"
              className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 font-semibold shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:scale-105"
            >
              {t("nav.startNow")}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-80 pb-4" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col gap-3 pt-4 border-t border-border">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
            >
              {t("nav.features")}
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
            >
              {t("nav.howItWorks")}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
            >
              {t("nav.contact")}
            </a>
            <Button
              size="sm"
              className="w-full mt-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold"
            >
              {t("nav.startNow")}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
