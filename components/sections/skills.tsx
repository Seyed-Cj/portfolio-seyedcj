"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Glow } from "@/components/effects/glow";

const ease = [0.25, 0.4, 0.25, 1] as const;

const skillGroups = [
  {
    id: "frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"],
  },
  {
    id: "backend",
    skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"],
  },
  {
    id: "tools",
    skills: ["Git", "Docker", "AWS", "CI/CD", "Linux"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.1, duration: 0.6, ease },
  }),
};

function SkillGroup({ group, index }: { group: (typeof skillGroups)[number]; index: number }) {
  const t = useTranslations("Skills");

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="rounded-2xl border border-white/5 bg-white/[0.02] p-8"
    >
      <h3 className="mb-6 text-sm font-medium tracking-[0.2em] text-white/30 uppercase">
        {t(`group${group.id}` as never)}
      </h3>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  const t = useTranslations("Skills");

  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden px-6">
      <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={500} />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-12"
        >
          <p className="mb-4 text-sm font-medium tracking-[0.2em] text-white/30 uppercase">
            {t("label")}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">{t("title")}</h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <SkillGroup key={group.id} group={group} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
