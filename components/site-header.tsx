"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full border-b transition-all duration-200",
        isScrolled
          ? "border-border/60 bg-background/80 shadow-sm backdrop-blur"
          : "border-transparent bg-background/30 backdrop-blur-0",
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
          aria-label="Max home"
        >
          Max
        </Link>

        <nav
          className="hidden items-center gap-8 text-sm font-medium md:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map(({ label, href }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "relative transition-colors",
                  "hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
                  isActive
                    ? "text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-primary"
                    : "text-foreground/70",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background text-foreground transition hover:border-primary/70 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-haspopup="dialog"
            aria-label="Open primary navigation"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      <div
        className={[
          "fixed inset-0 z-40 bg-background/40 backdrop-blur-sm transition-opacity duration-200 md:hidden",
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={[
            "absolute right-4 top-4 w-72 max-w-[calc(100%-2rem)] rounded-2xl border border-border/70 bg-background/95 p-6 shadow-2xl transition-transform duration-200",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-navigation-title"
          id="mobile-navigation"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <span
              id="mobile-navigation-title"
              className="text-base font-semibold text-foreground"
            >
              Navigation
            </span>
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-foreground/80 transition hover:border-primary/70 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <nav aria-label="Primary mobile">
            <ul className="mt-6 space-y-4">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive =
                  href === "/" ? pathname === "/" : pathname?.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={[
                        "block rounded-lg px-3 py-2 text-base font-medium transition-colors",
                        "hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
                        isActive
                          ? "bg-muted text-primary"
                          : "text-foreground/80",
                      ].join(" ")}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
