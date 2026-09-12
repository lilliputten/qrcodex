import type { CommandsFlavor } from '@grammyjs/commands';
import type {
  Bot,
  CallbackQueryContext,
  CommandContext,
  Context,
  SessionFlavor,
} from 'grammy';

export interface SessionData {
  locale?: string;
}

export type TWithBotSession = SessionFlavor<SessionData>;
export type TBotContext = Context & TWithBotSession & CommandsFlavor;

export type TCommandContext = CommandContext<TBotContext>;
export type TCallbackContext = CallbackQueryContext<TBotContext>;

export type TBot = Bot<TBotContext>;
