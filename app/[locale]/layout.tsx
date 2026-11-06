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
  "سيد أمير محمد موسوي",
  "سيد أميرمحمد موسوي",
  "سيد امير محمد موسوي",
  "Seyed Amirmohammad Mousavi",
  "Seyed Amir Mohammad Mousavi",
  "SeyedCj",
];

interface LocaleMeta {
  title: string;
  template: string;
  description: string;
  keywords: string[];
  authorName: string;
  authorAlt: string;
  creator: string;
  publisher: string;
  applicationName: string;
  siteName: string;
  ogAlt: string;
  ogLocale: string;
  alternateLocales: string[];
  firstName: string;
  lastName: string;
  personName: string;
  personGivenName: string;
  personAdditionalName: string;
  personFamilyName: string;
  personJobTitle: string[];
  personDescription: string;
  countryName: string;
  websiteName: string;
  profilePageName: string;
  profilePageLang: string;
  itemListProjectsName: string;
  project1Name: string;
  project1Desc: string;
  project2Name: string;
  project2Desc: string;
  project3Name: string;
  project3Desc: string;
}

const LOCALE_CONFIG: Record<string, LocaleMeta> = {
  fa: {
    title: "سید امیرمحمد موسوی | مهندس نرم‌افزار و برنامه‌نویس فول‌استک",
    template: "%s | سید امیرمحمد موسوی",
    description:
      "پورتفولیو سید امیرمحمد موسوی (SeyedCj)؛ مهندس نرم‌افزار و توسعه‌دهنده فول‌استک وب متخصص در Next.js، NestJS و معماری مقیاس‌پذیر. مشاهده پروژه‌ها و سوابق کاری.",
    keywords: [
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
    ],
    authorName: "سید امیرمحمد موسوی شبستری",
    authorAlt: "سید امیر محمد موسوی شبستری (SeyedCj)",
    creator: "سید امیرمحمد موسوی (SeyedCj)",
    publisher: "سید امیرمحمد موسوی",
    applicationName: "پورتفولیو سید امیرمحمد موسوی",
    siteName: "پورتفولیو سید امیرمحمد موسوی | SeyedCj",
    ogAlt: "پورتفولیو سید امیرمحمد موسوی",
    ogLocale: "fa_IR",
    alternateLocales: ["en_US", "ar_AR"],
    firstName: "سید امیرمحمد",
    lastName: "موسوی شبستری",
    personName: "سید امیرمحمد موسوی",
    personGivenName: "امیرمحمد",
    personAdditionalName: "سید",
    personFamilyName: "موسوی شبستری",
    personJobTitle: ["مهندس نرم‌افزار", "توسعه‌دهنده فول‌استک وب"],
    personDescription:
      "سید امیرمحمد موسوی (شبستری - SeyedCj)؛ مهندس نرم‌افزار و توسعه‌دهنده فول‌استک وب، متخصص در NestJS، Next.js، TypeScript و معماری سیستم‌های مقیاس‌پذیر.",
    countryName: "ایران",
    websiteName: "وب‌سایت و پورتفولیو سید امیرمحمد موسوی",
    profilePageName: "پورتفولیو و رزومه سید امیرمحمد موسوی",
    profilePageLang: "fa-IR",
    itemListProjectsName: "پروژه‌های منتخب",
    project1Name: "پلتفرم فروشگاهی اپل",
    project1Desc: "پلتفرم فروشگاهی مدرن برای عرضه محصولات با سبد خرید آنی و فیلتر پیشرفته.",
    project2Name: "بک‌اند تاکسی آنلاین",
    project2Desc:
      "معماری ماژولار بک‌اند بر پایه Monorepo با دیسپچ آنی WebSocket و صف پیام RabbitMQ.",
    project3Name: "سایت فروشگاهی فول‌استک",
    project3Desc:
      "پلتفرم جامع فول‌استک برای خرید و فروش امن با احراز هویت پیشرفته و مدیریت خودکار سفارش.",
  },
  en: {
    title: "Seyed Amirmohammad Mousavi | Full-Stack Software Engineer",
    template: "%s | Seyed Amirmohammad Mousavi",
    description:
      "Official portfolio of Seyed Amirmohammad Mousavi (SeyedCj). Full-Stack Web Developer & Software Engineer specializing in Next.js, NestJS, and scalable systems.",
    keywords: [
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
    ],
    authorName: "Seyed Amirmohammad Mousavi Shabestari",
    authorAlt: "Seyed Amir Mohammad Mousavi Shabestari (SeyedCj)",
    creator: "Seyed Amirmohammad Mousavi (SeyedCj)",
    publisher: "Seyed Amirmohammad Mousavi",
    applicationName: "Seyed Amirmohammad Mousavi Portfolio",
    siteName: "Seyed Amirmohammad Mousavi Portfolio | SeyedCj",
    ogAlt: "Seyed Amirmohammad Mousavi Portfolio",
    ogLocale: "en_US",
    alternateLocales: ["fa_IR", "ar_AR"],
    firstName: "Seyed Amirmohammad",
    lastName: "Mousavi Shabestari",
    personName: "Seyed Amirmohammad Mousavi",
    personGivenName: "Amirmohammad",
    personAdditionalName: "Seyed",
    personFamilyName: "Mousavi Shabestari",
    personJobTitle: ["Software Engineer", "Full-Stack Web Developer"],
    personDescription:
      "Seyed Amirmohammad Mousavi (SeyedCj); Software Engineer and Full-Stack Web Developer specializing in NestJS, Next.js, TypeScript, and scalable architectures.",
    countryName: "Iran",
    websiteName: "Seyed Amirmohammad Mousavi Official Portfolio",
    profilePageName: "Seyed Amirmohammad Mousavi Portfolio & Resume",
    profilePageLang: "en-US",
    itemListProjectsName: "Featured Projects",
    project1Name: "Apple Store E-Commerce Platform",
    project1Desc:
      "Modern e-commerce storefront featuring instant cart updates and dynamic filtering.",
    project2Name: "Online Taxi Backend Architecture",
    project2Desc:
      "Scalable monorepo backend architecture with real-time WebSocket dispatch and RabbitMQ message queues.",
    project3Name: "Full-Stack Gaming Accounts E-Commerce",
    project3Desc:
      "End-to-end full-stack digital marketplace with secure authentication and automated workflows.",
  },
  ar: {
    title: "سيد أمير محمد موسوي | مهندس برمجيات ومطور ويب متكامل",
    template: "%s | سيد أمير محمد موسوي",
    description:
      "الموقع الرسمي ومعرض أعمال سيد أمير محمد موسوي (SeyedCj)؛ مهندس برمجيات ومطور ويب متكامل متخصص في Next.js وNestJS وبناء الأنظمة القابلة للتوسع.",
    keywords: [
      ...REALISTIC_NAME_VARIANTS,
      "مهندس برمجيات",
      "مطور ويب متكامل",
      "مطور واجهات أمامية",
      "مطور بنية خلفية",
      "مطور Full-Stack",
      "مطور NestJS",
      "مطور Next.js",
      "مطور React",
      "مطور Node.js",
      "مطور TypeScript",
      "معرض أعمال سيد أمير محمد موسوي",
      "سيرة ذاتية سيد أمير محمد موسوي",
      "Software Engineer",
      "Full-Stack Developer",
      "Next.js",
      "NestJS",
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
    ],
    authorName: "سيد أمير محمد موسوي",
    authorAlt: "سيد أمير محمد موسوي (SeyedCj)",
    creator: "سيد أمير محمد موسوي (SeyedCj)",
    publisher: "سيد أمير محمد موسوي",
    applicationName: "معرض أعمال سيد أمير محمد موسوي",
    siteName: "معرض أعمال سيد أمير محمد موسوي | SeyedCj",
    ogAlt: "معرض أعمال سيد أمير محمد موسوي",
    ogLocale: "ar_AR",
    alternateLocales: ["fa_IR", "en_US"],
    firstName: "سيد أمير محمد",
    lastName: "موسوي",
    personName: "سيد أمير محمد موسوي",
    personGivenName: "أمير محمد",
    personAdditionalName: "سيد",
    personFamilyName: "موسوي",
    personJobTitle: ["مهندس برمجيات", "مطور ويب متكامل"],
    personDescription:
      "سيد أمير محمد موسوي (SeyedCj)؛ مهندس برمجيات ومطور ويب متكامل متخصص في NestJS وNext.js وTypeScript وبناء الأنظمة القابلة للتوسع.",
    countryName: "إيران",
    websiteName: "الموقع الرسمي ومعرض أعمال سيد أمير محمد موسوي",
    profilePageName: "معرض أعمال وسيرة سيد أمير محمد موسوي",
    profilePageLang: "ar-SA",
    itemListProjectsName: "أعمال مختارة",
    project1Name: "منصة تجارة إلكترونية لأجهزة Apple",
    project1Desc:
      "واجهة متجر إلكتروني حديثة وفائقة السرعة لمنتجات Apple تدعم التحديث الفوري لسلة المشتريات والتصفية المتقدمة.",
    project2Name: "معمارية الخادم لخدمة حجز سيارات",
    project2Desc:
      "معمارية معيارية وقابلة للتوسع بنمط Monorepo مع توجيه فوري عبر WebSocket وطوابير رسائل RabbitMQ وتخزين مؤقت عبر Redis.",
    project3Name: "متجر إلكتروني متكامل",
    project3Desc:
      "منصة رقمية متكاملة لتداول حسابات الألعاب بأمان مع مصادقة متقدمة وأتمتة مسار الطلبات وإدارة المخزون.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = LOCALE_CONFIG[locale] || LOCALE_CONFIG.fa;

  return {
    title: {
      default: meta.title,
      template: meta.template,
    },
    description: meta.description,
    keywords: meta.keywords,
    authors: [
      {
        name: meta.authorName,
        url: siteUrl,
      },
      { name: "SeyedCj", url: "https://github.com/Seyed-Cj" },
    ],
    creator: meta.creator,
    publisher: meta.publisher,
    applicationName: meta.applicationName,
    generator: "Next.js",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fa: "/fa",
        en: "/en",
        ar: "/ar",
        "fa-IR": "/fa",
        "en-US": "/en",
        "ar-SA": "/ar",
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
      title: meta.title,
      description: meta.description,
      url: `/${locale}`,
      siteName: meta.siteName,
      images: [
        {
          url: "/portfolio.png",
          width: 1919,
          height: 1079,
          alt: meta.ogAlt,
          type: "image/png",
        },
      ],
      locale: meta.ogLocale,
      alternateLocale: meta.alternateLocales,
      type: "profile",
      firstName: meta.firstName,
      lastName: meta.lastName,
      username: "SeyedCj",
      gender: "male",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
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
      "author-alternate": meta.authorAlt,
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
  const dir = locale === "en" ? "ltr" : "rtl";
  const activeFont =
    locale === "fa" ? fonts.pelak : locale === "ar" ? fonts.notoArabic : fonts.inter;
  const meta = LOCALE_CONFIG[locale] || LOCALE_CONFIG.fa;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: meta.personName,
        givenName: meta.personGivenName,
        additionalName: meta.personAdditionalName,
        familyName: meta.personFamilyName,
        alternateName: REALISTIC_NAME_VARIANTS,
        jobTitle: meta.personJobTitle,
        description: meta.personDescription,
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
          name: meta.countryName,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: meta.websiteName,
        alternateName: ["SeyedCj", "seyedcj.ir"],
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
        inLanguage: ["fa", "en", "ar"],
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/${locale}#profilepage`,
        url: `${siteUrl}/${locale}`,
        name: meta.profilePageName,
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@id": `${siteUrl}/#person`,
        },
        mainEntity: {
          "@id": `${siteUrl}/#person`,
        },
        inLanguage: meta.profilePageLang,
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#projects`,
        name: meta.itemListProjectsName,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "SoftwareSourceCode",
              name: meta.project1Name,
              description: meta.project1Desc,
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
              name: meta.project2Name,
              description: meta.project2Desc,
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
              name: meta.project3Name,
              description: meta.project3Desc,
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
      className={`${fonts.inter.variable} ${fonts.pelak.variable} ${fonts.notoArabic.variable} h-full overflow-hidden`}
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
