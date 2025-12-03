/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // We serve images directly from the public folder via nginx; skip the Next optimizer to avoid proxy quirks.
    unoptimized: true,
    // Allow local SVG assets used throughout the portfolio.
    dangerouslyAllowSVG: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
