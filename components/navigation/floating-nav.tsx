"use client";

import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Home, User, FolderKanban, Wrench, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSection, SECTIONS } from "@/components/context/section-context";

const navItems = [
  { id: 0, icon: Home, label: "Home" },
  { id: 1, icon: User, label: "About" },
  { id: 2, icon: FolderKanban, label: "Projects" },
  { id: 3, icon: Wrench, label: "Skills" },
  { id: 4, icon: Mail, label: "Contact" },
] as const;

export function FloatingNav() {
  const { current, goTo, next, prev } = useSection();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key >= "1" && e.key <= "5") {
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
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 50) {
        const section = document.querySelector("section");
        if (section) {
          const isScrollable = section.scrollHeight > section.clientHeight + 1;
          if (isScrollable) {
            const atTop = section.scrollTop <= 0;
            const atBottom =
              section.scrollTop + section.clientHeight >= section.scrollHeight - 1;
            if (delta > 0 && !atBottom) return;
            if (delta < 0 && !atTop) return;
          }
        }
        if (delta > 0) next();
        else prev();
      }
    };
    let wheelTimeout: ReturnType<typeof setTimeout>;
    const handleWheel = (e: WheelEvent) => {
      const section = document.querySelector("section");
      if (section) {
        const isScrollable = section.scrollHeight > section.clientHeight + 1;
        if (isScrollable) {
          const atTop = section.scrollTop <= 0;
          const atBottom =
            section.scrollTop + section.clientHeight >= section.scrollHeight - 1;
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
  }, [next, prev]);

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
        <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-xl">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => goTo(id)}
              aria-label={label}
              aria-current={current === id ? "true" : undefined}
              className={cn(
                "group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300",
                current === id ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60",
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="pointer-events-none absolute right-full mr-3 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:opacity-100">
                {label}
              </span>
            </button>
          ))}
        </div>
      </motion.nav>

      {/* Mobile: bottom horizontal nav */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 md:hidden"
        aria-label="Section navigation"
      >
        <div className="flex gap-1 rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-xl">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => goTo(id)}
              aria-label={label}
              aria-current={current === id ? "true" : undefined}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300",
                current === id ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60",
              )}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </motion.nav>

      {/* Section progress indicator */}
      <div className="fixed right-6 bottom-6 z-50 hidden md:block">
        <motion.div
          className="text-xs font-medium text-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {String(current + 1).padStart(2, "0")} / {String(SECTIONS.length).padStart(2, "0")}
        </motion.div>
      </div>
    </>
  );
}
