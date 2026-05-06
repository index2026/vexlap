"use client"

import Image from "next/image"
import { QrCode, Users, BarChart3, Clock, Shield, Smartphone, CheckCircle, Mail, MessageCircle, ArrowLeft, ArrowRight, Sparkles, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { useLanguage } from "@/lib/language-context"

export function LandingPage() {
  const { t, language } = useLanguage()
  const Arrow = language === "ar" ? ArrowLeft : ArrowRight

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Content */}
            <div className="flex-1 text-center lg:text-start">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
                <Sparkles className="w-4 h-4" />
                <span>{t("hero.badge")}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance">
                {t("hero.title1")}{" "}
                <span className="text-primary relative">
                  {t("hero.titleHighlight")}
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 10C50 4 150 4 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/30" />
                  </svg>
                </span>{" "}
                {t("hero.title2")}
              </h1>

              {/* Description */}
              <p className="text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                {t("hero.description")}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105 group"
                >
                  <span>{t("hero.tryFree")}</span>
                  <Arrow className="w-4 h-4 ms-2 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-6 text-base font-semibold border-2 hover:bg-muted transition-all group"
                >
                  <Play className="w-4 h-4 me-2" />
                  <span>{t("hero.watchDemo")}</span>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center lg:justify-start gap-6 sm:gap-10 mt-12 pt-8 border-t border-border">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">+500</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{t("hero.institutions")}</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">+50K</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{t("hero.students")}</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">99%</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{t("hero.accuracy")}</p>
                </div>
              </div>
            </div>

            {/* Visual - Interactive Card */}
            <div className="flex-1 flex justify-center w-full max-w-md lg:max-w-none">
              <div className="relative w-full max-w-sm">
                {/* Main Card */}
                <Card className="relative bg-card border-border shadow-2xl shadow-black/10 dark:shadow-black/30">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-foreground">{t("card.todaySession")}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">{t("card.math")}</p>
                      </div>
                      <div className="flex items-center gap-1.5 bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1.5 rounded-full text-xs font-semibold">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span>{t("card.active")}</span>
                      </div>
                    </div>

                    {/* QR Code Display */}
                    <div className="bg-muted rounded-2xl p-6 text-center mb-5">
                      <div className="w-24 h-24 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                        <QrCode className="w-14 h-14 text-primary" />
                      </div>
                      <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                        {t("card.scanToCheckin")}
                      </p>
                    </div>

                    {/* Students List */}
                    <div className="space-y-3">
                      <StudentRow name={t("student.ahmed")} id="STD-001" status="present" t={t} />
                      <StudentRow name={t("student.sara")} id="STD-002" status="present" t={t} />
                      <StudentRow name={t("student.mohamed")} id="STD-003" status="late" t={t} />
                    </div>
                  </CardContent>
                </Card>

                {/* Floating Stats Cards */}
                <div className="absolute -top-4 -end-4 sm:-top-6 sm:-end-6 bg-card border border-border rounded-2xl p-3 sm:p-4 shadow-xl animate-bounce-slow">
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">{t("card.attendanceRate")}</p>
                  <p className="text-xl sm:text-2xl font-bold text-primary">94%</p>
                </div>
                <div className="absolute -bottom-4 -start-4 sm:-bottom-6 sm:-start-6 bg-card border border-border rounded-2xl p-3 sm:p-4 shadow-xl animate-bounce-slow animation-delay-500">
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">{t("card.todayStudents")}</p>
                  <p className="text-xl sm:text-2xl font-bold text-accent">128</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 lg:py-32 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">
              {t("features.label")}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              {t("features.title1")} <span className="text-primary">{t("features.titleHighlight")}</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base">
              {t("features.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            <FeatureCard
              icon={<QrCode className="w-6 h-6" />}
              title={t("features.qr.title")}
              description={t("features.qr.desc")}
              featured
              t={t}
            />
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6" />}
              title={t("features.reports.title")}
              description={t("features.reports.desc")}
              t={t}
            />
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title={t("features.students.title")}
              description={t("features.students.desc")}
              t={t}
            />
            <FeatureCard
              icon={<Clock className="w-6 h-6" />}
              title={t("features.tracking.title")}
              description={t("features.tracking.desc")}
              t={t}
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title={t("features.security.title")}
              description={t("features.security.desc")}
              t={t}
            />
            <FeatureCard
              icon={<Smartphone className="w-6 h-6" />}
              title={t("features.mobile.title")}
              description={t("features.mobile.desc")}
              t={t}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 lg:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">
              {t("how.label")}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              {t("how.title1")} <span className="text-primary">{t("how.titleHighlight")}</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base">
              {t("how.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
            {/* Connection Line - Desktop */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50 -translate-y-1/2 z-0" />
            
            <StepCard number="1" title={t("how.step1.title")} description={t("how.step1.desc")} />
            <StepCard number="2" title={t("how.step2.title")} description={t("how.step2.desc")} />
            <StepCard number="3" title={t("how.step3.title")} description={t("how.step3.desc")} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 lg:py-32 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">
              {t("contact.label")}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              {t("contact.title1")} <span className="text-primary">{t("contact.titleHighlight")}</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base">
              {t("contact.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            <a href="mailto:info@vexlap.com" className="block">
              <Card className="h-full bg-card border-border hover:border-primary hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Mail className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">{t("contact.email")}</h3>
                  <p className="text-sm text-muted-foreground font-mono">info@vexlap.com</p>
                </CardContent>
              </Card>
            </a>
            <a href="https://wa.me/201234567890" target="_blank" rel="noopener noreferrer" className="block">
              <Card className="h-full bg-card border-border hover:border-green-500 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-green-500 transition-all duration-300">
                    <MessageCircle className="w-7 h-7 text-green-600 group-hover:text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">{t("contact.whatsapp")}</h3>
                  <p className="text-sm text-muted-foreground font-mono">+20 123 456 7890</p>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            {t("cta.title1")} <span className="text-primary">{t("cta.titleHighlight")}</span>{t("cta.title2")}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-sm md:text-base">
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105"
            >
              {t("cta.freeTrial")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-base font-semibold border-2 hover:bg-muted transition-all"
            >
              {t("cta.talkToSales")}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 md:py-12 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/vexlap-logo.png"
                  alt="VEXLAP Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-lg text-foreground">VEXLAP</span>
            </div>
            <div className="flex items-center gap-6 md:gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("nav.features")}
              </a>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("nav.howItWorks")}
              </a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("nav.contact")}
              </a>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 VEXLAP. {t("footer.rights")}
            </p>
            <p className="text-xs text-muted-foreground font-mono tracking-wider uppercase">
              {t("footer.builtWith")}
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </main>
  )
}

// Components

function StudentRow({ name, id, status, t }: { name: string; id: string; status: "present" | "absent" | "late"; t: (key: string) => string }) {
  const statusStyles = {
    present: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    absent: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    late: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  }
  const statusLabels = {
    present: t("status.present"),
    absent: t("status.absent"),
    late: t("status.late"),
  }

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
        <Users className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{name}</p>
        <p className="text-xs text-muted-foreground font-mono">{id}</p>
      </div>
      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${statusStyles[status]}`}>
        {statusLabels[status]}
      </span>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  featured = false,
  t,
}: {
  icon: React.ReactNode
  title: string
  description: string
  featured?: boolean
  t: (key: string) => string
}) {
  return (
    <Card
      className={`bg-card border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 group ${
        featured ? "border-primary/30 bg-primary/5 dark:bg-primary/10" : ""
      }`}
    >
      <CardContent className="p-6 sm:p-8">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 ${
            featured
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
              : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
          }`}
        >
          {icon}
        </div>
        <h3 className="font-bold text-lg sm:text-xl text-foreground mb-3">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        {featured && (
          <div className="mt-5 flex items-center gap-2 text-primary text-sm font-semibold">
            <CheckCircle className="w-4 h-4" />
            <span>{t("features.featured")}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <Card className="relative z-10 bg-card border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 text-center">
      <CardContent className="p-6 sm:p-8">
        <div className="w-16 h-16 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-5 shadow-lg shadow-primary/30">
          {number}
        </div>
        <h3 className="font-bold text-lg sm:text-xl text-foreground mb-3">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}
