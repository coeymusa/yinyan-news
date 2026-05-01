import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: [
      "https://yinyan.news/sitemap.xml",
      "https://yinyan.news/news-sitemap.xml",
    ],
    host: "https://yinyan.news",
  };
}
