"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.25, 0.4, 0.25, 1] as const;

interface SlideSectionProps {
  id: string;
  isActive: boolean;
  isPast: boolean;
  isFirstRender: boolean;
  children: React.ReactNode;
}

export function SlideSection({
  id,
  isActive,
  isPast,
  isFirstRender,
  children,
}: SlideSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, only fade opacity without y translation
  const enterY = shouldReduceMotion ? 0 : 20;
  const exitY = shouldReduceMotion ? 0 : -20;

  return (
    <motion.section
      id={id}
      initial={false}
      animate={isActive ? "active" : "inactive"}
      variants={{
        active: {
          opacity: 1,
          y: 0,
          visibility: "visible",
          transition: {
            duration: 0.5,
            ease,
            // On navigation transitions, a slight delay produces the exact mode="wait" sequencing
            delay: isFirstRender ? 0 : 0.2,
          },
        },
        inactive: {
          opacity: 0,
          y: isPast ? exitY : enterY,
          transition: {
            duration: 0.4,
            ease,
          },
          transitionEnd: {
            visibility: "hidden",
          },
        },
      }}
      className={cn(
        "absolute inset-0",
        isActive ? "pointer-events-auto z-10" : "pointer-events-none -z-10",
      )}
      aria-hidden={!isActive}
      inert={!isActive ? true : undefined}
    >
      {/* Motion wrapper that propagates "visible" vs "hidden" to inner child fadeUp variants */}
      <motion.div
        initial={false}
        animate={isActive ? "visible" : "hidden"}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
