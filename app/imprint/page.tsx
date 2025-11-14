import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imprint",
  description:
    "Legal contact information and business details for Max Barati.",
};

export default function ImprintPage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16 sm:px-6 lg:px-0">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Imprint
        </p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
          Legal Disclosure
        </h1>
      </div>
      <p className="text-muted-foreground">
        This placeholder page is ready for the legal contact information and
        company details required by jurisdictions that mandate an imprint
        (Impressum). Add your official address, preferred contact method,
        registration numbers, and any other disclosures relevant to your region.
      </p>
      <p className="text-muted-foreground">
        Until the final text is available, this page signals that you are
        committed to providing transparent ownership information for this site.
      </p>
    </section>
  );
}
