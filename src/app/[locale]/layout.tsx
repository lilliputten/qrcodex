import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';

import { strictLocalesList, type TAwaitedLocaleProps } from '@/i18n/types';

// import { getLocale, getTranslations } from 'next-intl/server';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'QR Codex Web App and Telegram Bot',
  description: 'Encode and decode QR codes (almost) everywhere',
};

// Enable edge runtime to support static generation
export const runtime = 'edge';

type TRootLayoutProps = TAwaitedLocaleProps & {
  children: React.ReactNode;
};

export default async function RootLayout(props: TRootLayoutProps) {
  const { children, params: paramsPromise } = props;
  const params = await paramsPromise;

  // Validate that the provided locale is supported
  if (!strictLocalesList.includes(params.locale)) {
    notFound();
  }

  return (
    <html
      lang={params.locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          {/* Root content */}
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
