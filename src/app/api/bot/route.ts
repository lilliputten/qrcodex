import { type WebhookOptions, webhookCallback } from 'grammy';

import { getBot } from '@/features/bot/core/getBot';
import { getErrorText } from '@/lib/errors';

// import { authorizeCommand } from './authorizeCommand';
import { botInfoCommand } from './botInfoCommand';
import { helpCommand } from './helpCommand';
import { serverInfoCommand } from './serverInfoCommand';
import { startCommand } from './startCommand';

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
  const { message } = ctx;
  const { text } = message;
  const replyText = [
    `${text} command is not implemented.`,
    'Check the available commands list via /help.',
  ].join('\n\n');
  try {
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
