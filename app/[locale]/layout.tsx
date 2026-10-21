import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { fonts } from "@/lib/fonts";
import { AppControls } from "@/components/app-controls";
import { ThemeProvider } from "@/components/context/theme-context";
import "../globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seyedcj.ir";

const NAME_VARIANTS_FA = [
  "سید امیرمحمد موسوی",
  "سید امیر محمد موسوی",
  "سید امیرمحمد موسوی شبستری",
  "سید امیر محمد موسوی شبستری",
  "سیدامیرمحمد موسوی",
  "سیدامیر محمد موسوی",
  "سیدامیرمحمد موسوی شبستری",
  "سیدامیر محمد موسوی شبستری",
  "امیرمحمد موسوی",
  "امیر محمد موسوی",
  "امیرمحمد موسوی شبستری",
  "امیر محمد موسوی شبستری",
  "موسوی شبستری",
  "سید موسوی",
  "سیدسی‌جی",
  "سید سی جی",
];

const NAME_VARIANTS_EN = [
  "Seyed Amirmohammad Mousavi",
  "Seyed Amir Mohammad Mousavi",
  "Seyed Amirmohammad Mousavi Shabestari",
  "Seyed Amir Mohammad Mousavi Shabestari",
  "Seyed Amirmohammad Moosavi",
  "Seyed Amir Mohammad Moosavi",
  "Seyed Amirmohammad Moosavi Shabestari",
  "Amirmohammad Mousavi",
  "Amir Mohammad Mousavi",
  "Amirmohammad Mousavi Shabestari",
  "Mousavi Shabestari",
  "SeyedCj",
  "Seyed-Cj",
  "Seyed Cj",
  "seyedcj.ir",
];

const ALL_NAME_VARIANTS = [...NAME_VARIANTS_FA, ...NAME_VARIANTS_EN];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFa = locale === "fa";

  const title = isFa
    ? "سید امیرمحمد موسوی (شبستری) — مهندس نرم‌افزار و توسعه‌دهنده فول‌استک | SeyedCj"
    : "Seyed Amirmohammad Mousavi (Shabestari) — Software Engineer & Full-Stack Developer | SeyedCj";

  const description = isFa
    ? "وب‌سایت رسمی و پورتفولیو سید امیرمحمد موسوی (سید امیر محمد موسوی شبستری - SeyedCj). مهندس نرم‌افزار و برنامه‌نویس فول‌استک وب، متخصص در توسعه بک‌اند با NestJS و فرانت‌اند مدرن با Next.js، React، TypeScript و معماری سیستم‌های مقیاس‌پذیر."
    : "Official portfolio of Seyed Amirmohammad Mousavi (Seyed Amir Mohammad Mousavi Shabestari — SeyedCj). Full-Stack Web Developer and Software Engineer specializing in NestJS backend development, modern Next.js/React interfaces, and scalable architectures.";

  const keywords = isFa
    ? [
        ...NAME_VARIANTS_FA,
        ...NAME_VARIANTS_EN,
        "مهندس نرم‌افزار",
        "برنامه‌نویس فول‌استک",
        "برنامه‌نویس فرانت‌اند",
        "برنامه‌نویس بک‌اند",
        "توسعه‌دهنده وب",
        "توسعه‌دهنده فول‌استک وب",
        "طراحی سایت",
        "برنامه‌نویس NestJS",
        "برنامه‌نویس Next.js",
        "برنامه‌نویس React",
        "برنامه‌نویس Node.js",
        "برنامه‌نویس TypeScript",
        "برنامه‌نویس جاوااسکریپت",
        "متخصص ری‌اکت",
        "متخصص نکست جی‌اس",
        "پورتفولیو سید امیرمحمد موسوی",
        "رزومه سید امیرمحمد موسوی",
        "رزومه کاری برنامه نویس",
        "پروژه‌های برنامه نویسی",
        "Full-Stack Developer",
        "Software Engineer",
        "NestJS",
        "Next.js",
        "TypeScript",
        "React",
        "PostgreSQL",
        "Docker",
        "Redis",
        "MongoDB",
        "Tailwind CSS",
        "REST API",
        "Microservices",
        "WebSockets",
      ]
    : [
        ...NAME_VARIANTS_EN,
        ...NAME_VARIANTS_FA,
        "Software Engineer",
        "Full-Stack Web Developer",
        "Full-Stack Developer",
        "Backend Developer",
        "Frontend Developer",
        "NestJS Developer",
        "Next.js Developer",
        "React Developer",
        "Node.js Developer",
        "TypeScript Developer",
        "PostgreSQL",
        "MongoDB",
        "Docker",
        "Redis",
        "Tailwind CSS",
        "Clean Architecture",
        "Distributed Systems",
        "REST API",
        "WebSockets",
        "Seyed Amirmohammad Mousavi Portfolio",
        "Seyed Amirmohammad Mousavi Resume",
      ];

  return {
    title: {
      default: title,
      template: isFa ? "%s | سید امیرمحمد موسوی (شبستری)" : "%s | Seyed Amirmohammad Mousavi",
    },
    description,
    keywords,
    authors: [
      {
        name: isFa ? "سید امیرمحمد موسوی شبستری" : "Seyed Amirmohammad Mousavi Shabestari",
        url: siteUrl,
      },
      { name: "SeyedCj", url: "https://github.com/Seyed-Cj" },
    ],
    creator: isFa ? "سید امیرمحمد موسوی (SeyedCj)" : "Seyed Amirmohammad Mousavi (SeyedCj)",
    publisher: isFa ? "سید امیرمحمد موسوی" : "Seyed Amirmohammad Mousavi",
    applicationName: isFa ? "پورتفولیو سید امیرمحمد موسوی" : "Seyed Amirmohammad Mousavi Portfolio",
    generator: "Next.js",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fa: "/fa",
        "fa-IR": "/fa",
        "en-US": "/en",
        "x-default": "/en",
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName: isFa
        ? "رزومه و پورتفولیو سید امیرمحمد موسوی (شبستری) | SeyedCj"
        : "Seyed Amirmohammad Mousavi Portfolio | SeyedCj",
      images: [
        {
          url: "/SeyedCj.png",
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
        {
          url: "/portfolio.png",
          width: 1200,
          height: 630,
          alt: isFa ? "پورتفولیو سید امیرمحمد موسوی" : "Seyed Amirmohammad Mousavi Portfolio",
          type: "image/png",
        },
      ],
      locale: isFa ? "fa_IR" : "en_US",
      alternateLocale: isFa ? ["en_US"] : ["fa_IR"],
      type: "profile",
      firstName: isFa ? "سید امیرمحمد" : "Seyed Amirmohammad",
      lastName: isFa ? "موسوی شبستری" : "Mousavi Shabestari",
      username: "SeyedCj",
      gender: "male",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@SeyedCj",
      site: "@SeyedCj",
      images: ["/SeyedCj.png"],
    },
    icons: {
      icon: [{ url: "/favicon.ico", sizes: "any" }],
      apple: [{ url: "/SeyedCj.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/manifest.webmanifest",
    verification: {
      google: "google327c9cf97a4ae255",
    },
    category: "technology",
    classification: "Portfolio, Software Engineering, Web Development",
    other: {
      "author-alternate": isFa
        ? "سید امیر محمد موسوی شبستری (SeyedCj)"
        : "Seyed Amir Mohammad Mousavi Shabestari (SeyedCj)",
      "geo.region": "IR",
      "geo.placename": "Tehran, Iran",
      rating: "General",
      referrer: "origin-when-cross-origin",
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
  const isFa = locale === "fa";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: isFa ? "سید امیرمحمد موسوی" : "Seyed Amirmohammad Mousavi",
        givenName: isFa ? "امیرمحمد" : "Amirmohammad",
        additionalName: isFa ? "سید" : "Seyed",
        familyName: isFa ? "موسوی شبستری" : "Mousavi Shabestari",
        alternateName: ALL_NAME_VARIANTS,
        jobTitle: isFa
          ? ["مهندس نرم‌افزار", "توسعه‌دهنده فول‌استک وب", "برنامه‌نویس بک‌اند و فرانت‌اند"]
          : ["Software Engineer", "Full-Stack Web Developer", "Backend & Frontend Engineer"],
        description: isFa
          ? "سید امیرمحمد موسوی (شبستری) ملقب به SeyedCj؛ مهندس نرم‌افزار و توسعه‌دهنده فول‌استک وب، متخصص در NestJS، Next.js، TypeScript و React با تمرکز بر معماری کلین و مقیاس‌پذیری."
          : "Seyed Amirmohammad Mousavi (Shabestari), known as SeyedCj; Software Engineer and Full-Stack Web Developer specializing in NestJS, Next.js, TypeScript, and React with focus on clean architecture and scalability.",
        url: `${siteUrl}/${locale}`,
        image: `${siteUrl}/SeyedCj.png`,
        sameAs: [
          "https://github.com/Seyed-Cj",
          "https://www.linkedin.com/in/seyed-amirmohammad-moosavi-a66baa350",
          "https://t.me/seyedcj_sc",
          "https://seyedcj.ir",
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
          "REST APIs",
          "WebSockets",
          "Microservices",
          "Full-Stack Web Development",
          "Software Architecture",
        ],
        email: "mailto:seyedxcj@gmail.com",
        telephone: "+989038105195",
        gender: "https://schema.org/Male",
        nationality: {
          "@type": "Country",
          name: isFa ? "ایران" : "Iran",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: isFa
          ? "وب‌سایت شخصی و پورتفولیو سید امیرمحمد موسوی (شبستری)"
          : "Seyed Amirmohammad Mousavi Official Portfolio Website",
        alternateName: ["سید امیرمحمد موسوی", "SeyedCj", "seyedcj.ir"],
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
        inLanguage: ["fa", "en"],
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/${locale}#profilepage`,
        url: `${siteUrl}/${locale}`,
        name: isFa
          ? "پورتفولیو و رزومه سید امیرمحمد موسوی (شبستری)"
          : "Seyed Amirmohammad Mousavi Portfolio & Resume",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@id": `${siteUrl}/#person`,
        },
        mainEntity: {
          "@id": `${siteUrl}/#person`,
        },
        inLanguage: isFa ? "fa-IR" : "en-US",
      },
    ],
  };

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${fonts.inter.variable} ${fonts.pelak.variable} h-full overflow-hidden`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${activeFont.className} h-full overflow-hidden bg-[#f5f5f7] text-[#1d1d1f] antialiased transition-colors duration-300 dark:bg-black dark:text-white`}
      >
        {/* Semantic accessible SEO content for search crawlers & screen readers */}
        <div className="sr-only" aria-hidden="false">
          <header>
            <h1>
              {isFa
                ? "سید امیرمحمد موسوی (شبستری) — برنامه‌نویس فول‌استک و مهندس نرم‌افزار | SeyedCj"
                : "Seyed Amirmohammad Mousavi (Shabestari) — Full-Stack Developer & Software Engineer | SeyedCj"}
            </h1>
            <p>
              {isFa
                ? "سید امیرمحمد موسوی (که به شکل‌های سید امیر محمد موسوی، سید امیرمحمد موسوی شبستری، سید امیر محمد موسوی شبستری، سیدامیرمحمد موسوی، امیرمحمد موسوی و SeyedCj نیز شناخته می‌شود) برنامه‌نویس فول‌استک وب و توسعه‌دهنده نرم‌افزار است."
                : "Seyed Amirmohammad Mousavi (also known as Seyed Amir Mohammad Mousavi, Seyed Amirmohammad Mousavi Shabestari, Seyed Amir Mohammad Mousavi Shabestari, and SeyedCj) is a Full-Stack Web Developer and Software Engineer."}
            </p>
          </header>
          <section>
            <h2>{isFa ? "نام‌های مستعار و نگارش‌های مختلف نام" : "Alternative Name Spellings"}</h2>
            <ul>
              {ALL_NAME_VARIANTS.map((variant) => (
                <li key={variant}>{variant}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>{isFa ? "تخصص‌ها و حوزه‌های فعالیت" : "Technical Expertise"}</h2>
            <p>
              {isFa
                ? "متخصص در ساخت وب‌اپلیکیشن‌های پیشرفته با Next.js، React، تایپ‌اسکریپت و طراحی سیستم‌های مقیاس‌پذیر بک‌اند با NestJS، Node.js، PostgreSQL، MongoDB، داکر و ردیس."
                : "Specialized in advanced web application development with Next.js, React, TypeScript, and architecting scalable backends with NestJS, Node.js, PostgreSQL, MongoDB, Docker, and Redis."}
            </p>
          </section>
        </div>

        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            {children}
            <AppControls />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
