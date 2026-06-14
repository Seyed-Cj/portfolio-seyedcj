"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ExternalLink, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Glow } from "@/components/effects/glow";

const ease = [0.25, 0.4, 0.25, 1] as const;

const projects = [
  {
    id: 1,
    tags: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    id: 2,
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: 3,
    tags: ["Vue.js", "Firebase", "Vuetify"],
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

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const t = useTranslations("Projects");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]"
    >
      <div className="relative aspect-video overflow-hidden bg-white/[0.02]">
        <motion.div
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.6, ease }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <span className="text-2xl font-bold text-white/20">
              {String(project.id).padStart(2, "0")}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 backdrop-blur-sm"
        >
          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-110"
            aria-label="View project"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-transform hover:scale-110"
            aria-label="View source"
          >
            <Code2 className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      <div className="p-6">
        <h3 className="mb-2 text-lg font-semibold text-white">
          {t(`project${project.id}Title` as never)}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-white/40">
          {t(`project${project.id}Description` as never)}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const t = useTranslations("Projects");

  return (
    <section className="relative flex h-full w-full items-start justify-center overflow-y-auto overflow-x-hidden px-4 sm:px-6 pt-6 pb-20 md:items-center md:overflow-hidden md:py-8">
      <Glow className="bottom-0 left-0" size={500} />

      <div className="relative z-10 mx-auto max-w-6xl">
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
