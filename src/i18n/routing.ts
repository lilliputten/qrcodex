import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { strictLocalesList } from './types';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: strictLocalesList,

  // Used when no locale matches
  defaultLocale: 'en',

  // Optional: Set to true to allow non-locale paths (like /api/*)
  // This helps with handling paths that shouldn't be internationalized
  localePrefix: 'as-needed',
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the active locale
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
