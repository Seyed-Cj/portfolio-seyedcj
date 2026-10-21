"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/context/theme-context";

interface GlowProps {
  className?: string;
  size?: number;
}

export function Glow({ className = "", size = 300 }: GlowProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  const isLight = theme === "light";
  const glowGradient = isLight
    ? "radial-gradient(ellipse at center, rgba(0, 113, 227, 0.15) 0%, transparent 70%)"
    : "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.8) 0%, transparent 70%)";

  if (!isDesktop) {
    return (
      <div
        className={`pointer-events-none absolute rounded-full ${className} ${
          isLight ? "opacity-[0.08]" : "opacity-[0.04]"
        }`}
        style={{
          width: size,
          height: size,
          background: glowGradient,
        }}
      />
    );
  }

  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className} ${
        isLight ? "opacity-[0.08]" : "opacity-[0.04]"
      }`}
      style={{
        width: size,
        height: size,
        background: glowGradient,
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: isLight ? [0.06, 0.1, 0.06] : [0.04, 0.06, 0.04],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
