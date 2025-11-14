import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Max Barati collects, uses, and protects data across this portfolio site.",
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16 sm:px-6 lg:px-0">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Privacy Policy
        </p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Overview</h1>
      </div>
      <p className="text-muted-foreground">
        This placeholder page represents where the full privacy policy will
        live. Use it to outline what data you collect, why it is collected, and
        how visitors can request updates or deletions. Until the final copy is
        ready, this page makes it clear that transparency around data handling
        matters.
      </p>
      <p className="text-muted-foreground">
        When you are ready, replace this content with the actual policy details
        that cover analytics tools, contact form handling, and any other systems
        that process user information on maxbarati.dev.
      </p>
    </section>
  );
}
