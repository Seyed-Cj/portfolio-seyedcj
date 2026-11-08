"use client";

import { useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Home, User, Briefcase, FolderKanban, Wrench, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSection, SECTIONS } from "@/components/context/section-context";
import { useNavVisibility } from "@/hooks/use-nav-visibility";

const ease = [0.25, 0.4, 0.25, 1] as const;

const navItems = [
  { id: 0, sectionId: "hero", icon: Home, label: "Home" },
  { id: 1, sectionId: "about", icon: User, label: "About" },
  { id: 2, sectionId: "experience", icon: Briefcase, label: "Experience" },
  { id: 3, sectionId: "projects", icon: FolderKanban, label: "Projects" },
  { id: 4, sectionId: "skills", icon: Wrench, label: "Skills" },
  { id: 5, sectionId: "contact", icon: Mail, label: "Contact" },
] as const;

export function FloatingNav() {
  const { current, goTo, next, prev } = useSection();
  const { isVisible: isNavVisible, showNav } = useNavVisibility(current);
  const shouldReduceMotion = useReducedMotion();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key >= "1" && e.key <= "6") {
        e.preventDefault();
        goTo(parseInt(e.key) - 1);
      }
    },
    [next, prev, goTo],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    let touchStartY = 0;
    let wasAtTop = false;
    let wasAtBottom = false;

    const getScrollEl = () => {
      const section = document.getElementById(SECTIONS[current]);
      if (!section) return null;
      return section.querySelector<HTMLElement>(".overflow-y-auto") || section;
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      const section = getScrollEl();
      if (section) {
        wasAtTop = section.scrollTop <= 2;
        wasAtBottom =
          Math.ceil(section.scrollTop + section.clientHeight) >= section.scrollHeight - 2;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 50) {
        const section = getScrollEl();
        if (section) {
          const isScrollable = section.scrollHeight > section.clientHeight + 1;
          if (isScrollable) {
            const isCurrentlyAtTop = section.scrollTop <= 2;
            const isCurrentlyAtBottom =
              Math.ceil(section.scrollTop + section.clientHeight) >= section.scrollHeight - 2;

            // Only transition to next section if gesture started at the bottom AND is still at the bottom
            if (delta > 0 && (!wasAtBottom || !isCurrentlyAtBottom)) return;

            // Only transition to prev section if gesture started at the top AND is still at the top
            if (delta < 0 && (!wasAtTop || !isCurrentlyAtTop)) return;
          }
        }
        if (delta > 0) next();
        else prev();
      }
    };

    let wheelTimeout: ReturnType<typeof setTimeout>;
    const handleWheel = (e: WheelEvent) => {
      const section = getScrollEl();
      if (section) {
        const isScrollable = section.scrollHeight > section.clientHeight + 1;
        if (isScrollable) {
          const atTop = section.scrollTop <= 2;
          const atBottom =
            Math.ceil(section.scrollTop + section.clientHeight) >= section.scrollHeight - 2;
          if (e.deltaY > 0 && !atBottom) return;
          if (e.deltaY < 0 && !atTop) return;
        }
      }
      e.preventDefault();
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (e.deltaY > 0) next();
        else prev();
      }, 50);
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(wheelTimeout);
    };
  }, [next, prev, current]);

  return (
    <>
      {/* Desktop: right side vertical nav */}
      <motion.nav
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="fixed top-1/2 right-6 z-50 hidden -translate-y-1/2 md:block"
        aria-label="Section navigation"
      >
        <div className="flex flex-col gap-1 rounded-2xl border border-black/10 bg-white/80 p-2 shadow-xl shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-2xl">
          {navItems.map(({ id, sectionId, icon: Icon, label }) => (
            <a
              key={id}
              href={`#${sectionId}`}
              onClick={(e) => {
                e.preventDefault();
                goTo(id);
                window.history.replaceState(null, "", `#${sectionId}`);
              }}
              aria-label={label}
              aria-current={current === id ? "true" : undefined}
              className={cn(
                "group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300",
                current === id
                  ? "bg-black/10 text-[#1d1d1f] shadow-sm dark:bg-white/10 dark:text-white"
                  : "text-[#515154] hover:text-[#1d1d1f] dark:text-white/50 dark:hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="pointer-events-none absolute right-full mr-3 rounded-lg bg-[#1d1d1f] px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white opacity-0 shadow-md backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 dark:bg-white/10 dark:text-white">
                {label}
              </span>
            </a>
          ))}
        </div>
      </motion.nav>

      {/* Mobile: bottom horizontal nav */}
      <motion.nav
        initial={false}
        animate={
          isNavVisible
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: shouldReduceMotion ? 0 : "calc(100% + 1.5rem)" }
        }
        transition={{ duration: 0.28, ease }}
        onFocusCapture={showNav}
        onMouseEnter={showNav}
        onTouchStart={showNav}
        aria-hidden={!isNavVisible ? "true" : undefined}
        className={cn(
          "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 md:hidden",
          !isNavVisible && "pointer-events-none",
        )}
        aria-label="Section navigation"
      >
        <div className="flex gap-1 rounded-2xl border border-black/10 bg-white/85 p-2 shadow-xl shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0a0a]/95 dark:shadow-2xl">
          {navItems.map(({ id, sectionId, icon: Icon, label }) => (
            <a
              key={id}
              href={`#${sectionId}`}
              onClick={(e) => {
                e.preventDefault();
                showNav();
                goTo(id);
                window.history.replaceState(null, "", `#${sectionId}`);
              }}
              aria-label={label}
              aria-current={current === id ? "true" : undefined}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300",
                current === id
                  ? "bg-black/10 text-[#1d1d1f] shadow-sm dark:bg-white/10 dark:text-white"
                  : "text-[#515154] hover:text-[#1d1d1f] dark:text-white/50 dark:hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </motion.nav>
    </>
  );
}
