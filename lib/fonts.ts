import localFont from "next/font/local";
import { Inter, Noto_Sans_Arabic } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
  display: "swap",
});

const pelak = localFont({
  src: [
    {
      path: "../fonts/PelakFA-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-pelak",
  display: "swap",
});

export const fonts = {
  inter,
  pelak,
  notoArabic,
} as const;

export type FontName = keyof typeof fonts;
