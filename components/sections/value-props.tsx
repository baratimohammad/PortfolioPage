"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type ValueProp = {
  icon: LucideIcon;
  title: string;
};

type ValuePropsSectionProps = {
  valueProps: ValueProp[];
  reduceMotion: boolean;
};

export function ValuePropsSection({
  valueProps,
  reduceMotion,
}: ValuePropsSectionProps) {
  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.4 },
        transition: { duration: 0.5 },
      };

  const Wrapper = reduceMotion ? "div" : motion.div;

  return (
    <section className="bg-background" aria-labelledby="home-value-props-title">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Capabilities
          </p>
          <h2
            id="home-value-props-title"
            className="text-3xl font-semibold text-foreground sm:text-4xl"
          >
            Keeping teams confident in the signal.
          </h2>
        </div>
        <Wrapper
          {...motionProps}
          className="grid gap-6 rounded-3xl border border-border/60 bg-background/80 p-8 shadow-subtle backdrop-blur md:grid-cols-3"
        >
          {valueProps.map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="flex flex-col gap-4 rounded-2xl bg-muted/40 p-6"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <p className="text-sm font-medium leading-relaxed text-muted-foreground">
                {title}
              </p>
            </div>
          ))}
        </Wrapper>
      </div>
    </section>
  );
}
