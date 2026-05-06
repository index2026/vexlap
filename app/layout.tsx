import type { Metadata, Viewport } from 'next'
import { Cairo } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cairo = Cairo({ 
  subsets: ["arabic", "latin"],
  variable: '--font-cairo'
});

export const metadata: Metadata = {
  title: 'VEXLAP - نظام إدارة الحضور والتقييم الذكي',
  description: 'منصة متكاملة لإدارة الحضور والغياب وتقييم الطلاب باستخدام QR Code للمدارس والجامعات',
  generator: 'v0.app',
  keywords: ['حضور', 'غياب', 'تقييم طلاب', 'QR Code', 'منصة تعليمية', 'VEXLAP', 'إدارة مدارس'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className="bg-background" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('vexlap-theme');
                  var lang = localStorage.getItem('vexlap-language');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                  if (lang === 'en') {
                    document.documentElement.lang = 'en';
                    document.documentElement.dir = 'ltr';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${cairo.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
