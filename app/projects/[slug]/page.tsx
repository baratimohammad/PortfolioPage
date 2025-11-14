import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projectSlugs } from "@/lib/projects";

export const revalidate = 3600;

type ProjectPageParams = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ProjectPageParams): Metadata {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project not found",
      description: "The project you are looking for does not exist.",
    };
  }

  const title = `${project.title} — Case Study`;

  return {
    title,
    description: project.summary,
    openGraph: {
      title,
      description: project.summary,
      type: "article",
      url: `/projects/${project.slug}`,
      images: [
        {
          url: project.heroImage,
          width: 1200,
          height: 720,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      images: [project.heroImage],
    },
  };
}

export default function ProjectCaseStudy({ params }: ProjectPageParams) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

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
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 1200px, 100vw"
                  priority
                />
              </div>
            </header>

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
              <p className="text-base leading-relaxed text-foreground">{project.approach}</p>
            </section>

            <section
              aria-labelledby="project-results"
              className="space-y-8 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle"
            >
              <div className="space-y-3">
                <h2 id="project-results" className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Results &amp; Impact
                </h2>
                <p className="text-base leading-relaxed text-foreground">{project.results}</p>
              </div>
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
            </section>

            <section
              aria-labelledby="project-gallery"
              className="space-y-4 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle"
            >
              <div className="space-y-3">
                <h2 id="project-gallery" className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Gallery
                </h2>
                <p className="text-sm text-muted-foreground">
                  Responsive snapshots highlighting key workflows and insight moments.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {project.gallery.map((image) => (
                  <figure
                    key={image.src}
                    className="overflow-hidden rounded-2xl border border-border/50 bg-muted/30"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className="h-full w-full object-cover"
                      sizes="(min-width: 1024px) 500px, (min-width: 768px) 50vw, 100vw"
                    />
                  </figure>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="project-stack"
              className="space-y-4 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle"
            >
              <h2 id="project-stack" className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Tech Stack
              </h2>
              <ul className="flex flex-wrap gap-3">
                {project.stack.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-full border border-border/70 px-4 py-2 text-sm font-semibold text-foreground"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </section>
          </article>

          <aside className="space-y-6 self-start rounded-3xl border border-border/60 bg-background/80 p-6 shadow-subtle backdrop-blur lg:sticky lg:top-24">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Partner with Max
              </p>
              <h2 className="text-2xl font-semibold text-foreground">
                Ready to build your next data product?
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Let&apos;s align on the outcomes you need and craft a delivery plan tailored to your team.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
            >
              Start a project
            </Link>
            <div className="space-y-3 rounded-2xl border border-border/50 bg-muted/30 p-4 text-sm text-muted-foreground">
              <div>
                <span className="font-semibold text-foreground">Role</span>
                <p>{project.role}</p>
              </div>
              <div>
                <span className="font-semibold text-foreground">Focus</span>
                <p>{project.tags.join(" • ")}</p>
              </div>
              <div>
                <span className="font-semibold text-foreground">Year Launched</span>
                <p>{project.year}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
