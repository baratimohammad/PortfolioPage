import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProjectBySlug } from "@/lib/projects";

export const revalidate = 3600;

const project = getProjectBySlug("nyc-bike-and-weather") ?? notFound();

const approachPoints = project.approach.split('\n');

export const metadata: Metadata = {
  title: `${project.title} — Case Study`,
  description: project.summary,
};

export default function ProjectPage() {
  return (
    <main className="py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-16 lg:grid lg:grid-cols-[minmax(0,1fr),320px] lg:gap-12">
          <article className="space-y-16">
            <header className="space-y-8">
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <span className="rounded-full bg-muted px-3 py-1 text-foreground">{project.year}</span>
                <span>{project.role}</span>
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  {project.title}
                </h1>
                <p className="text-lg leading-relaxed text-muted-foreground">{project.summary}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="overflow-hidden rounded-3xl border border-border/60 bg-background/70 shadow-subtle">
                <Image
                  src={project.heroImage}
                  alt={`${project.title} hero visualization`}
                  width={1200}
                  height={720}
                  className="h-full w-full object-contain"
                  sizes="(min-width: 1024px) 1200px, 100vw"
                  priority
                />
              </div>
            </header>

            <section
              aria-labelledby="project-highlights"
              className="space-y-4 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle"
            >
              <div className="space-y-3">
                <h2 id="project-highlights" className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Highlights
                </h2>
              </div>
              <ul className="space-y-3 text-base leading-relaxed text-foreground">
                {project.stack.length > 0 && project.stack[0] ? (
                  <>
                    {[
                      "End-to-end ETL/ELT pipeline integrating NYC bike trip data with weather data",
                      "Cloud-native architecture using Snowflake, dbt Cloud, and S3",
                      "Automated orchestration and environment separation (dev/prod)",
                      "Designed for downstream correlation analysis of weather vs. bike usage"
                    ].map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </>
                ) : null}
              </ul>
            </section>

            <section
              aria-labelledby="project-problem-goal"
              className="grid gap-8 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle md:grid-cols-2"
            >
              <div className="space-y-3">
                <h2 id="project-problem-goal" className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Problem
                </h2>
                <p className="text-base leading-relaxed text-foreground">{project.problem}</p>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Goal</h3>
                <p className="text-base leading-relaxed text-foreground">{project.goal}</p>
              </div>
            </section>

            <section
              aria-labelledby="project-approach"
              className="space-y-4 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle"
            >
              <h2 id="project-approach" className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Approach
              </h2>
              <ul className="space-y-3 text-base leading-relaxed text-foreground">
                {approachPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="project-results"
              className="space-y-8 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle"
            >
              <div className="space-y-3">
                <h2 id="project-results" className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Results &amp; Impact
                </h2>
                <p className="text-base leading-relaxed text-foreground whitespace-pre-line">{project.results}</p>
              </div>
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-border/50 bg-muted/40 p-5"
                    >
                      <div className="text-2xl font-semibold text-primary">{metric.value}</div>
                      <div className="mt-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        {metric.label}
                      </div>
                      {metric.description && (
                        <p className="mt-2 text-sm text-muted-foreground">{metric.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </article>

          <aside className="space-y-8">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tech Stack
              </h3>
              <ul className="mt-4 space-y-2">
                {project.stack.map((tech) => (
                  <li key={tech} className="text-sm text-muted-foreground">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            {project.links?.github && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Links
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-sm underline decoration-primary/60 decoration-2 underline-offset-4 hover:text-primary text-muted-foreground"
                    >
                      GitHub Repository
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}