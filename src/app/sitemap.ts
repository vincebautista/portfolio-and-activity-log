import type { MetadataRoute } from "next";
import { getAllLogs } from "@/lib/logs";

/**
 * Dynamic sitemap generation.
 *
 * Includes static routes (/, /work, /logs) and all dynamic log slugs.
 * This helps search engines discover and index all pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL ?? "https://vincebautista.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/logs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const logs = getAllLogs();
  const logRoutes: MetadataRoute.Sitemap = logs.map((log) => ({
    url: `${baseUrl}/logs/${log.slug}`,
    lastModified: new Date(log.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...logRoutes];
}