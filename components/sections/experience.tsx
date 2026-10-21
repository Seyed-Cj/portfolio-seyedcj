"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Glow } from "@/components/effects/glow";
import { Briefcase, Calendar } from "lucide-react";

const ease = [0.25, 0.4, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.1, duration: 0.6, ease },
  }),
};

interface ExperienceItem {
  id: string;
  tags: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: "exp1",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Docker", "TypeScript", "Redis"],
  },
  {
    id: "exp2",
    tags: ["Javascript", "React", "Node.js", "MongoDB", "Tailwind"],
  },
  {
    id: "exp3",
    tags: ["PAWN", "HTML/CSS", "Bootstrap", "Javascript", "Python", "Django"],
  },
];

export function Experience() {
  const t = useTranslations("Experience");

  return (
    <section className="relative flex h-full w-full items-start justify-center overflow-x-hidden overflow-y-auto px-4 pt-14 pb-24 sm:px-6 sm:pt-16 sm:pb-20 md:items-center md:overflow-hidden md:py-8">
      <Glow className="top-1/3 right-1/4" size={450} />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-8 sm:mb-12"
        >
          <p className="mb-4 text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase dark:text-white/60">
            {t("label")}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#1d1d1f] sm:text-5xl dark:text-white">
            {t("title")}
          </h2>
        </motion.div>

        <div className="relative ms-3 space-y-6 border-s border-black/10 ps-6 sm:ms-4 sm:space-y-8 sm:ps-8 dark:border-white/10">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              custom={i + 1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="group relative"
            >
              {/* Timeline marker point */}
              <div className="absolute -inset-s-7.75 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-black/30 bg-[#f5f5f7] ring-4 ring-[#f5f5f7] transition-colors group-hover:border-black group-hover:bg-black/10 sm:-inset-s-9.75 dark:border-white/40 dark:bg-[#050505] dark:ring-[#050505] dark:group-hover:border-white dark:group-hover:bg-white/20">
                <div className="h-1.5 w-1.5 rounded-full bg-[#1d1d1f] dark:bg-white/80" />
              </div>

              {/* Content card */}
              <div className="rounded-2xl border border-black/10 bg-white/75 p-5 shadow-sm transition-all duration-300 hover:border-black/20 hover:bg-white/95 sm:p-6 dark:border-white/10 dark:bg-white/2 dark:shadow-none dark:hover:border-white/20 dark:hover:bg-white/4">
                <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 shrink-0 text-[#86868b] dark:text-white/60" />
                    <h3 className="text-base font-semibold text-[#1d1d1f] sm:text-lg dark:text-white">
                      {t(`${exp.id}Role` as never)}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-[#86868b] dark:text-white/60">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{t(`${exp.id}Period` as never)}</span>
                  </div>
                </div>

                <p className="mb-3 text-xs font-medium text-[#515154] sm:text-sm dark:text-white/80">
                  {t(`${exp.id}Company` as never)}
                </p>

                <p className="mb-4 text-sm leading-relaxed text-[#515154] dark:text-white/70">
                  {t(`${exp.id}Description` as never)}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
