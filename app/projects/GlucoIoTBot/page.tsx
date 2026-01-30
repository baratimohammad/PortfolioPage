import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cpu, Network, Radio, Server, Activity } from "lucide-react";

import { getProjectBySlug } from "@/lib/projects";

const project = getProjectBySlug("GlucoIoTBot") ?? notFound();

const heroImage = project.heroImage;

const systemFeatures = [
  "Sensor service publishes near-real-time glucose readings to MQTT",
  "Subscriber service persists telemetry to InfluxDB for analysis",
  "Telegram bot surfaces history and commands for insulin actions",
  "Catalogue service registers clients/services to keep topology discoverable",
  "Actuator service handles authenticated POST requests to trigger insulin events",
];
const courseHighlights = [
  "Object-Oriented Programming with Python for IoT services",
  "Request–response APIs using CherryPy",
  "Publish–subscribe telemetry with paho-mqtt",
  "Hands-on labs reinforcing M2M patterns",
];


const responsibilities = [
  "Led the team and owned sensor + actuator module development",
  "Implemented measurement publishing and remote actuation endpoints",
  "Supported subscriber service, InfluxDB integration, and catalogue registry",
  "Applied microservice architecture to keep components loosely coupled and scalable",
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
        width: 1200,
        height: 720,
        alt: project.title,
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

export default function GlucoIoTBotCaseStudy() {
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
              {project.title}
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              As part of the IoT and Cloud for Sustainable Communities course, I deepened expertise in
              OOP with Python and core machine-to-machine patterns—request–response via CherryPy and
              publish–subscribe with paho-mqtt—through labs and applied exercises.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              For the final project we built an Insulin Monitoring and Actuation System: glucose
              readings stream to InfluxDB over MQTT, and users retrieve trends or trigger insulin actions
              through a Telegram bot for remote monitoring and control.
            </p>
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
              alt={`${project.title} hero`}
              width={1200}
              height={720}
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 1200px, 100vw"
            />
          </div>
        </header>

        <section className="grid gap-8 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              System Overview
            </h3>
            <ul className="space-y-2 text-sm text-foreground">
              {systemFeatures.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/70">
            <Image
              src="/GlucoTelegramScreen.png"
              alt="Telegram interface showing glucose stats and commands"
              width={1600}
              height={900}
              className="h-full w-full object-contain"
              sizes="(min-width: 1024px) 700px, 100vw"
            />
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted/60 text-primary">
              <Server className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="text-base font-bold text-foreground">System Architecture & Ownership</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="space-y-2 rounded-2xl border border-border/60 bg-background/60 p-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Radio className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="text-sm font-semibold text-foreground">Telemetry & Persistence</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                MQTT publishers stream glucose readings; subscriber writes to InfluxDB for near-real-time analytics.
              </p>
            </article>
            <article className="space-y-2 rounded-2xl border border-border/60 bg-background/60 p-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Network className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="text-sm font-semibold text-foreground">Actuation & Control</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Actuator service exposes POST endpoints to trigger insulin actions, secured and orchestrated via the catalogue.
              </p>
            </article>
            <article className="space-y-2 rounded-2xl border border-border/60 bg-background/60 p-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Cpu className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="text-sm font-semibold text-foreground">Chat Interface</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Telegram bot retrieves historical stats and issues commands, giving caregivers remote visibility and control.
              </p>
            </article>
          </div>
        </section>

        <section className="space-y-4 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Explore &amp; Repo
            </h2>
            <p className="text-sm text-muted-foreground">
              Source code and links for deeper exploration.
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
