/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://max-portfolio.com";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 7000,
  outDir: "./public",
  exclude: ["/api/*"],
  transform: async (config, path) => {
    const priority = path === "/" ? 1 : 0.7;

    return {
      loc: `${siteUrl}${path}`,
      changefreq: "weekly",
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
