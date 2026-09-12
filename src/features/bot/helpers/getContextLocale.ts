import { type TLocale, defaultLocale } from '@/i18n/types';

import type { TBotContext } from '../core/botTypes';

export function getContextLocale(ctx: TBotContext) {
  /* console.log('[getContextLocale]', {
   *   session: ctx.session,
   *   from: ctx.update.message?.from,
   * });
   */
  const session = ctx.session;
  if (session?.locale) {
    return session.locale as TLocale;
  }
  const from = ctx.from;
  if (from?.language_code) {
    return from.language_code as TLocale;
  }
  return defaultLocale;
}
