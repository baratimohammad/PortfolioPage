import Link from "next/link";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/maxbarati",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/maxbarati",
  },
  {
    label: "Email",
    href: "mailto:hello@maxbarati.dev",
  },
];

const LEGAL_LINKS = [
  {
    label: "Privacy",
    href: "/privacy",
  },
  {
    label: "Imprint",
    href: "/imprint",
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-foreground/70 sm:flex-row sm:px-6 lg:px-8">
        <span className="text-center sm:text-left">
          © {year} Max. All rights reserved.
        </span>
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:gap-4">
          <nav className="flex flex-wrap items-center justify-center gap-4">
            {SOCIAL_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
              >
                {label}
              </Link>
            ))}
          </nav>
          <nav className="flex flex-wrap items-center justify-center gap-4">
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
