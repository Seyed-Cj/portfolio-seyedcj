"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ExternalLink, Code2, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Glow } from "@/components/effects/glow";

const ease = [0.25, 0.4, 0.25, 1] as const;

interface ProjectItem {
  id: number;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  tags: string[];
  isPlaceholder?: boolean;
}

const projects: ProjectItem[] = [
  {
    id: 1,
    image: "/projects/1.png",
    githubUrl: "https://github.com/Seyed-Cj/nextjs-mobile-store",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Swiper"],
  },
  {
    id: 2,
    image: "/projects/2.png",
    githubUrl: "https://github.com/Seyed-Cj/onlinetaxi-backend",
    tags: ["NestJS", "PostgreSQL", "WebSocket", "RabbitMQ", "Docker", "Swagger", "Redis"],
  },
  {
    id: 3,
    image: "/projects/3.png",
    isPlaceholder: true,
    tags: ["Next.js", "NestJS", "PostgreSQL", "Redis"],
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

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const t = useTranslations("Projects");
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hasImage = !project.isPlaceholder && !imageError;
  const hasLinks = Boolean(project.demoUrl || project.githubUrl);

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/2"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-white/5">
        {hasImage ? (
          <motion.div
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.6, ease }}
            className="absolute inset-0"
          >
            <Image
              src={project.image}
              alt={t(`project${project.id}Title` as never)}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={index === 1}
              onError={() => setImageError(true)}
            />
          </motion.div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/3 p-4 text-center">
            <ImageIcon className="h-8 w-8 text-white/30" />
            <span className="text-xs font-medium tracking-wider text-white/50 uppercase">
              {t("previewComingSoon")}
            </span>
          </div>
        )}

        {hasLinks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 hidden items-center justify-center gap-3 bg-black/60 backdrop-blur-sm md:flex"
          >
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-black transition-transform hover:scale-105"
                aria-label={t("liveDemo")}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>{t("liveDemo")}</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white transition-transform hover:scale-105"
                aria-label={t("sourceCode")}
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>{t("sourceCode")}</span>
              </a>
            )}
          </motion.div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-lg font-semibold text-white">
          {t(`project${project.id}Title` as never)}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-white/70">
          {t(`project${project.id}Description` as never)}
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {hasLinks && (
          <div className="flex items-center gap-2 pt-3 border-t border-white/5 md:hidden">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-white/90"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                {t("liveDemo")}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Code2 className="h-3.5 w-3.5" />
                {t("sourceCode")}
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Projects() {
  const t = useTranslations("Projects");

  return (
    <section className="relative flex h-full w-full items-start justify-center overflow-x-hidden overflow-y-auto px-4 pt-6 pb-20 sm:px-6 md:items-center md:overflow-hidden md:py-8">
      <Glow className="bottom-0 left-0" size={500} />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-12"
        >
          <p className="mb-4 text-sm font-medium tracking-[0.2em] text-white/60 uppercase">
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
