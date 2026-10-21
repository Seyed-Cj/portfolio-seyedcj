"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Glow } from "@/components/effects/glow";

const ease = [0.25, 0.4, 0.25, 1] as const;

const skillGroups = [
  {
    id: "frontend",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "Bootstrap",
      "Framer Motion",
    ],
  },
  {
    id: "backend",
    skills: [
      "Node.js",
      "Express.js",
      "NestJS",
      "Python",
      "MongoDB",
      "MySQL",
      "PostgreSQL",
      "Swagger",
      "Telegram Bot",
    ],
  },
  {
    id: "tools",
    skills: ["Git", "Docker", "Linux", "Postman", "Prisma", "Drizzle Orm"],
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
      className="rounded-2xl border border-black/10 bg-white/80 p-8 shadow-md shadow-black/5 dark:border-white/5 dark:bg-white/2 dark:shadow-none"
    >
      <h3 className="mb-6 text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase dark:text-white/60">
        {t(`group${group.id}` as never)}
      </h3>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm text-[#1d1d1f]/80 transition-all duration-300 hover:border-black/20 hover:bg-black/10 hover:text-[#1d1d1f] dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
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
    <section className="relative flex h-full w-full items-start justify-center overflow-x-hidden overflow-y-auto px-4 pt-14 pb-24 sm:px-6 sm:pt-16 sm:pb-20 md:items-center md:overflow-hidden md:pt-6">
      <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={500} />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-12"
        >
          <p className="mb-4 text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase dark:text-white/60">
            {t("label")}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#1d1d1f] sm:text-5xl dark:text-white">
            {t("title")}
          </h2>
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
