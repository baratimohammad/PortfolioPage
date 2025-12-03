import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Activity, BarChart3, Database } from "lucide-react";

import { getProjectBySlug } from "@/lib/projects";

const project = getProjectBySlug("AustinTrips") ?? notFound();

const heroImage = "/AustinTripsETLHighLevelArchitecture.png";
const heroImageWidth = 2366;
const heroImageHeight = 1616;

const sourceDatasets = [
  { title: "Bike Trips Data", description: "Austin MetroBike Trips" },
  { title: "Kiosk Locations", description: "Austin MetroBike Kiosk Locations" },
];

const stakeholderRequirements = [
  "Trips by Start Kiosk: Total trips per kiosk aggregated by day of week, month, and year.",
  "Demand Distribution Over Time: Hourly trips segmented by day of week, month, and year.",
  "Geospatial Analysis of Stations: Identify and visualize top 20 kiosks by number of trips per day of week and month.",
  "Trips by Subscription Type: Total trips made by each membership/pass type.",
  "Trips by Vehicle Type: Total trips by bike type (Classic vs. Electric).",
];

const warehouseDesign = [
  {
    title: "Schematic design",
    body: "Conceptual design covering fact and dimension entities aligned to trip events, kiosks, vehicles, and subscriptions.",
  },
  {
    title: "Logical design",
    body: "Logical schema drawn in DBDiagram to guide implementation and enforce relational integrity.",
  },
];

const pipelinePhases = [
  {
    title: "Raw capture & catalog",
    description:
      "Ingested 12 years of trip logs published by the city, validated schemas, and staged every kiosk export before handing off to Spark.",
    stat: "20+ CSV feeds / day",
    icon: Database,
  },
  {
    title: "Metric generation & enrichment",
    description:
      "Spark jobs deduplicate journeys, derive demand curves, and calculate station-, region-, and commuter-focused KPIs for analytics consumers.",
    stat: "85 derived metrics",
    icon: Activity,
  },
  {
    title: "Visualization & alerting",
    description:
      "Grafana dashboards and pagers surface real-time anomalies alongside historical baselines so operations teams respond with context.",
    stat: "Realtime alerts + dashboards",
    icon: BarChart3,
  },
];

const storyBlocks = [
  { label: "Problem", copy: project.problem },
  { label: "Goal", copy: project.goal },
  { label: "Approach", copy: project.approach },
  { label: "Results", copy: project.results },
];

const dashboards = [
  {
    title: "Station health & subscription mix",
    description:
      "Split demand by kiosk, subscription tier, and bike type to highlight emerging hotspots and maintenance pressure.",
    embedUrl:
      "https://grafana.barati.tech/d/ae1ae6ae-ff58-4be8-96f0-58d253f8c87f/subscription-and-bike-type?orgId=1&from=1764654768235&to=1764676368235&kiosk=288&subscription_type=One%20Day%20Explorer%20Pass&vehicle_type=Electric%20Bike",
    caption: "Weekday snapshots show commuter-heavy stations and fleet distribution risk.",
  },
  {
    title: "Temporal demand lens",
    description:
      "Hourly heatmaps cover every dock to align spare vehicle deployment with peak rides and special events.",
    embedUrl:
      "https://grafana.barati.tech/d/d65f438c-e01d-4869-9f32-5b3dd81b4bfb/timely-dashboard?orgId=1&from=1764654807033&to=1764676407033&kiosk=288",
    caption: "Rollups expose hourly spikes tied to festivals, weather, and university schedules.",
  },
];

const architectureSteps = [
  "Data acquisition: Automated via run_etl.sh; raw datasets land in data/raw.",
  "ETL processing: etl_main.py with Apache Spark performs feature engineering, dimension extraction, and measure computation.",
  "Data storage: Fact and dimension tables are written into PostgreSQL.",
  "Visualization: Grafana dashboards provide interactive filtering and exploration.",
  "Containerization: Docker orchestrates Spark, PostgreSQL, and Grafana services.",
];

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${project.title} — Austin Trips Detailed Story`,
  description: project.summary,
  openGraph: {
    title: `${project.title} — Austin Trips Detailed Story`,
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
    title: `${project.title} — Austin Trips Detailed Story`,
    description: project.summary,
    images: [heroImage],
  },
};

export default function AustinTripsCaseStudyExclusive() {
  return (
    <main className="flex flex-col gap-16 py-24">
      <div className="mx-auto w-full max-w-6xl space-y-12 px-4 sm:px-6 lg:px-8">
        <section className="space-y-6 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle">
          <header className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Project overview
            </p>
            <h2 className="text-3xl font-semibold text-foreground">
              ETL built for Austin MetroBike transparency
            </h2>
          </header>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              This project implements an ETL pipeline to process historical bike sharing data from Austin (2013–present). The goal is to enable stakeholders to make informed decisions on bike usage patterns, station performance, demand distribution, and vehicle/subscription trends.
            </p>
            <p>
              The pipeline extracts raw trip data, transforms it to calculate useful metrics (e.g., trips per kiosk, trips per hour, top stations, subscription and bike type analysis), and loads the results into a format suitable for visualization and analysis.
            </p>
            <p>Source datasets are publicly available:</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {sourceDatasets.map((dataset) => (
                <li
                  key={dataset.title}
                  className="rounded-2xl border border-border/60 bg-muted/30 p-4 text-foreground"
                >
                  <p className="text-sm font-semibold">{dataset.title}</p>
                  <p className="text-sm text-muted-foreground">{dataset.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle">
          <header className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Stakeholder requirements
            </p>
            <h2 className="text-3xl font-semibold text-foreground">What teams asked for</h2>
          </header>
          <ul className="grid gap-3 sm:grid-cols-2">
            {stakeholderRequirements.map((requirement) => (
              <li
                key={requirement}
                className="rounded-2xl border border-border/60 bg-muted/30 p-4 text-sm leading-relaxed text-foreground"
              >
                {requirement}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle">
          <header className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Proposed data warehouse
            </p>
            <h2 className="text-3xl font-semibold text-foreground">Blueprints before build</h2>
          </header>
          <div className="grid gap-4 sm:grid-cols-2">
            {warehouseDesign.map((item) => (
              <article
                key={item.title}
                className="space-y-2 rounded-2xl border border-border/60 bg-muted/30 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  {item.title}
                </p>
                <p className="text-sm leading-relaxed text-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle">
          <header className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Storyboard
            </p>
            <h2 className="text-3xl font-semibold text-foreground">
              From missing signals to trusted operations
            </h2>
          </header>
          <div className="grid gap-6 md:grid-cols-2">
            {storyBlocks.map((block) => (
              <article key={block.label} className="space-y-2 rounded-2xl border border-border/50 bg-muted/30 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                  {block.label}
                </p>
                <p className="text-sm leading-relaxed text-foreground">{block.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <header className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Dashboards
            </p>
            <h2 className="text-3xl font-semibold text-foreground">
              Embedded visibility for on-call teams
            </h2>
          </header>
          <div className="grid gap-6">
            {dashboards.map((dashboard) => (
              <article
                key={dashboard.title}
                className="space-y-4 rounded-3xl border border-border/60 bg-background/70 p-4 shadow-subtle"
              >
                <div className="overflow-hidden rounded-2xl border border-border/50 bg-muted/20">
                  <iframe
                    src={dashboard.embedUrl}
                    title={`${dashboard.title} Grafana embed`}
                    className="w-full"
                    style={{ height: "clamp(500px, 75vh, 1100px)" }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground">{dashboard.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {dashboard.description}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                    {dashboard.caption}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Link
                      href={dashboard.embedUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 rounded-full border border-border/70 px-3 py-1 text-xs font-semibold text-foreground transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
                    >
                      Open in Grafana
                      <ArrowUpRight className="h-3 w-3" aria-hidden />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle">
          <header className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Project architecture
            </p>
            <h2 className="text-3xl font-semibold text-foreground">How the pieces run in production</h2>
          </header>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Below is a high-level architecture of the ETL pipeline. It highlights the operational flow from raw data pull to dashboards teams use every day.
            </p>
              <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted/30 p-2">
              <div className="overflow-hidden rounded-xl border border-border/50 bg-background/60">
                <Image
                  src={heroImage}
                  alt="Austin Trips ETL high-level architecture"
                  width={heroImageWidth}
                  height={heroImageHeight}
                  className="h-auto w-full object-contain"
                  priority
                />
              </div>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {architectureSteps.map((step) => (
                <li
                  key={step}
                  className="rounded-2xl border border-border/60 bg-muted/30 p-4 text-foreground"
                >
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-border/60 bg-background/80 p-10 shadow-subtle">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Ready to explore
              </p>
              <h2 className="text-3xl font-semibold text-foreground">
                Let&apos;s bring the same rigor to your data story.
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Together we can compose pipelines, metrics, and dashboards that make your operations faster, clearer, and more confident.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
