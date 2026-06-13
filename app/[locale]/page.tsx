"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SectionProvider, useSection } from "@/components/context/section-context";
import { Background } from "@/components/effects/background";
import { FloatingNav } from "@/components/navigation/floating-nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";

const sections = [Hero, About, Projects, Skills, Contact];

const ease = [0.25, 0.4, 0.25, 1] as const;

function Sections() {
  const { current } = useSection();
  const ActiveSection = sections[current];

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease }}
          className="absolute inset-0"
        >
          <ActiveSection />
        </motion.div>
      </AnimatePresence>
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
