"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project } from "@/types/project";

const TAG_FILTERS = ["ETL/ELT", "Data Viz", "IoT"] as const;
const normalizeTag = (tag: string) => tag.toLowerCase();

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const normalizedProjects = useMemo(() => {
    return [...projects].sort((a, b) => b.year - a.year);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!activeTag) return normalizedProjects;
    return normalizedProjects.filter((project) =>
      project.tags.map((tag) => normalizeTag(tag)).includes(activeTag),
    );
  }, [activeTag, normalizedProjects]);

  const handleFilterClick = (tag: string | null) => () => {
    if (!tag) {
      setActiveTag(null);
      return;
    }
    const normalized = normalizeTag(tag);
    setActiveTag((prev) => (prev === normalized ? null : normalized));
  };

  return (
    <div className="space-y-10">
      <div
        role="toolbar"
        aria-label="Filter projects by specialization"
        className="flex flex-wrap gap-3"
      >
        <button
          type="button"
          onClick={handleFilterClick(null)}
          className={[
            "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
            activeTag === null
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border/70 bg-background text-foreground hover:border-primary hover:text-primary",
          ].join(" ")}
          aria-pressed={activeTag === null}
        >
          All
        </button>
        {TAG_FILTERS.map((tag) => {
          const normalizedTag = normalizeTag(tag);
          const isActive = activeTag === normalizedTag;
          return (
            <button
              key={tag}
              type="button"
              onClick={handleFilterClick(tag)}
              className={[
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold capitalize transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/70 bg-background text-foreground hover:border-primary hover:text-primary",
              ].join(" ")}
              aria-pressed={isActive}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div
        className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
        aria-live="polite"
        aria-busy={false}
      >
        {filteredProjects.map((project, index) => {
          return (
            <article
              key={project.slug}
              className="group flex h-full flex-col gap-4 rounded-3xl border border-border/60 bg-background/70 p-4 shadow-subtle transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg focus-within:-translate-y-1 focus-within:border-primary/60 focus-within:shadow-lg"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="relative overflow-hidden rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                aria-labelledby={`${project.slug}-title`}
                aria-describedby={`${project.slug}-summary`}
              >
                <span className="sr-only">Open {project.title}</span>
                <Image
                  src={project.heroImage}
                  alt={`${project.title} visualization`}
                  width={640}
                  height={420}
                  className="h-56 w-full rounded-2xl object-cover transition duration-500 group-hover:scale-[1.04] group-focus-within:scale-[1.04]"
                  sizes="(min-width: 1280px) 360px, (min-width: 640px) 50vw, 100vw"
                  priority={index < 3}
                />
                <div
                  className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
                  aria-hidden="true"
                >
                  <p className="p-4 text-sm text-white/90">{project.summary}</p>
                </div>
              </Link>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <span>{project.role}</span>
                  <span>{project.year}</span>
                </div>
                <h3
                  id={`${project.slug}-title`}
                  className="text-xl font-semibold text-foreground"
                >
                  {project.title}
                </h3>
                <p id={`${project.slug}-summary`} className="sr-only">
                  {project.summary}
                </p>
              </div>
              <div className="mt-auto flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="pt-2">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-foreground shadow-subtle transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
                >
                  Explore project
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <p className="rounded-3xl border border-dashed border-border/60 bg-muted/40 p-6 text-center text-sm text-muted-foreground">
          No projects match this tag yet. Try another filter or explore all work.
        </p>
      )}
    </div>
  );
}
