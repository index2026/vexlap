import './globals.css';
import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';

const cairo = Cairo({ subsets: ['latin', 'arabic'], display: 'swap' });

export const metadata: Metadata = {
  title: 'VEXLAP — Smart School Attendance',
  description: 'Multi-tenant RFID-based school attendance platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={cairo.className} suppressHydrationWarning>
        <Providers>
          {children}
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
