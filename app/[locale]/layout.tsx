import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { fonts } from "@/lib/fonts";
import { LanguageSwitcher } from "@/components/language-switcher";
import "../globals.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFa = locale === "fa";

  const title = isFa
    ? "سیدامیرمحمد موسوی — توسعه دهنده فول‌استک وب"
    : "Seyed Amirmohammad Mousavi — Full-Stack Web Developer";

  const description = isFa
    ? "سیدامیرمحمد موسوی؛ توسعه‌دهنده فول‌استک وب، متخصص در توسعه بک‌اند با NestJS و ساخت رابط‌های مدرن با Next.js، با تمرکز بر معماری و عملکرد."
    : "Seyed Amirmohammad Mousavi — Full-Stack Web Developer specializing in NestJS backend development and modern Next.js interfaces, with a focus on architecture and performance.";

  const keywords = isFa
    ? [
        "سیدامیرمحمد موسوی",
        "Seyedcj",
        "مهندس نرم‌افزار",
        "برنامه‌نویس فول‌استک",
        "توسعه‌دهنده وب",
        "NestJS",
        "Next.js",
        "TypeScript",
        "React",
        "PostgreSQL",
      ]
    : [
        "Seyed Amirmohammad Mousavi",
        "Seyedcj",
        "Software Engineer",
        "Full-Stack Developer",
        "NestJS",
        "Next.js",
        "TypeScript",
        "React",
        "PostgreSQL",
        "Distributed Systems",
      ];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seyedcj.ir";

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fa: "/fa",
        "x-default": "/en",
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName: isFa ? "رزومه سیدامیرمحمد موسوی" : "Seyed Amirmohammad Mousavi Portfolio",
      images: [
        {
          url: "/SeyedCj.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: isFa ? "fa_IR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/SeyedCj.png"],
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

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
  const activeFont = locale === "fa" ? fonts.pelak : fonts.inter;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seyedcj.ir";

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: locale === "fa" ? "سیدامیرمحمد موسوی" : "Seyed Amirmohammad Mousavi",
    alternateName: "Seyedcj",
    jobTitle: locale === "fa" ? "توسعه‌دهنده فول‌استک وب" : "Full-Stack Web Developer",
    url: `${siteUrl}/${locale}`,
    image: `${siteUrl}/SeyedCj.png`,
    sameAs: [
      "https://github.com/Seyed-Cj",
      "https://www.linkedin.com/in/seyed-amirmohammad-moosavi-a66baa350",
      "https://t.me/seyedcj_sc",
    ],
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "Redis",
      "Tailwind CSS",
      "Full-Stack Web Development",
    ],
    email: "mailto:seyedxcj@gmail.com",
    telephone: "+989038105195",
  };

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${fonts.inter.variable} ${fonts.pelak.variable} dark h-full overflow-hidden`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${activeFont.className} h-full overflow-hidden bg-black text-white antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
          <LanguageSwitcher />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
