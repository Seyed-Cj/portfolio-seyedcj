"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const SECTIONS = ["hero", "about", "experience", "projects", "skills", "contact"] as const;
type SectionId = (typeof SECTIONS)[number];

interface SectionContextValue {
  current: number;
  total: number;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
}

const SectionContext = createContext<SectionContextValue | null>(null);

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState(0);
  const isFirstRender = useRef(true);

  const goTo = useCallback((index: number) => {
    setCurrent(Math.max(0, Math.min(index, SECTIONS.length - 1)));
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => Math.min(prev + 1, SECTIONS.length - 1));
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  }, []);

  // Sync state to URL hash cleanly after render
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const targetHash = `#${SECTIONS[current]}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, "", targetHash);
    }
  }, [current]);

  // Read URL hash on mount and listen to browser back/forward (popstate/hashchange)
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
