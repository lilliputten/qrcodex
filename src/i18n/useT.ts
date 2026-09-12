import {
  useLocale,
  useTranslations as useNextIntlTranslations,
} from 'next-intl';

import { debugLocale, debugTranslations } from '@/config';

import { getDebugT } from './getDebugT';

export function useT(namespace?: string) {
  const locale = useLocale();
  const isDebugLocale = debugTranslations || locale === debugLocale;

  try {
    // biome-ignore lint/correctness/useHookAtTopLevel: It runs inside the try block
    const originalT = useNextIntlTranslations(namespace);

    if (isDebugLocale) {
      return getDebugT(namespace);
    }

    return originalT;
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: DEBUG
    console.error('[useT]', {
      error,
      namespace,
      locale,
    });
    // debugger; // eslint-disable-line no-debugger
    return getDebugT(namespace);
  }
}

/** Alias for shorthand useT */
export const useTranslations = useT;

export type TTranslator = ReturnType<typeof useT>;
