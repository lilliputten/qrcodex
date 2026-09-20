import { isDev } from '@/config';
import { allPossibleLanguageCodesSet } from '@/constants/languages';
import { logJsonData } from '@/features/logger/server-actions';
import { getT } from '@/i18n';
import type { TAwaitedLocaleProps } from '@/i18n/types';
import { constructMetadata } from '@/lib/app';

import { LandingPageContent } from './LandingPageContent';

type TLandingPageProps = TAwaitedLocaleProps & {
  // recentCategories?: TCategory[];
};

export async function generateMetadata({ params }: TAwaitedLocaleProps) {
  const { locale } = await params;
  const t = await getT({ locale });
  return constructMetadata({
    title: t('App.Title'),
    locale,
  });
}

export async function LandingPage(props: TLandingPageProps) {
  const { params: paramsPromise } = props;
  const { locale } = await paramsPromise;
  const _t = await getT({ locale });
  // const user = await getCurrentUser();

  // NOTE: ProberHunter: Ananlyze requested location, check for prober bots (invalid locale
  // requests: when instead locale in the url passed a vulnerable url, like
  // `.env`)...
  const isValidLocale = allPossibleLanguageCodesSet.has(locale);
  if (!isValidLocale) {
    const __idMsg = '[LandingPage:ProberHunter] Suspicious locale requested';
    logJsonData(__idMsg, { locale }); // NOTE: Not awaiting and catching!
  }
  // DEMO: Sending debug data as json objects (locale is adding to the main log
  // message and `resolvedParams` is sending as attached json) (only for
  // production and not admin users)
  else if (
    !isDev /* && user?.role !== 'ADMIN' && !user?.email?.includes('lilliputten') */
  ) {
    const __idMsg = '[LandingPage:DEMO] Main page visited';
    logJsonData(__idMsg, { locale } /* , { resolvedParams } */); // NOTE: It's the async function, but not awaiting nor catching intentionally!
  }

  // Enable static rendering
  // setRequestLocale(locale); // DEPRECATED: Migrated to `next/root-params`

  return <LandingPageContent />;
}
