import type { Metadata, Viewport } from 'next';

import { Geist, Geist_Mono, Mulish, Poppins, Lexend } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { ThemeProvider } from 'next-themes';
import ReactQueryProvider from '@/providers/react-query-provider';

const font = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Compass',
  description: 'Navigate your world of data with ease',
  icons: [
    { rel: 'icon', url: './apple-icon.png' },
    { rel: 'apple-touch-icon', url: './apple-icon.png' },
  ],
  appleWebApp: {
    statusBarStyle: 'black-translucent',
    title: 'Compass',
    capable: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'contain',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafd' },
    { media: '(prefers-color-scheme: dark)', color: '#020814' },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn(font.className)}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
