import type { MetadataRoute } from "next";
import { PAIRINGS } from "./lib/pairings";

const SITE = "https://yinyan.news";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticUrls: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE}/manifesto`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE}/editor`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE}/archive`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE}/stats`, lastModified: now, changeFrequency: "daily", priority: 0.6 },
  ];
  const topics: MetadataRoute.Sitemap = [
    "climate","war","democracy","economy","ai","health",
    "science","culture","rights","other",
  ].map((t) => ({
    url: `${SITE}/topic/${t}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));
  const pairingUrls: MetadataRoute.Sitemap = PAIRINGS.map((p) => ({
    url: `${SITE}/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...staticUrls, ...topics, ...pairingUrls];
}
