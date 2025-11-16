import Image from "next/image";
import Link from "next/link";
import { Check, Cog } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";

import CloudPlatformsImage from "@/images/services/CloudPlatforms.jpg";
import ConnectedSystemsImage from "@/images/services/ConnectedSystems.jpg";
import DataAnalysisImage from "@/images/services/DataAnalysis.png";
import DataOrchestrationImage from "@/images/services/DataOrchestration2.jpg";
import DatabaseSystemsImage from "@/images/services/DatabaseSystems.jpg";
import GeoSpatialImage from "@/images/services/GeoSpatial.jpg";
import ProgrammingImage from "@/images/services/Programming.jpg";

type Service = {
  title: string;
  icon: LucideIcon;
  keywords: readonly string[];
  image?: StaticImageData;
  outcomes?: readonly string[];
};

export const services: readonly Service[] = [
  {
    title: "Cloud Platforms",
    icon: Cog,
    keywords: [
      "AWS S3",
      "AWS Glue",
      "AWS Redshift",
      "AWS EMR",
      // "Azure Data Factory",
      "Databricks",
    ],
    image: CloudPlatformsImage,
  },
  {
    title: "Big Data & Orchestration",
    icon: Cog,
    keywords: [
      "Apache Spark",
      "Apache Airflow",
    ],
    image: DataOrchestrationImage,
    // outcomes: [
    //   "Modern ELT pipelines with automated quality controls",
    //   "Unified data models for consistent metrics and definitions",
    //   "Observability and alerting baked into every stage",
    // ],
    // ],
  },
  {
    title: "Database Systems",
    icon: Cog,
    keywords: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
    ],
    image: DatabaseSystemsImage,
  },
  {
    title: "Data Visualization",
    icon: Cog,
    keywords: [
      "Grafana",
      "Power BI",
      "Matplotlib",
      "Seaborn",
    ],
    image: DataAnalysisImage,
  },
  {
    title: "Programming & Development",
    icon: Cog,
    keywords: [
      "Python",
      "OOP",
      "Docker",
    ],
    image: ProgrammingImage,
  },
  {
    title: "Connected Systems",
    icon: Cog,
    keywords: [
      "Request/Response",
      "Publish/Subscribe",
    ],
    image: ConnectedSystemsImage,
  },
  {
    title: "Geospatial Analysis",
    icon: Cog,
    keywords: [
      "QGIS",
      "GeoPandas",
    ],
    image: GeoSpatialImage,
  },
  // {
  //   title: "Machine Learning Acceleration",
  //   icon: BrainCircuit,
  //   description:
  //     "Operationalizing machine learning so models reach production quickly and safely.",
  //   outcomes: [
  //     "Feature stores and experiment tracking aligned with governance",
  //     "Model deployment workflows with rollback and monitoring",
  //     "Feedback loops to keep predictions accurate and explainable",
  //   ],
  // },
  // {
  //   title: "Dashboards & Analytics Experiences",
  //   icon: LayoutDashboard,
  //   description:
  //     "Building interfaces that help stakeholders act on insight the moment it appears.",
  //   outcomes: [
  //     "Human-centered dashboards with drill-down and alerting",
  //     "Embedded analytics that fit seamlessly into product workflows",
  //     "Performance tuning to keep reporting fast, even at scale",
  //   ],
  // },
  // {
  //   title: "Data Strategy & Governance",
  //   icon: BarChart3,
  //   description:
  //     "Aligning people, process, and platforms so data programs deliver measurable ROI.",
  //   outcomes: [
  //     "Roadmaps prioritised around business outcomes and KPIs",
  //     "Governance frameworks that balance speed with compliance",
  //     "Change management plans that bring teams along with clarity",
  //   ],
  // },
] as const;

export function ServicesGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
      {services.map(({ title, icon: Icon, keywords, outcomes, image }) => {
        const hasImage = Boolean(image);
        const visualWrapperClasses = hasImage
          ? "block w-full overflow-hidden rounded-2xl aspect-[4/3]"
          : "inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary";
        return (
          <article
            key={title}
            className="group flex h-full flex-col rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle backdrop-blur transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg"
          >
            <span className={visualWrapperClasses}>
              {hasImage && image ? (
                <Image
                  src={image}
                  alt={`${title} visual`}
                  className="h-auto w-full object-cover"
                  sizes="(min-width: 768px) 280px, 90vw"
                />
              ) : (
                <Icon
                  className="h-6 w-6"
                  aria-hidden
                />
              )}
            </span>
            <div className="mt-6 space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                {title}
              </h2>
              <ul className="space-y-2 text-base leading-relaxed text-muted-foreground">
                {keywords.map((keyword) => (
                  <li key={keyword} className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>{keyword}</span>
                  </li>
                ))}
              </ul>
            </div>
            {outcomes && outcomes.length > 0 && (
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                {outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3">
                    <Check
                      className="mt-1 h-4 w-4 text-primary"
                      aria-hidden
                    />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        );
      })}
      <article className="flex h-full flex-col justify-between rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8 shadow-subtle">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Portfolio
          </p>
          <h2 className="text-2xl font-semibold text-foreground">
            Explore My Portfolio
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Explore my portfolio of projects I have been engaged in to see how these services translate into real-world impact.
          </p>
        </div>
        <div className="mt-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-subtle transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
          >
            My Portfolio
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </article>
    </div>
  );
}
