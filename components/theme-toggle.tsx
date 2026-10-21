"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/context/theme-context";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const t = useTranslations("ThemeToggle");

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      onClick={toggleTheme}
      type="button"
      aria-label={t("toggle")}
      title={t("toggle")}
      className="flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white/85 text-[#1d1d1f] shadow-sm backdrop-blur-md transition-all duration-300 hover:border-black/20 hover:bg-black/5 hover:text-[#1d1d1f] focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:outline-none md:bg-white/70 dark:border-white/10 dark:bg-[#0a0a0a]/95 dark:text-white/80 dark:shadow-none dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:ring-white/20 md:dark:bg-white/5 md:dark:backdrop-blur-xl"
    >
      {/* If not mounted yet, render placeholder or dark icon */}
      {!mounted ? (
        <Moon className="h-4 w-4" />
      ) : theme === "dark" ? (
        <motion.div
          key="moon"
          initial={{ rotate: -45, scale: 0.7, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 45, scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Moon className="h-4 w-4 text-white/80" />
        </motion.div>
      ) : (
        <motion.div
          key="sun"
          initial={{ rotate: 45, scale: 0.7, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: -45, scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Sun className="h-4 w-4 text-[#1d1d1f]" />
        </motion.div>
      )}
    </motion.button>
  );
}
