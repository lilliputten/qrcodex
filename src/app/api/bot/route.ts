import { type WebhookOptions, webhookCallback } from 'grammy';

import { getBot } from '@/features/bot/core/getBot';
import { getContextLocale } from '@/features/bot/helpers/getContextLocale';
import { logJsonData } from '@/features/logger/server-actions';
import { getT } from '@/i18n/getT';
import { getErrorText } from '@/lib/errors';

// import { authorizeCommand } from './authorizeCommand';
import { botInfoCommand } from './botInfoCommand';
import { helpCommand } from './helpCommand';
import { serverInfoCommand } from './serverInfoCommand';
import { startCommand } from './startCommand';

// Dynamic route...
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const bot = getBot();

bot.command('start', startCommand);
bot.command('help', helpCommand);
// bot.command('authorize', authorizeCommand);
bot.command('server_info', serverInfoCommand);
bot.command('bot_info', botInfoCommand);

// Unknown command fallback
bot.on('message:text', async (ctx) => {
  const locale = getContextLocale(ctx);
  const t = await getT({ locale });

  const { message, session } = ctx;
  const { text } = message;
  try {
    const __idMsg = '[bot/route] Unknown command received';
    const __logData = {
      locale,
      message,
    };
    // biome-ignore lint/suspicious/noConsole: DEBUG
    console.log(__idMsg, __logData, {
      session,
      ctx,
    });
    // Send logging notification
    logJsonData(__idMsg, __logData); // NOTE: Not awaiting and catching!
    // Reply with the error message
    const replyText = [
      `${t('Bot.CommandIsNotImplemented')}: ${text}.`,
      t('Bot.CheckAvailableCommands'),
    ].join('\n\n');
    await ctx.reply(replyText);
  } catch (error) {
    const details = getErrorText(error);
    // biome-ignore lint/suspicious/noConsole: DEBUG
    console.error('[bot/route]', details, {
      error,
      ctx,
    });
    // biome-ignore lint/suspicious/noDebugger: DEBUG
    debugger;
  }
});

const options: WebhookOptions = {
  // secretToken: BOT_SECRET,
};

export const POST = webhookCallback(bot, 'std/http', options);
