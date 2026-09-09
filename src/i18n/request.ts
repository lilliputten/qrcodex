import { getRequestConfig } from 'next-intl/server';

import { type TLocale, defaultLocale, strictLocalesList } from './types';

// Define the supported locales
const supportedLocales = strictLocalesList; // ['en', 'es', 'ru'];

export default getRequestConfig(async ({ locale }) => {
  // Verify that the incoming `locale` is valid
  if (!locale || !supportedLocales.includes(locale as TLocale)) {
    // If the locale is not supported or undefined, failback to the default
    return {
      locale: defaultLocale, // Type assertion to ensure it matches expected type
      messages: (await import(`@/i18n/locales/${defaultLocale}.json`)).default,
    };
  }

  return {
    locale: locale as TLocale, // Type assertion to ensure it matches expected type
    messages: (await import(`@/i18n/locales/${locale}.json`)).default,
  };
});
