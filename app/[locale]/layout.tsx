import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { fonts } from "@/lib/fonts";
import { AppControls } from "@/components/app-controls";
import { ThemeProvider } from "@/components/context/theme-context";
import "../globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seyedcj.ir";

const REALISTIC_NAME_VARIANTS = [
  "سید امیرمحمد موسوی",
  "سید امیر محمد موسوی",
  "سید امیرمحمد موسوی شبستری",
  "Seyed Amirmohammad Mousavi",
  "Seyed Amir Mohammad Mousavi",
  "SeyedCj",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFa = locale === "fa";

  const title = isFa
    ? "سید امیرمحمد موسوی | مهندس نرم‌افزار و برنامه‌نویس فول‌استک"
    : "Seyed Amirmohammad Mousavi | Full-Stack Software Engineer";

  const description = isFa
    ? "پورتفولیو سید امیرمحمد موسوی (SeyedCj)؛ مهندس نرم‌افزار و توسعه‌دهنده فول‌استک وب متخصص در Next.js، NestJS و معماری مقیاس‌پذیر. مشاهده پروژه‌ها و سوابق کاری."
    : "Official portfolio of Seyed Amirmohammad Mousavi (SeyedCj). Full-Stack Web Developer & Software Engineer specializing in Next.js, NestJS, and scalable systems.";

  const keywords = isFa
    ? [
        ...REALISTIC_NAME_VARIANTS,
        "مهندس نرم‌افزار",
        "برنامه‌نویس فول‌استک",
        "برنامه‌نویس فرانت‌اند",
        "برنامه‌نویس بک‌اند",
        "توسعه‌دهنده وب",
        "توسعه‌دهنده فول‌استک وب",
        "برنامه‌نویس NestJS",
        "برنامه‌نویس Next.js",
        "برنامه‌نویس React",
        "برنامه‌نویس Node.js",
        "برنامه‌نویس TypeScript",
        "پورتفولیو سید امیرمحمد موسوی",
        "رزومه سید امیرمحمد موسوی",
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
        ...REALISTIC_NAME_VARIANTS,
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
      template: isFa ? "%s | سید امیرمحمد موسوی" : "%s | Seyed Amirmohammad Mousavi",
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
        fa: "/fa",
        en: "/en",
        "fa-IR": "/fa",
        "en-US": "/en",
        "x-default": "/fa",
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
        ? "پورتفولیو سید امیرمحمد موسوی | SeyedCj"
        : "Seyed Amirmohammad Mousavi Portfolio | SeyedCj",
      images: [
        {
          url: "/portfolio.png",
          width: 1919,
          height: 1079,
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
      images: ["/portfolio.png"],
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

  setRequestLocale(locale);

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
        alternateName: REALISTIC_NAME_VARIANTS,
        jobTitle: isFa
          ? ["مهندس نرم‌افزار", "توسعه‌دهنده فول‌استک وب"]
          : ["Software Engineer", "Full-Stack Web Developer"],
        description: isFa
          ? "سید امیرمحمد موسوی (شبستری - SeyedCj)؛ مهندس نرم‌افزار و توسعه‌دهنده فول‌استک وب، متخصص در NestJS، Next.js، TypeScript و معماری سیستم‌های مقیاس‌پذیر."
          : "Seyed Amirmohammad Mousavi (SeyedCj); Software Engineer and Full-Stack Web Developer specializing in NestJS, Next.js, TypeScript, and scalable architectures.",
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
          ? "وب‌سایت و پورتفولیو سید امیرمحمد موسوی"
          : "Seyed Amirmohammad Mousavi Official Portfolio",
        alternateName: ["SeyedCj", "seyedcj.ir"],
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
          ? "پورتفولیو و رزومه سید امیرمحمد موسوی"
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
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#projects`,
        name: isFa ? "پروژه‌های منتخب" : "Featured Projects",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "SoftwareSourceCode",
              name: isFa ? "پلتفرم فروشگاهی اپل" : "Apple Store E-Commerce Platform",
              description: isFa
                ? "پلتفرم فروشگاهی مدرن برای عرضه محصولات با سبد خرید آنی و فیلتر پیشرفته."
                : "Modern e-commerce storefront featuring instant cart updates and dynamic filtering.",
              programmingLanguage: ["TypeScript", "Next.js", "Tailwind CSS"],
              codeRepository: "https://github.com/Seyed-Cj/nextjs-mobile-store",
              author: { "@id": `${siteUrl}/#person` },
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "SoftwareSourceCode",
              name: isFa ? "بک‌اند تاکسی آنلاین" : "Online Taxi Backend Architecture",
              description: isFa
                ? "معماری ماژولار بک‌اند بر پایه Monorepo با دیسپچ آنی WebSocket و صف پیام RabbitMQ."
                : "Scalable monorepo backend architecture with real-time WebSocket dispatch and RabbitMQ message queues.",
              programmingLanguage: ["TypeScript", "NestJS", "PostgreSQL", "Redis", "Docker"],
              codeRepository: "https://github.com/Seyed-Cj/onlinetaxi-backend",
              author: { "@id": `${siteUrl}/#person` },
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "CreativeWork",
              name: isFa ? "سایت فروشگاهی فول‌استک" : "Full-Stack Gaming Accounts E-Commerce",
              description: isFa
                ? "پلتفرم جامع فول‌استک برای خرید و فروش امن با احراز هویت پیشرفته و مدیریت خودکار سفارش."
                : "End-to-end full-stack digital marketplace with secure authentication and automated workflows.",
              author: { "@id": `${siteUrl}/#person` },
            },
          },
        ],
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
