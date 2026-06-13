import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import LanguageToggle from "@/components/LanguageToggle";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");
  const nav = await getTranslations("Navigation");

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <header className="flex w-full max-w-3xl items-center justify-between px-16 py-4">
        <nav className="flex gap-4 text-sm">
          <span className="font-medium text-zinc-900 dark:text-zinc-50">{nav("home")}</span>
          <span className="text-zinc-500 dark:text-zinc-400">{nav("about")}</span>
          <span className="text-zinc-500 dark:text-zinc-400">{nav("projects")}</span>
          <span className="text-zinc-500 dark:text-zinc-400">{nav("contact")}</span>
        </nav>
        <LanguageToggle />
      </header>
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-between px-16 py-32 sm:items-start">
        <h1 className="max-w-xs text-3xl leading-10 font-semibold tracking-tight text-black dark:text-zinc-50">
          {t("title")}
        </h1>
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {t("description")}
        </p>
      </main>
    </div>
  );
}
