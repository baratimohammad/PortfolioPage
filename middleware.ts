import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const host = request.headers.get("host") ?? "";
  const proto = request.headers.get("x-forwarded-proto");
  const isLocal =
    host.startsWith("localhost") ||
    host.startsWith("127.0.0.1") ||
    host.endsWith(".local");

  // Force HTTPS in production environments.
  if (!isLocal && proto && proto !== "https") {
    const httpsUrl = new URL(request.url);
    httpsUrl.protocol = "https:";
    return NextResponse.redirect(httpsUrl, { status: 308 });
  }

  const headers = response.headers;
  headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  );

  return response;
}

export const config = {
  matcher: [
    // Apply to all paths except Next internals and public files.
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
