import localFont from "next/font/local";

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
  pelak,
} as const;

export type FontName = keyof typeof fonts;
