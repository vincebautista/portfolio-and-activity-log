import type { MetadataRoute } from "next";

/**
 * Robots.txt generation.
 *
 * Allows all crawlers to index the entire site and points them to the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.SITE_URL ?? "https://vincebautista.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}