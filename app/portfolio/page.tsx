import { PortfolioGrid } from "@/components/portfolio-grid";
import { projects } from "@/lib/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected data platforms, analytics products, and machine learning engagements delivering measurable business value.",
};

export default function PortfolioPage() {
  return (
    <main className="flex flex-col gap-16 py-24">
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl space-y-4">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Selected Work
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Platforms and experiences that move data to insight.
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Explore projects across data visualization, applied machine learning, and
            the web experiences that bring them to life. Filter to focus on the work
            that aligns with your goals.
          </p>
        </header>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <PortfolioGrid projects={projects} />
      </section>
    </main>
  );
}
