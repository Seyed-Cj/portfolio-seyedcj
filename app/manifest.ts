import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "سید امیرمحمد موسوی | پورتفولیو و رزومه مهندس نرم‌افزار",
    short_name: "SeyedCj",
    description:
      "وب‌سایت شخصی و پورتفولیو سید امیرمحمد موسوی (شبستری) — مهندس نرم‌افزار و توسعه‌دهنده فول‌استک وب (SeyedCj)",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/SeyedCj.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
