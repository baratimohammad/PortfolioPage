import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Activity, BarChart3, Database, FileText, Layers, Wand2 } from "lucide-react";

import { getProjectBySlug } from "@/lib/projects";

const project = getProjectBySlug("PhDStudenti") ?? notFound();

const heroImage = "/PhDStudentiOverallArchitecture.jpg";
const heroImageWidth = 2323;
const heroImageHeight = 1721;

const thesisDetails = {
  program:
    "Master’s Degree in Digital Skills for Sustainable Societal Transitions — Politecnico di Torino (DAUIN Department)",
  title:
    "Design of a Containerized Dashboard Platform and AI-Assisted Data Enrichment for Student Career Monitoring",
  description:
    "A fully containerized stack that ingests, transforms, enriches, and visualizes academic data to support data-driven monitoring of PhD student careers.",
};

const objectiveBullets = [
  "Academic and professional activities over time",
  "Research output and publication trends per PhD cycle",
  "Participation in international mobility programs and their durations",
  "Collaboration patterns across activities and academic years",
  "Supervisors’ publication activity",
  "Core information about departmental courses",
];

const dataSources = [
  {
    title: "CSV files",
    description: "Structured academic datasets (activities, courses, mobility).",
    icon: FileText,
  },
  {
    title: "PDF files",
    description:
      "Unstructured sources enriched via AI-assisted extraction to normalize key fields.",
    icon: Wand2,
  },
];

const architectureLayers = [
  {
    name: "Extraction Layer",
    points: [
      "Python ingestion of CSV and PDF sources",
      "Early parsing and schema validation",
    ],
    icon: FileText,
  },
  {
    name: "Staging Layer",
    points: [
      "Python services populate staging schema",
      "Ollama enriches unstructured data (AI-assisted extraction)",
      "Cleaning, normalization, and schema alignment",
    ],
    icon: Wand2,
  },
  {
    name: "Data Warehouse Layer",
    points: ["dbt builds the core schema", "Business logic produces analytics-ready tables"],
    icon: Database,
  },
  {
    name: "Data Mart Layer",
    points: ["dbt publishes marts optimized for dashboards", "Organized by analytical domain"],
    icon: Layers,
  },
  {
    name: "Data Serving Layer",
    points: [
      "Grafana dashboards with filters for cycle, year, course, and mobility duration",
    ],
    icon: BarChart3,
  },
  {
    name: "Storage Layer",
    points: ["PostgreSQL underpins staging, warehouse, and mart schemas"],
    icon: Database,
  },
];

const containerization = [
  "All services run in Docker (Ubuntu-based images)",
  "Version-controlled for reproducible builds",
  "Designed for annual runs with curated source files following the documented formats",
];

const dashboards = [
  {
    title: "Academic & Training Hours",
    description:
      "Formation hours across PhD cycles and years with filters for cohort and course groupings.",
    image: {
      src: "/sample_ore_formazione.png",
      width: 2866,
      height: 1520,
      alt: "Dashboard showing formation hours across PhD cycles and academic years.",
    },
  },
  {
    title: "International Mobility",
    description:
      "Participation and duration of international mobility programs segmented by cycle and year.",
    image: {
      src: "/sample_mobilita_internazionale.png",
      width: 2866,
      height: 1498,
      alt: "Dashboard summarizing international mobility participation and duration.",
    },
  },
];

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${project.title} — Case Study`,
  description: project.summary,
  openGraph: {
    title: `${project.title} — Case Study`,
    description: project.summary,
    type: "article",
    images: [
      {
        url: heroImage,
        alt: `${project.title} architecture`,
        width: heroImageWidth,
        height: heroImageHeight,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${project.title} — Case Study`,
    description: project.summary,
    images: [heroImage],
  },
};

export default function PhDStudentiCaseStudy() {
  return (
    <main className="flex flex-col gap-16 py-24">
      <div className="mx-auto w-full max-w-6xl space-y-14 px-4 sm:px-6 lg:px-8">
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <span className="rounded-full bg-muted px-3 py-1 text-foreground">{project.year}</span>
            <span>{project.role}</span>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {thesisDetails.title}
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">{thesisDetails.program}</p>
            <p className="text-base leading-relaxed text-muted-foreground">{thesisDetails.description}</p>
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
        </header>

        <section
          aria-labelledby="phd-objective"
          className="grid gap-8 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle md:grid-cols-[1.1fr,0.9fr]"
        >
          <div className="space-y-3">
            <h2 id="phd-objective" className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Objective
            </h2>
            <p className="text-base leading-relaxed text-foreground">
              Enable structured, repeatable, and transparent analysis of PhD students’ academic careers to support departmental decision-making.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Key Questions Answered</h3>
            <ul className="grid gap-2 text-sm text-foreground">
              {objectiveBullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="phd-data-sources"
          className="space-y-6 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle"
        >
          <header className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Data Sources</p>
            <p className="text-base text-muted-foreground">
              Structured CSVs and unstructured PDFs are curated, validated, and enriched before entering the warehouse.
            </p>
          </header>
          <div className="grid gap-4 sm:grid-cols-2">
            {dataSources.map((source) => {
              const Icon = source.icon;
              return (
                <article
                  key={source.title}
                  className="space-y-2 rounded-2xl border border-border/60 bg-muted/30 p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="text-sm font-semibold text-foreground">{source.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{source.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section
          aria-labelledby="phd-architecture"
          className="space-y-8 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle"
        >
          <header className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Architecture
            </p>
          </header>
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-background/70 shadow-subtle">
            <Image
              src={heroImage}
              alt={`${project.title} architecture overview`}
              width={heroImageWidth}
              height={heroImageHeight}
              className="h-auto w-full object-contain"
              sizes="100vw"
              priority
            />
          </div>
          <div className="space-y-3">
            {architectureLayers.map((layer) => {
              const Icon = layer.icon;
              return (
                <article
                  key={layer.name}
                  className="space-y-3 rounded-2xl border border-border/60 bg-background/60 p-5 shadow-subtle"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted/60 text-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="text-base font-bold text-foreground">{layer.name}</h3>
                  </div>
                  <ul className="space-y-1 pl-12 text-sm text-muted-foreground">
                    {layer.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
          <article className="space-y-3 rounded-2xl border border-border/60 bg-background/60 p-5 shadow-subtle">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted/60 text-primary">
                <Layers className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="text-base font-bold text-foreground">
                Containerization &amp; Execution Model
              </h3>
            </div>
            <ul className="space-y-1 pl-12 text-sm text-muted-foreground">
              {containerization.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section
          aria-labelledby="phd-dashboards"
          className="space-y-6 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle"
        >
          <header className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Dashboards
            </p>
            <p className="text-base text-muted-foreground">
              Example Grafana dashboards produced by the platform with filters for cycles, years, courses, and mobility durations.
            </p>
          </header>
          <div className="space-y-6">
            {dashboards.map((dashboard) => (
              <article
                key={dashboard.title}
                className="space-y-3 rounded-2xl border border-border/60 bg-muted/30 p-3"
              >
                <Image
                  src={dashboard.image.src}
                  alt={dashboard.image.alt}
                  width={dashboard.image.width}
                  height={dashboard.image.height}
                  className="w-full h-auto rounded-xl object-contain bg-background"
                  sizes="100vw"
                />
                <div className="space-y-1 px-1 pb-2">
                  <h3 className="text-base font-semibold text-foreground">{dashboard.title}</h3>
                  <p className="text-sm text-muted-foreground">{dashboard.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="phd-links"
          className="space-y-4 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle"
        >
          <div className="space-y-2">
            <h2
              id="phd-links"
              className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            >
              Explore &amp; Repo
            </h2>
            <p className="text-sm text-muted-foreground">
              Source code and case study links for deeper exploration.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.links.github && (
              <Link
                href={project.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
              >
                View on GitHub
              </Link>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
