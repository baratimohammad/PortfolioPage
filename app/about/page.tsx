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
      "Utilized Python for comprehensive data wrangling and transformation, ensuring high-quality, structured datasets ready for downstream analytics.",
      "Automated the extraction of key employment data by scraping LinkedIn profiles from predefined URLs, leveraging agentic AI tools (Langchain, Ollama and Tavily).",
      "Built interactive dashboards using Grafana to visualize performance metrics.",
      "Containerized the entire data pipeline using Docker, ensuring portability, scalability, and ease of deployment across different environments.",
    ],
  },
  {
    period: "July 2022 - September 2022",
    title: "Quantitative Analyst Internship, MyDigiPay - Iran",
    details: [
      "Conducted SQL queries and performed descriptive and inferential statistics analysis on financial data for credit scoring.",
      "Collaborated with team members to develop machine learning models for classification and regression.",
    ],
  },
] as const;

const certificates = [
  {
    title: "Apache Spark Essential Training: Big Data Engineering",
    issuer: "LinkedIn Learning",
    link: "https://www.linkedin.com/learning/certificates/ff9c95088392c1ae02680dac0584dabd95dc30a4f74b6319c04e4b044b268709",
  },
  {
    title: "Introduction to LangGraph",
    issuer: "LangChain Academy",
    link: "https://academy.langchain.com/certificates/xlexe6td6s",
  },
  {
    title: "Introduction to Spark SQL and DataFrames",
    issuer: "LinkedIn Learning",
    link: "https://www.linkedin.com/learning/certificates/12b796c182cdbe9dd82ba017176742fe6321ff56f7e36cfdf2219a2571992c2a",
  },
  {
    title: "Data Engineering with dbt",
    issuer: "LinkedIn Learning",
    link: "https://www.linkedin.com/learning/certificates/5f44b08796ac9ac7538cd25fd54656676eb06a40abf3ee037616765f571d533e",
  },
  {
    title: "Mathematics for Machine Learning: Multivariate Calculus",
    issuer: "Imperial College London, Coursera",
    link: "https://www.coursera.org/account/accomplishments/verify/URAUC98HSRPM",
  },
  {
    title: "Mathematics for Machine Learning: Linear Algebra",
    issuer: "Imperial College London, Coursera",
    link: "https://www.coursera.org/account/accomplishments/verify/M3GGNGFS8PT4",
  },
  {
    title: "Unsupervised Learning, Recommenders, Reinforcement Learning",
    issuer: "DeepLearning.AI, Coursera",
    link: "https://www.coursera.org/account/accomplishments/verify/APN7NZL7F2WM",
  },
  {
    title: "Advanced Learning Algorithms",
    issuer: "DeepLearning.AI, Coursera",
    link: "https://www.coursera.org/account/accomplishments/verify/HLVAL8RCQCLG",
  },
  {
    title: "Neural Networks and Deep Learning",
    issuer: "DeepLearning.AI, Coursera",
    link: "https://www.coursera.org/account/accomplishments/verify/FLHVBDEYRL75",
  },
  {
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI, Coursera",
    link: "https://www.coursera.org/account/accomplishments/verify/ZZBGEFGC99KP",
  },
  {
    title: "Data Science Professional Certificate",
    issuer: "IBM, Coursera",
    link: "https://www.credly.com/badges/57cbc357-b944-4a18-b059-5a8bdbe0930b?source=linked_in_profile",
  },
  {
    title: "Data Collection and Processing with Python",
    issuer: "University of Michigan, Coursera",
    link: "https://coursera.org/share/154223ea3dc8ae7f16ef23b760732fb3",
  },
  {
    title: "Python Functions, Files, and Dictionaries",
    issuer: "University of Michigan, Coursera",
    link: "https://coursera.org/verify/2HQ8TCAZBGPH",
  },
  {
    title: "Python Classes and Inheritance",
    issuer: "University of Michigan, Coursera",
    link: "https://coursera.org/verify/VCTUHRQYAPT3",
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
              I Engineer the Backbone of Data-Driven Decisions.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              I’m a junior data engineer with a Master’s degree in{" "}
              <Link
                href="https://www.polito.it/en/education/master-s-degree-programmes/digital-skills-for-sustainable-societal-transitions"
                className="text-primary underline"
              >
                Digital Skills for Sustainable Societal Transitions
              </Link>
              , from Politecnico di Torino, Italy. I enjoy turning messy data into clean,
              usable structures and building pipelines that make information actually
              reachable. During my Master’s, I worked on projects that forced me to think
              critically, take ownership, and deliver solutions under real constraints —
              not just on paper.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              I’m comfortable diving into problems, breaking them down, and figuring out how
              to move from idea to working implementation. I adapt quickly, work well in fast-moving
              environments, and collaborate tightly with teams to keep projects on track. My goal is
              simple: grow into a reliable engineer who builds data tools and workflows that have
              real impact.
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
                  Certificates
                </p>
                <h2 className="text-3xl font-semibold text-foreground">
                  Continued learning.
                </h2>
              </header>
              <ul className="mt-6 space-y-4 text-sm font-medium text-muted-foreground">
                {certificates.map((certificate) => (
                  <li key={certificate.title} className="flex items-center gap-3">
                    <span className="mt-1 text-primary">
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                    <div className="flex-1 min-w-[220px]">
                      <span className="text-base font-semibold text-foreground">
                        {certificate.title}
                      </span>
                    </div>
                    <Link
                      href={certificate.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline text-right"
                    >
                      {certificate.issuer}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

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
    </main >
  );
}
