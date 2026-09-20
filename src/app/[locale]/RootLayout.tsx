// import { SessionProvider } from 'next-auth/react';
// import { cookies } from 'next/headers';

import { Analytics } from '@vercel/analytics/react';
import { Geist, Geist_Mono } from 'next/font/google';
import * as rootParams from 'next/root-params';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import type React from 'react';

import '@/app/globals.css';

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

import type { Viewport } from 'next';
import { type AbstractIntlMessages, hasLocale } from 'next-intl';

import { TailwindIndicator } from '@/components/debug/TailwindIndicator';
// import { GenericLayout } from '@/components/layout/GenericLayout';
// import { ReactQueryClientProvider } from '@/components/providers/ReactQueryClientProvider';
// import { RouteChangeProvider } from '@/hooks/next-router/RouteChangeContext';
// import { SignInModalProvider } from '@/components/modals';
// import { fontDefault, fontHeading, fontMono } from '@/assets/fonts';
import { CustomNextIntlClientProvider } from '@/components/providers/CustomNextIntlClientProvider';
import { debugLocale, isDev } from '@/config';
import { logJsonData } from '@/features/logger/server-actions';
import {
  type TAwaitedLocaleProps,
  type TLocale,
  defaultLocale,
  localesList,
} from '@/i18n';
import { constructMetadata } from '@/lib/app';
import { cn } from '@/lib/react';

export async function generateMetadata({ params }: TAwaitedLocaleProps) {
  const { locale } = await params;
  return constructMetadata({
    locale,
    icons: '/favicon.ico',
  });
}

type TRootLayoutProps = TAwaitedLocaleProps & {
  children: React.ReactNode;
};

export function generateStaticParams() {
  return localesList.map((locale) => ({ locale: locale as TLocale }));
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: 'resizes-content', // "overlays-content" | "resizes-visual" | "resizes-content"
};

export async function RootLayout(props: TRootLayoutProps) {
  const { children, params: paramsPromise } = props;
  const params = await paramsPromise;

  // Fetch the current locale (from root segment or from layout parameters
  const rootLocale = await rootParams.locale();
  const { locale: paramsLocale } = params;
  let locale = paramsLocale || rootLocale || defaultLocale;
  // debugger;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(localesList, locale)) {
    // More simple method to compare: !localesList.includes(locale)
    // NOTE: Sometimes we got `.well-known` value here. TODO?
    // const _error = new Error(
    //   `Invalid locale: ${locale}, using default: ${defaultLocale}`,
    // );
    // debugger; // eslint-disable-line no-debugger
    // TODO? -- Redirect to 'notFound' page?
    // Just use the default value
    locale = defaultLocale;
    // NOTE: ProberHunter: Invalid locale requested
    const __idMsg = '[RootLayout:ProberHunter] Suspicious locale requested';
    logJsonData(__idMsg, { locale }); // NOTE: It's the async function, but not awaiting nor catching intentionally!
  }

  // const cookieStore = await cookies();

  // Provide i18n translations
  let messages: AbstractIntlMessages | undefined;
  try {
    messages = await getMessages({ locale });
  } catch (_error) {
    if (locale !== debugLocale) {
    }
  }

  // const user = await getCurrentUser();

  return (
    <html
      lang={locale}
      // data-theme-color={themeColor}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon shortcut" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="apple-touch-icon"
          href="/static/favicons/favicon-64x64.png"
          sizes="64x64"
        />
        {/* // TODO: Set SEO and OG meta tags
        <meta property="og:url" content="https://vanilla-tasks.lilliputten.com/" />
        <meta property="og:title" content="Vanilla Tasks Tracker" />
        <meta
          property="og:description"
          content="The small application aimed to demonstrate native js and css abilities in browser environment"
        />
        <meta property="twitter:image" content="/images/og/og-512.jpg" />
        <meta property="og:logo" content="/images/og/og-192.jpg" />
        <meta property="og:image" content="/images/og/og-1200x630.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        */}
        {/* Runs before any interactive/hydration code to update user settings to avoid content flash
        <Script
          id="layout-init-theme"
          strategy="beforeInteractive"
          src="/static/layout-init-theme.js"
        />
        */}
      </head>
      <body
        className={cn(
          isDev && '__RootLayout',
          'h-full',
          'antialiased',
          // 'flex flex-col',
          geistSans.variable,
          geistMono.variable,
          // fontDefault.variable,
          // fontHeading.variable,
          // fontMono.variable,
        )}
        data-layout="clippable" // Default layout mode, could casue flickering
      >
        {/* <ReactQueryClientProvider> */}
        {/* <RouteChangeProvider> */}
        {/* <SessionProvider> */}
        {/* <EnvContextRoot> */}
        <CustomNextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="app-theme"
          >
            {/* <SignInModalProvider> */}
            {/* NOTE: The toaster should be located before the main content */}
            {/* <Toaster
                    // @see https://sonner.emilkowal.ski/toaster#api-reference
                    expand
                    richColors
                    closeButton

                  /> */}
            {/* <SettingsContextProvider user={user}> */}
            {/* <GenericLayout> */}
            {/* Core content */}
            {children}
            {/* </GenericLayout> */}
            {/* </SettingsContextProvider> */}
            <TailwindIndicator />
            {/* </SignInModalProvider> */}
          </ThemeProvider>
        </CustomNextIntlClientProvider>
        {/* </EnvContextRoot> */}
        {/* </SessionProvider> */}
        {/* </RouteChangeProvider> */}
        {/* </ReactQueryClientProvider> */}
        {!isDev && <Analytics />}
      </body>
    </html>
  );
}
