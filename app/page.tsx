"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ServicesGrid } from "@/components/sections/services-grid";

/*
const ValuePropsSection = dynamic(
  () =>
    import("@/components/sections/value-props").then(
      (mod) => mod.ValuePropsSection,
    ),
  {
    ssr: false,
    loading: () => (
      <SectionSkeleton label="Capabilities" variant="muted" />
    ),
  },
);

const CaseStudiesSection = dynamic(
  () =>
    import("@/components/sections/case-studies").then(
      (mod) => mod.CaseStudiesSection,
    ),
  {
    ssr: false,
    loading: () => <SectionSkeleton label="Case studies" />,
  },
);
*/

/*
const projects = [
  {
    name: "StreamPulse Insights",
    summary:
      "Real-time analytics platform turning raw streaming telemetry into alerting and reporting pipelines.",
    stack: ["TypeScript", "Kafka", "dbt"],
  },
  {
    name: "Forecast Studio",
    summary:
      "Interactive forecasting toolkit used by product and finance teams to explore scenarios in minutes.",
    stack: ["Next.js", "DuckDB", "PyTorch"],
  },
  {
    name: "Unified Metrics Hub",
    summary:
      "Self-service metrics layer that reduced dashboard delivery time by 60% across the company.",
    stack: ["Snowflake", "Dagster", "React"],
  },
] as const;
*/

/*
const valueProps = [
  {
    icon: BarChart3,
    title: "Operational clarity delivered with real-time analytics and reporting.",
  },
  {
    icon: Layers,
    title: "Composable data stacks that scale with your product teams.",
  },
  {
    icon: ShieldCheck,
    title: "Robust governance baked-in so insights stay trusted and secure.",
  },
] as const;
*/

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const heroInitial = shouldReduceMotion ? undefined : { opacity: 0, y: 18 };
  const heroAnimate = shouldReduceMotion ? undefined : { opacity: 1, y: 0 };
  const heroTransition = shouldReduceMotion
    ? undefined
    : { duration: 0.6 };

  return (
    <main className="flex min-h-screen flex-col gap-20 py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.section
          initial={heroInitial}
          animate={heroAnimate}
          transition={heroTransition}
          className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/70 p-10 shadow-subtle sm:p-16"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.25),_transparent_55%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.2),_transparent_50%)]" />
          <div className="max-w-3xl space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                ETL/ELT Development | Data Warehousing | Data Visualization
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground">
                I design data systems that turn raw inputs into trusted insights—enabling teams to move fast, make confident decisions, and execute without hesitation.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-subtle transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
              >
                View Portfolio
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border/70 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
              >
                Contact
              </Link>
            </div>
          </div>
        </motion.section>
      </div>

      {/* <ValuePropsSection
        valueProps={valueProps}
        reduceMotion={shouldReduceMotion}
      /> */}

      <section className="bg-background" aria-labelledby="home-services-title">
        <div className="mx-auto w-full max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {/* Tailored engagements to move from data to impact */}
            </p>
            <h2
              id="home-services-title"
              className="text-3xl font-semibold text-foreground sm:text-4xl"
            >
              Services
            </h2>
            {/* <p className="text-base text-muted-foreground sm:text-lg">
              From modern ELT foundations to actionable analytics experiences,
              these offerings show how we can collaborate end-to-end.
            </p> */}
          </div>
          <div className="rounded-3xl border border-border/60 bg-background/80 p-8 shadow-subtle backdrop-blur">
            <ServicesGrid />
          </div>
        </div>
      </section>

      {/* <CaseStudiesSection
        projects={projects}
        reduceMotion={shouldReduceMotion}
      /> */}
    </main>
  );
}

/*
type SectionSkeletonProps = {
  label: string;
  variant?: "default" | "muted";
};

function SectionSkeleton({
  label,
  variant = "default",
}: SectionSkeletonProps) {
  const baseClasses =
    "mx-auto w-full max-w-6xl rounded-3xl border border-border/60 p-8 shadow-subtle";
  const styles: Record<
    NonNullable<SectionSkeletonProps["variant"]>,
    string
  > = {
    default: "bg-background/70",
    muted: "bg-muted/40",
  };

  return (
    <section
      className="px-4 py-8 sm:px-6 lg:px-8"
      aria-busy="true"
      aria-live="polite"
    >
      <div className={`${baseClasses} ${styles[variant]}`}>
        <p className="text-sm font-medium text-muted-foreground">
          Loading {label}&hellip;
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[0, 1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-20 rounded-2xl bg-border/40 animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
*/
