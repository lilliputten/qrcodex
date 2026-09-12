import { CommandGroup, commands } from '@grammyjs/commands';
// import { PrismaAdapter } from '@grammyjs/storage-prisma';
import { Bot, session } from 'grammy';

import { isDev } from '@/config';
import { BOT_TOKEN } from '@/config/envServer';
// import { prisma } from '@/lib/db';
import { getErrorText } from '@/lib/errors';

import type { BotContext, SessionData, TBot } from './botTypes';

const cachedBots: Record<string, TBot> = {};

export const botCommands = new CommandGroup();

const _timeoutSeconds = isDev ? 30 : 60;

function getInitialSession(): SessionData {
  return {
    // Default sesion contents...
    language_code: undefined,
  };
}

/** Get a cached bot or create a new one */
export function getBot(token: string = BOT_TOKEN) {
  if (cachedBots[token]) {
    return cachedBots[token];
  }
  try {
    // const bot = new Bot(token);
    // @see constructor(token: string, config?: BotConfig<C>);
    const bot = new Bot<BotContext>(token, {
      client: {
        // timeoutSeconds,
      },
    });
    bot.use(commands());
    bot.use(botCommands);
    bot.use(
      session({
        initial: getInitialSession,
        // storage: new PrismaAdapter<SessionData>(prisma.telegramSession),
      }),
    );
    // Store the created bot
    cachedBots[token] = bot;
    return bot;
  } catch (error) {
    const errMsg = ['Bot creation error', getErrorText(error)]
      .filter(Boolean)
      .join(': ');
    // biome-ignore lint/suspicious/noConsole: DEBUG
    console.error('[getBot]', errMsg, {
      error,
      token,
    });
    throw error;
  }
}
