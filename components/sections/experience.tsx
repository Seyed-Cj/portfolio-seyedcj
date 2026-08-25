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
    tags: ["PAWN", "HTML/CSS", "Bootstrap","Javascript", "Python", "Django"],
  },
];

export function Experience() {
  const t = useTranslations("Experience");

  return (
    <section className="relative flex h-full w-full items-start justify-center overflow-x-hidden overflow-y-auto px-4 pt-6 pb-20 sm:px-6 md:items-center md:overflow-hidden md:py-8">
      <Glow className="top-1/3 right-1/4" size={450} />

      <div className="relative z-10 mx-auto max-w-4xl w-full">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-8 sm:mb-12"
        >
          <p className="mb-4 text-sm font-medium tracking-[0.2em] text-white/60 uppercase">
            {t("label")}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {t("title")}
          </h2>
        </motion.div>

        <div className="relative border-s border-white/10 ms-3 sm:ms-4 ps-6 sm:ps-8 space-y-6 sm:space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              custom={i + 1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="relative group"
            >
              {/* Timeline marker point */}
              <div className="absolute -inset-s-7.75 sm:-inset-s-9.75 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-white/40 bg-[#050505] ring-4 ring-[#050505] group-hover:border-white group-hover:bg-white/20 transition-colors">
                <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
              </div>

              {/* Content card */}
              <div className="rounded-2xl border border-white/10 bg-white/2 p-5 sm:p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-white/60 shrink-0" />
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      {t(`${exp.id}Role` as never)}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-white/60">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{t(`${exp.id}Period` as never)}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-medium text-white/80 mb-3">
                  {t(`${exp.id}Company` as never)}
                </p>

                <p className="text-sm leading-relaxed text-white/70 mb-4">
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
