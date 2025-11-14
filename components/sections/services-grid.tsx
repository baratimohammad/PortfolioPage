import Link from "next/link";
import {
  BarChart3,
  BrainCircuit,
  Check,
  Cog,
  LayoutDashboard,
} from "lucide-react";

export const services = [
  {
    title: "Data Engineering Foundations",
    icon: Cog,
    description:
      "Designing resilient data architectures that keep analytics flowing and teams aligned.",
    outcomes: [
      "Modern ELT pipelines with automated quality controls",
      "Unified data models for consistent metrics and definitions",
      "Observability and alerting baked into every stage",
    ],
  },
  {
    title: "Machine Learning Acceleration",
    icon: BrainCircuit,
    description:
      "Operationalizing machine learning so models reach production quickly and safely.",
    outcomes: [
      "Feature stores and experiment tracking aligned with governance",
      "Model deployment workflows with rollback and monitoring",
      "Feedback loops to keep predictions accurate and explainable",
    ],
  },
  {
    title: "Dashboards & Analytics Experiences",
    icon: LayoutDashboard,
    description:
      "Building interfaces that help stakeholders act on insight the moment it appears.",
    outcomes: [
      "Human-centered dashboards with drill-down and alerting",
      "Embedded analytics that fit seamlessly into product workflows",
      "Performance tuning to keep reporting fast, even at scale",
    ],
  },
  {
    title: "Data Strategy & Governance",
    icon: BarChart3,
    description:
      "Aligning people, process, and platforms so data programs deliver measurable ROI.",
    outcomes: [
      "Roadmaps prioritised around business outcomes and KPIs",
      "Governance frameworks that balance speed with compliance",
      "Change management plans that bring teams along with clarity",
    ],
  },
] as const;

type ServicesGridProps = {
  showCta?: boolean;
};

export function ServicesGrid({ showCta = true }: ServicesGridProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {services.map(({ title, icon: Icon, description, outcomes }) => (
        <article
          key={title}
          className="group flex h-full flex-col rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle backdrop-blur transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg"
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="h-6 w-6" aria-hidden />
          </span>
          <div className="mt-6 space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            {outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 text-primary" aria-hidden />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
          {showCta && (
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border/70 px-5 py-2.5 text-sm font-semibold text-foreground transition group-hover:border-primary group-hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
              >
                Work with me
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
