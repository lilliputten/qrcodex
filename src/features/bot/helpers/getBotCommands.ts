import { getT } from '@/i18n/getT';
import type { TLocale } from '@/i18n/types';

/* TODO:
 * - Move commands to the respective command modules.
 */

export async function getBotCommands(locale: TLocale) {
  const t = await getT({ locale });
  const botCommands = [
    {
      command: 'start',
      description: t('BotHelp.Start'),
    },
    {
      command: 'help',
      description: t('BotHelp.Help'),
    },
    /* {
     *   command: 'authorize',
     *   description: t('BotHelp.Authorize'),
     * },
     */
    {
      command: 'settings',
      description: t('BotHelp.Settings'),
    },
  ];
  return botCommands;
}
