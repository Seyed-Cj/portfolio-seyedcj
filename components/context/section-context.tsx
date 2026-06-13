"use client";

import { createContext, useCallback, useContext, useState } from "react";

const SECTIONS = ["hero", "about", "projects", "skills", "contact"] as const;
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

  const goTo = useCallback((index: number) => {
    setCurrent(Math.max(0, Math.min(index, SECTIONS.length - 1)));
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => Math.min(prev + 1, SECTIONS.length - 1));
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => Math.max(prev - 1, 0));
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
