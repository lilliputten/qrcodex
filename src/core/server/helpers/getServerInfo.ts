'use server';

// import { getErrorText } from "@/lib/helpers";
import { versionInfo } from '@/config';
import {
  // BOT_TOKEN,
  BOT_USERNAME,
  NEXT_PUBLIC_URL,
  NODE_ENV,
  PUBLIC_URL,
  VERCEL_ENV,
  VERCEL_PROJECT_PRODUCTION_URL,
  VERCEL_URL,
  WEBHOOK_HOST,
  isDev,
  isVercel,
  isVercelPreview,
  isVercelProduction,
} from '@/config/envServer';
import { getErrorText } from '@/lib/errors';

export async function getServerInfo() {
  try {
    return {
      versionInfo,
      VERCEL_ENV,
      NODE_ENV,
      NEXT_PUBLIC_URL,
      // Vercel
      VERCEL_PROJECT_PRODUCTION_URL,
      VERCEL_URL,
      PUBLIC_URL,
      BOT_USERNAME,
      WEBHOOK_HOST,
      // BOT_TOKEN,
      isDev,
      isVercel,
      isVercelPreview,
      isVercelProduction,
    };
  } catch (error) {
    const errMsg = getErrorText(error);
    // biome-ignore lint/suspicious/noConsole suppressions/unused: DEBUG
    console.error('[StartBotPage:getServerInfo]', errMsg, { error });
    throw error;
  }
}
