import { versionInfo } from '@/config';
import type { TCommandContext } from '@/features/bot/core/botTypes';
import { getContextLocale } from '@/features/bot/helpers/getContextLocale';
import { getT } from '@/i18n/getT';

export async function startCommand(ctx: TCommandContext) {
  /* // Catch integrated authorize request
   * const startPayload = ctx.match;
   * // Automatically authorize...
   * if (startPayload === '/authorize') {
   *   await authorizeCommand(ctx);
   *   return;
   * }
   */

  const locale = getContextLocale(ctx);
  const t = await getT({ locale });

  await ctx.reply(
    [
      // Welcome message
      t('Bot.Welcome'),
      // 'Use /authorize to sign in to the app.',
      `${t('Bot.VersionIs')} ${versionInfo}`,
    ].join('\n\n'),
  );
}
