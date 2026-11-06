"use client";

import { SectionProvider, useSection } from "@/components/context/section-context";
import { Background } from "@/components/effects/background";
import { FloatingNav } from "@/components/navigation/floating-nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { cn } from "@/lib/utils";

const sectionList = [
  { id: "hero", Component: Hero },
  { id: "about", Component: About },
  { id: "experience", Component: Experience },
  { id: "projects", Component: Projects },
  { id: "skills", Component: Skills },
  { id: "contact", Component: Contact },
] as const;

function Sections() {
  const { current } = useSection();

  return (
    <main className="relative h-screen w-full overflow-hidden">
      {sectionList.map(({ id, Component }, index) => {
        const isActive = current === index;
        const isPast = index < current;
        return (
          <div
            key={id}
            className={cn(
              "absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.25,0.4,0.25,1)]",
              isActive
                ? "pointer-events-auto z-10 translate-y-0 opacity-100"
                : "pointer-events-none -z-10 opacity-0",
              !isActive && (isPast ? "-translate-y-5" : "translate-y-5"),
            )}
            aria-hidden={!isActive}
            inert={!isActive ? true : undefined}
          >
            <Component />
          </div>
        );
      })}
      <noscript>
        <style>{`
          main { height: auto !important; overflow: visible !important; }
          main > div { position: relative !important; opacity: 1 !important; transform: none !important; pointer-events: auto !important; min-height: 100vh; }
          html, body { overflow: auto !important; height: auto !important; }
        `}</style>
      </noscript>
    </main>
  );
}

export default function HomePage() {
  return (
    <SectionProvider>
      <Background />
      <FloatingNav />
      <Sections />
    </SectionProvider>
  );
}
