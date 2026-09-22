import type { MetadataRoute } from "next";

import { JOURNAL_ARTICLES } from "@/data/journal";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const PAGES = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/scooties", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/explore", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/routes", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/how-it-works", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/rental-guide", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/book", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/journal", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/refund-policy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...PAGES.map((p) => ({
      url: `${siteUrl}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...JOURNAL_ARTICLES.map((a) => ({
      url: `${siteUrl}/journal/${a.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
