import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProjectBySlug } from "@/lib/projects";

const project = getProjectBySlug("NYCParkingViolations") ?? notFound();

const heroImage = "/NYCMedallionArchitecture.jpg";
const heroImageWidth = 1600;
const heroImageHeight = 900;

const highlights = [
  "End-to-end ELT pipeline in dbt with DuckDB.",
  "Layered modeling with clear lineage from raw to curated outputs.",
  "Data quality tests and documentation generation.",
];

const architecture = [
  "Bronze models stage raw tables without transformation.",
  "Silver models standardize columns, add flags, and join fee logic.",
  "Gold models deliver aggregated business metrics.",
];

const dataDetails = [
  {
    id: "database",
    content: (
      <>
        DuckDB database: <code>data/nyc_parking_violations.db</code>
      </>
    ),
  },
  {
    id: "raw-tables",
    content: (
      <>
        Raw tables: <code>parking_violations_2023</code>,{" "}
        <code>parking_violation_codes</code>
      </>
    ),
  },
  {
    id: "reference-csvs",
    content: (
      <>
        Reference CSVs: files in <code>data/</code>
      </>
    ),
  },
];

const modelSummary = [
  {
    id: "bronze",
    content: (
      <>
        Bronze: <code>bronze_parking_violations</code>,{" "}
        <code>bronze_parking_violation_codes</code>
      </>
    ),
  },
  {
    id: "silver",
    content: (
      <>
        Silver: <code>silver_parking_violations</code>,{" "}
        <code>silver_parking_violation_codes</code>,{" "}
        <code>silver_violation_tickets</code>,{" "}
        <code>silver_violation_vehicles</code>
      </>
    ),
  },
  {
    id: "gold",
    content: (
      <>
        Gold: <code>gold_ticket_metrics</code>, <code>gold_vehicle_metrics</code>
      </>
    ),
  },
];

const tests = [
  {
    id: "builtin",
    content: (
      <>
        Built-in tests on key fields (<code>unique</code>, <code>not_null</code>).
      </>
    ),
  },
  {
    id: "generic",
    content: (
      <>
        Custom generic test <code>generic_not_null</code> for column null checks.
      </>
    ),
  },
  {
    id: "singular",
    content: (
      <>
        Singular test <code>violation_codes_revenue</code> (warning severity).
      </>
    ),
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
        alt: "Medallion architecture for NYC parking violations",
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

export default function NYCParkingViolationsCaseStudy() {
  return (
    <main className="flex flex-col gap-16 py-24">
      <div className="mx-auto w-full max-w-6xl space-y-12 px-4 sm:px-6 lg:px-8">
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <span className="rounded-full bg-muted px-3 py-1 text-foreground">{project.year}</span>
            <span>{project.role}</span>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              NYC Parking Violations Analytics (dbt + DuckDB)
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
              src={heroImage}
              alt="Medallion architecture for NYC parking violations"
              width={heroImageWidth}
              height={heroImageHeight}
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 1200px, 100vw"
              priority
            />
          </div>
        </header>

        <section className="grid gap-8 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle md:grid-cols-2">
          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Portfolio highlights
            </h2>
            <ul className="space-y-2 text-sm text-foreground">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Architecture
            </h2>
            <ul className="space-y-2 text-sm text-foreground">
              {architecture.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Data
            </h2>
            <p className="text-sm text-muted-foreground">
              Core datasets and storage locations used by the pipeline.
            </p>
          </div>
          <ul className="grid gap-3 text-sm text-foreground sm:grid-cols-2">
            {dataDetails.map((item) => (
              <li key={item.id} className="rounded-2xl border border-border/60 bg-muted/30 p-4">
                {item.content}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Model summary
            </h2>
            <p className="text-sm text-muted-foreground">
              The layered dbt models that power the medallion architecture.
            </p>
          </div>
          <ul className="space-y-3 text-sm text-foreground">
            {modelSummary.map((item) => (
              <li key={item.id} className="rounded-2xl border border-border/60 bg-muted/30 p-4">
                {item.content}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Tests
            </h2>
            <p className="text-sm text-muted-foreground">
              Data quality coverage baked into the project.
            </p>
          </div>
          <ul className="space-y-2 text-sm text-foreground">
            {tests.map((item) => (
              <li key={item.id} className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>{item.content}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Explore &amp; Repo
            </h2>
            <p className="text-sm text-muted-foreground">
              Source code and documentation for the full dbt project.
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
