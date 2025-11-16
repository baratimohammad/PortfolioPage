import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import MePortrait from "@/images/Cover.jpeg";

const timeline = [
  {
    period: "January 2025 - May 2025",
    title: "Data Engineering Internship, Politecnico di Torino - Italy",
    details: [
      "Designed ETL pipelines to analyze and monitor the academic performance of DAUIN department’s PhD students at Politecnico di Torino.",
      "Utilized Python for comprehensive data wrangling and transformation, ensuring high-quality, structured datasets ready for advanced analytics.",
      "Automated the extraction of key employment data by scraping LinkedIn profiles from predefined URLs, leveraging agentic AI tools (Langchain, Ollama and Tavily).",
      "Built interactive dashboards using Grafana to visualize performance metrics.",
      "Containerized the entire data pipeline using Docker, ensuring portability, scalability, and ease of deployment across different environments.",
    ],
  },
  {
    period: "May 2022 - October 2022",
    title: "Quantitative Analyst Internship, MyDigiPay - Iran",
    details: [
      "Conducted SQL queries and performed descriptive and inferential statistics analysis on financial data for credit scoring.",
      "Collaborated with team members to develop machine learning models for classification and regression.",
    ],
  },
] as const;

const principles = [
  {
    title: "Lead with clarity",
    description:
      "Every engagement starts with the outcomes, constraints, and signals that matter most.",
  },
  {
    title: "Ship in loops",
    description:
      "Short delivery cycles keep stakeholders engaged and turn complex programs into momentum.",
  },
  {
    title: "Design for trust",
    description:
      "Reliability, observability, and governance get the same attention as shiny new features.",
  },
  {
    title: "Leave teams stronger",
    description:
      "Documentation, pairing, and internal enablement make success sustainable after handoff.",
  },
] as const;

const clients = [
  { name: "Nimbus Labs" },
  { name: "Northwind Ops" },
  { name: "Volt Mobility" },
  { name: "Harbor Analytics" },
] as const;

export const metadata: Metadata = {
  title: "About",
  description:
    "Get to know Max Barati — a data engineer focused on building analytics platforms, automation, and trusted insight loops.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col gap-20 py-24">
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle backdrop-blur md:grid-cols-[1.15fr,0.85fr] md:p-12">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              About
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              I connect data plumbing to decisions teams trust.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              I&apos;m Max Barati, a data engineer who moves between architecture,
              analytics UX, and enablement to make sure insight flows the moment it is
              needed. I have shipped pipelines, ML-powered workflows, and internal tools
              for growth-stage startups through public companies across SaaS, climate,
              and fintech.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {/*
              <div className="rounded-2xl border border-border/60 p-4">
                <p className="text-sm uppercase tracking-wide text-muted-foreground">
                  Years in the craft
                </p>
                <p className="mt-1 text-3xl font-semibold text-foreground">10+</p>
              </div>
              <div className="rounded-2xl border border-border/60 p-4">
                <p className="text-sm uppercase tracking-wide text-muted-foreground">
                  Pipelines shipped
                </p>
                <p className="mt-1 text-3xl font-semibold text-foreground">60+</p>
              </div>
              */}
            </div>
          </div>
          <div className="relative">
            <div className="flex h-full items-center justify-center rounded-3xl bg-muted/20 p-6">
              <Image
                src={MePortrait}
                alt="Portrait of Max Barati"
                width={MePortrait.width}
                height={MePortrait.height}
                className="rounded-2xl border border-border/60 object-cover"
                sizes="(min-width: 768px) 280px, 60vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr,0.85fr]">
          <div className="rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle">
            <header className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Timeline
              </p>
              <h2 className="text-3xl font-semibold text-foreground">
                Highlights from the last decade.
              </h2>
            </header>
            <ol className="mt-6 space-y-6 border-l border-border/60 pl-6">
              {timeline.map((entry) => (
                <li key={entry.period} className="relative">
                  <span className="absolute -left-[35px] mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-background bg-primary" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                      {entry.period}
                    </p>
                    <h3 className="text-xl font-semibold text-foreground">
                      {entry.title}
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                      {entry.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2">
                          <span
                            aria-hidden="true"
                            className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"
                          />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-10">
            <div className="rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle">
              <header className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Principles
                </p>
                <h2 className="text-3xl font-semibold text-foreground">
                  How I like to work.
                </h2>
              </header>
              <ul className="mt-6 space-y-4">
                {principles.map((principle) => (
                  <li key={principle.title} className="flex gap-3">
                    <span className="mt-1 text-primary">
                      <CheckCircle2 className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-base font-semibold text-foreground">
                        {principle.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {principle.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/*
            <div className="rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle">
              <header className="space-y-1">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  As seen on / clients
                </p>
                <p className="text-base text-muted-foreground">
                  Logos available upon request — here are a few of the teams I&apos;ve
                  supported recently.
                </p>
              </header>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {clients.map((client) => (
                  <div
                    key={client.name}
                    className="flex h-20 items-center justify-center rounded-2xl border border-border/50 bg-muted/20 text-sm font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    {client.name}
                  </div>
                ))}
              </div>
            </div>
            */}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/15 via-background to-emerald-500/10 p-10 shadow-subtle">
          <div className="flex flex-col gap-6 text-center md:text-left md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Let&apos;s build
              </p>
              <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
                Have an initiative that needs momentum?
              </h2>
              <p className="text-base text-muted-foreground">
                I&apos;d love to learn about your roadmap, surface opportunities, and
                co-design a plan that pairs fast delivery with reliable insight.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-subtle transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
            >
              Contact me
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
