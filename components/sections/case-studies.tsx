"use client";

import { motion } from "framer-motion";

type HomeProject = {
  name: string;
  summary: string;
  stack: readonly string[];
};

type CaseStudiesSectionProps = {
  projects: HomeProject[];
  reduceMotion: boolean;
};

export function CaseStudiesSection({
  projects,
  reduceMotion,
}: CaseStudiesSectionProps) {
  return (
    <section
      className="px-4 sm:px-6 lg:px-8"
      aria-labelledby="home-case-studies-title"
    >
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className="space-y-2">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Case Studies
          </span>
          <h2
            id="home-case-studies-title"
            className="text-3xl font-semibold text-foreground sm:text-4xl"
          >
            Delivering measurable impact with data products.
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground">
            A sample of recent work blending analytics engineering, ML, and user
            experience to drive business outcomes.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => {
            const motionProps = reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 24 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.5 },
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1,
                  },
                };
            const Card = reduceMotion ? "article" : motion.article;
            return (
              <Card
                key={project.name}
                {...motionProps}
                className="flex h-full flex-col justify-between rounded-3xl border border-border bg-background/80 p-6 shadow-subtle backdrop-blur"
              >
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    {project.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {project.stack.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full bg-muted px-3 py-1"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
