import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { themeInitScript } from "@/lib/theme";
import type { Metadata } from "next";
import "./globals.css";

// Use env in prod; fallback for local dev
const PROD_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://maxbarati.dev";
const BRAND = "Max Barati";

const defaultTitle = "Max Barati — Data Engineer & Automation Specialist";
const defaultDescription =
  "Data engineering portfolio of Max Barati — building pipelines, analytics platforms, and automation systems that transform raw data into business insights.";

export const metadata: Metadata = {
  metadataBase: new URL(PROD_URL),
  title: {
    default: defaultTitle,
    template: "%s — Max Barati",
  },
  description: defaultDescription,
  keywords: [
    "data engineering",
    "ETL",
    "ELT",
    "analytics",
    "dashboards",
    "automation",
    "Python",
    "PostgreSQL",
    "Next.js",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: PROD_URL,
    title: defaultTitle,
    description: defaultDescription,
    siteName: BRAND,
    locale: "en_US",
    images: [
      {
        url: "/og.jpg", // add this asset
        width: 1200,
        height: 630,
        alt: "Max Barati — Data Engineering Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  themeColor: "#0B0F19",
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-background font-sans text-foreground antialiased"
      >
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
