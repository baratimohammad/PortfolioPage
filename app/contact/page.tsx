import type { Metadata } from "next";
import { ContactForm } from "./contact-form";
import { Github, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Highlight = {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
};

const highlights: Highlight[] = [
  {
    icon: Mail,
    title: "Email",
    description: "maximobarati@gmail.com",
    href: "mailto:maximobarati@gmail.com",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    description: "linkedin.com/in/mhmdbarati",
    href: "https://www.linkedin.com/in/mhmdbarati",
  },
  {
    icon: Github,
    title: "GitHub",
    description: "github.com/baratimohammad",
    href: "https://github.com/baratimohammad",
  },
];

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out to Me...",
};

export default function ContactPage() {
  return (
    <main className="flex flex-col gap-16 py-24">
      <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            {/* Contact */}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Reach out to me...
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {/* Send a few lines about the problem, stakeholders, and timelines. I reply to
            every serious inquiry with a short plan and next steps. */}
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {highlights.map(({ icon: Icon, title, description, href }) => {
            const isExternal = href?.startsWith("http");
            return (
              <div
                key={title}
                className="rounded-3xl border border-border/60 bg-background/70 p-5 shadow-subtle"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    {title}
                  </p>
                </div>
                {href ? (
                  <a
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className="mt-4 inline-flex items-center text-base font-medium text-primary transition hover:underline"
                  >
                    {description}
                  </a>
                ) : (
                  <p className="mt-4 text-base text-foreground">{description}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border/60 bg-background/70 p-8 shadow-subtle backdrop-blur sm:p-10">
          <header className="space-y-2">
            <h2 className="text-3xl font-semibold text-foreground">Or, write to me here...</h2>
            <p className="text-base text-muted-foreground">
              {/* Drop enough detail so I can respond with a relevant point of view and
              timeline. */}
            </p>
          </header>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
