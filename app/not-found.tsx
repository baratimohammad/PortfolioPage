import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        404 — Lost in the data
      </p>
      <h1 className="text-3xl font-semibold sm:text-4xl">
        Sorry, that page doesn&apos;t exist.
      </h1>
      <p className="text-base text-muted-foreground sm:text-lg">
        The page you&apos;re looking for might have been moved, renamed, or is
        temporarily unavailable. Let&apos;s get you back to familiar ground.
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
      >
        Back to the homepage
      </Link>
    </main>
  );
}
