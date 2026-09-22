import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files (e.g., /favicon.ico, /public/*)
  // - Next.js internals (e.g., /_next/*)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
