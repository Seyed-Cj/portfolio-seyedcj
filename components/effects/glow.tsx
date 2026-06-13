"use client";

import { motion } from "framer-motion";

interface GlowProps {
  className?: string;
  size?: number;
}

export function Glow({ className = "", size = 300 }: GlowProps) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full opacity-[0.04] blur-3xl ${className}`}
      style={{
        width: size,
        height: size,
        background: "radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, transparent 70%)",
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.04, 0.06, 0.04],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
