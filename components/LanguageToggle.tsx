'use client';

import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';

export default function LanguageToggle() {
  const t = useTranslations('LanguageToggle');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  function toggleLocale() {
    router.replace(pathname, {locale: nextLocale});
  }

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-2 rounded-full border border-solid border-black/[.08] px-4 py-2 text-sm font-medium transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
      aria-label={t('label')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      {t(nextLocale)}
    </button>
  );
}
