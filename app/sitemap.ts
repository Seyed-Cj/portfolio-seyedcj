import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seyedcj.ir";

  return routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === routing.defaultLocale ? 1.0 : 0.9,
    alternates: {
      languages: {
        en: `${siteUrl}/en`,
        fa: `${siteUrl}/fa`,
        "x-default": `${siteUrl}/${routing.defaultLocale}`,
      },
    },
  }));
}
