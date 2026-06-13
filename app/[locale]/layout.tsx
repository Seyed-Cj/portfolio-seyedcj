import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { fonts } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Seyedcj — Software Engineer",
  description:
    "Personal portfolio of Seyedcj, a software engineer crafting elegant digital experiences.",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "fa" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={`${fonts.pelak.variable} dark h-full overflow-hidden`}>
      <body
        className={`${fonts.pelak.className} h-full overflow-hidden bg-black text-white antialiased`}
      >
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
