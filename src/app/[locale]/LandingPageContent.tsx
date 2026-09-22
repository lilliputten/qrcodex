'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { isDev } from '@/config';
import { Link, useT } from '@/i18n/';
import { cn } from '@/lib/utils';

export function LandingPageContent() {
  const t = useT();

  return (
    <div
      className={cn(
        isDev && '__LandingPageContent', // DEBUG
        'flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black',
      )}
    >
      <main
        className={cn(
          isDev && '__LandingPageContent_Main', // DEBUG
          'flex w-full max-w-3xl flex-1 flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black',
        )}
      >
        <Image
          className={cn(
            isDev && '__LandingPageContent_Logo', // DEBUG
            // 'h-5 w-25',
            'h-5',
            'min-w-[8em] dark:invert',
          )}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div
          className={cn(
            isDev && '__LandingPageContent_Title', // DEBUG
            'flex flex-col items-center gap-6 text-center sm:items-start sm:text-left',
          )}
        >
          <h1
            className={cn(
              'max-w-xs font-semibold text-3xl text-black leading-10 tracking-tight dark:text-zinc-50',
            )}
          >
            {t.rich('IndexPage.title', {
              fileName: (chunks) => (
                <code
                  key="filename"
                  className={cn(
                    'rounded bg-black/6 px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/8',
                  )}
                >
                  {chunks}
                </code>
              ),
            })}
          </h1>
          <p
            className={cn(
              isDev && '__LandingPageContent_Description', // DEBUG
              'max-w-md text-lg text-zinc-600 leading-8 dark:text-zinc-400',
            )}
          >
            {t.rich('IndexPage.description', {
              templatesLink: () => (
                <Link
                  key="templates-link"
                  href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                  className={cn('font-medium text-zinc-950 dark:text-zinc-50')}
                >
                  {t('IndexPage.templates')}
                </Link>
              ),
              learningLink: () => (
                <Link
                  key="learning-link"
                  href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                  className={cn('font-medium text-zinc-950 dark:text-zinc-50')}
                >
                  {t('Learning')}
                </Link>
              ),
            })}
          </p>
        </div>
        <div
          className={cn(
            isDev && '__LandingPageContent_Buttons', // DEBUG
            'flex flex-col gap-4 font-medium text-base sm:flex-row',
          )}
        >
          <a
            className={cn(
              'flex h-12 w-full items-center justify-center gap-2 text-nowrap rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]',
            )}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={cn('h-3.5 w-4 dark:invert')}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            {t('IndexPage.deployButton')}
          </a>
          {/*
          <a
            className={cn(
              'flex h-12 w-full items-center justify-center text-nowrap rounded-full border border-black/8 border-solid px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a]',
            )}
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('IndexPage.documentationButton')}
          </a>
          */}
          <Button
            // variant="outline"
          >
            <Link href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app">
              {t('IndexPage.documentationButton')}
            </Link>
          </Button>
        </div>

        {/* Language Switcher */}
        <div
          className={cn(
            isDev && '__LandingPageContent_Languages', // DEBUG
            'mt-8 rounded-lg bg-gray-100 p-4 dark:bg-gray-800',
          )}
        >
          <h3 className={cn('mb-2 font-semibold text-lg')}>
            {t('SelectLanguage')}:
          </h3>
          <div
            className={cn(
              isDev && '__LandingPageContent_Links', // DEBUG
              'flex space-x-4',
            )}
          >
            <Link
              href="/"
              locale="en"
              className={cn(
                'rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600',
              )}
            >
              English {/*t('languages.English')*/}
            </Link>
            <Link
              href="/"
              locale="es"
              className={cn(
                'rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600',
              )}
            >
              Español {/*t('languages.Spanish')*/}
            </Link>
            <Link
              href="/"
              locale="ru"
              className={cn(
                'rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600',
              )}
            >
              Русский {/*t('languages.Russian')*/}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
