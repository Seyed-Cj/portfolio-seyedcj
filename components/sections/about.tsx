"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Glow } from "@/components/effects/glow";

const ease = [0.25, 0.4, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.12, duration: 0.7, ease },
  }),
};

export function About() {
  const t = useTranslations("About");

  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden px-6">
      <Glow className="top-0 right-0" size={400} />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
          <p className="mb-4 text-sm font-medium tracking-[0.2em] text-white/30 uppercase">
            {t("label")}
          </p>
          <h2 className="mb-12 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {t("title")}
          </h2>
        </motion.div>

        <div className="grid gap-16 md:grid-cols-2">
          <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-lg leading-relaxed text-white/50">{t("description1")}</p>
          </motion.div>
          <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-lg leading-relaxed text-white/50">{t("description2")}</p>
          </motion.div>
        </div>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-16"
        >
          {[
            { value: "5+", label: t("stat1") },
            { value: "30+", label: t("stat2") },
            { value: "10+", label: t("stat3") },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-bold text-white sm:text-4xl">{value}</p>
              <p className="mt-2 text-sm text-white/30">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
