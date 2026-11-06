import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seyedcj.ir";
  const lastModified = new Date("2026-11-06");

  return routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: locale === "fa" ? 1.0 : 0.8,
    alternates: {
      languages: {
        fa: `${siteUrl}/fa`,
        en: `${siteUrl}/en`,
        "x-default": `${siteUrl}/fa`,
      },
    },
  }));
}
