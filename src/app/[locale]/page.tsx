import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'IndexPage' });

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xs flex-1 flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        <Image
          className="h-5 w-[100px] dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl leading-10 font-semibold tracking-tight text-black dark:text-zinc-50">
            {t.rich('title', {
              fileName: (chunks) => (
                <code
                  key="filename"
                  className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]"
                >
                  {Array.isArray(chunks) ? chunks.join('') : chunks}
                </code>
              ),
            })}
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {t.rich('description', {
              templatesLink: () => (
                <Link
                  key="templates-link"
                  href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                  className="font-medium text-zinc-950 dark:text-zinc-50"
                >
                  {t('templates')}
                </Link>
              ),
              learningLink: () => (
                <Link
                  key="learning-link"
                  href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                  className="font-medium text-zinc-950 dark:text-zinc-50"
                >
                  {t('learning')}
                </Link>
              ),
            })}
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="bg-foreground text-background flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 transition-colors hover:bg-[#383838] md:w-[158px] dark:hover:bg-[#ccc]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="h-[14px] w-4 dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            {t('deployButton')}
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] md:w-[158px] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('documentationButton')}
          </a>
        </div>

        {/* Language Switcher */}
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">{t('selectLanguage')}:</h3>
          <div className="flex space-x-4">
            <Link
              href="/"
              locale="en"
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {t('english')}
            </Link>
            <Link
              href="/"
              locale="es"
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {t('spanish')}
            </Link>
            <Link
              href="/"
              locale="ru"
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              {t('russian')}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
