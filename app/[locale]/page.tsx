"use client";

import { useEffect, useState } from "react";
import { SectionProvider, useSection } from "@/components/context/section-context";
import { Background } from "@/components/effects/background";
import { FloatingNav } from "@/components/navigation/floating-nav";
import { SlideSection } from "@/components/slide-section";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";

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
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsFirstRender(false), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden">
      {sectionList.map(({ id, Component }, index) => {
        const isActive = current === index;
        const isPast = index < current;
        return (
          <SlideSection
            key={id}
            id={id}
            isActive={isActive}
            isPast={isPast}
            isFirstRender={isFirstRender}
          >
            <Component />
          </SlideSection>
        );
      })}
      <noscript>
        <style>{`
          main { height: auto !important; overflow: visible !important; }
          main > section { position: relative !important; opacity: 1 !important; transform: none !important; pointer-events: auto !important; visibility: visible !important; min-height: 100vh; }
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
