"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const SECTIONS = ["hero", "about", "projects", "skills", "contact"] as const;
type SectionId = (typeof SECTIONS)[number];

interface SectionContextValue {
  current: number;
  total: number;
  goTo: (index: number, push?: boolean) => void;
  next: () => void;
  prev: () => void;
}

const SectionContext = createContext<SectionContextValue | null>(null);

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number, push = true) => {
    const validIndex = Math.max(0, Math.min(index, SECTIONS.length - 1));
    setCurrent(validIndex);

    if (typeof window !== "undefined") {
      const targetHash = `#${SECTIONS[validIndex]}`;
      if (window.location.hash !== targetHash) {
        if (push) {
          window.history.pushState(null, "", targetHash);
        } else {
          window.history.replaceState(null, "", targetHash);
        }
      }
    }
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => {
      const nextIdx = Math.min(prev + 1, SECTIONS.length - 1);
      if (typeof window !== "undefined") {
        const targetHash = `#${SECTIONS[nextIdx]}`;
        if (window.location.hash !== targetHash) {
          window.history.pushState(null, "", targetHash);
        }
      }
      return nextIdx;
    });
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => {
      const prevIdx = Math.max(prev - 1, 0);
      if (typeof window !== "undefined") {
        const targetHash = `#${SECTIONS[prevIdx]}`;
        if (window.location.hash !== targetHash) {
          window.history.pushState(null, "", targetHash);
        }
      }
      return prevIdx;
    });
  }, []);

  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace("#", "");
      const idx = SECTIONS.indexOf(hash as SectionId);
      if (idx >= 0) {
        setCurrent(idx);
      }
    };

    parseHash();

    window.addEventListener("hashchange", parseHash);
    window.addEventListener("popstate", parseHash);

    return () => {
      window.removeEventListener("hashchange", parseHash);
      window.removeEventListener("popstate", parseHash);
    };
  }, []);

  return (
    <SectionContext.Provider value={{ current, total: SECTIONS.length, goTo, next, prev }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSection() {
  const ctx = useContext(SectionContext);
  if (!ctx) throw new Error("useSection must be used within SectionProvider");
  return ctx;
}

export { SECTIONS };
export type { SectionId };
