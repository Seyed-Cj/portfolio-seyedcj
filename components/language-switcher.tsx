"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronUp, Check } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const ease = [0.25, 0.4, 0.25, 1] as const;

export function LanguageSwitcher() {
  const t = useTranslations("LanguageToggle");
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleSelectLocale = (targetLocale: string) => {
    if (targetLocale !== currentLocale) {
      router.replace(pathname, { locale: targetLocale });
    }
    setIsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    },
    [isOpen],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div ref={containerRef} className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.2, ease }}
            className="absolute bottom-full left-0 mb-2 flex min-w-35 flex-col gap-1 rounded-2xl border border-white/10 bg-black/80 p-1.5 shadow-2xl backdrop-blur-xl"
            role="menu"
            aria-orientation="vertical"
            aria-label={t("label")}
          >
            {routing.locales.map((loc) => {
              const isActive = loc === currentLocale;
              return (
                <button
                  key={loc}
                  onClick={() => handleSelectLocale(loc)}
                  role="menuitem"
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-200",
                    isActive
                      ? "bg-white/15 font-semibold text-white shadow-sm"
                      : "text-white/60 hover:bg-white/10 hover:text-white",
                  )}
                >
                  <span>{t(loc)}</span>
                  {isActive && <Check className="h-3.5 w-3.5 text-white" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={t("label")}
        className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/80 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:outline-none"
      >
        <Globe className="h-4 w-4 text-white/70" />
        <span className="uppercase">{currentLocale}</span>
        <ChevronUp
          className={cn(
            "h-3.5 w-3.5 text-white/50 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </motion.button>
    </div>
  );
}
