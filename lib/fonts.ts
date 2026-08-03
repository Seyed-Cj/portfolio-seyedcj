import localFont from "next/font/local";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
} as const;

export type FontName = keyof typeof fonts;

