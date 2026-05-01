import { PAIRINGS } from "../lib/pairings";

const SITE = "https://yinyan.news";
const TWO_DAYS_MS = 48 * 60 * 60 * 1000;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Google News sitemap — only items published in the last 48h, per spec.
// https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap
export async function GET() {
  const cutoff = Date.now() - TWO_DAYS_MS;
  const recent = PAIRINGS.filter((p) => {
    const t = new Date(p.date + "T12:00:00Z").getTime();
    return Number.isFinite(t) && t >= cutoff;
  });

  const items = recent
    .map((p) => {
      const title = `${p.hard.headline} / ${p.hopeful.headline}`;
      return `
    <url>
      <loc>${SITE}/${p.slug}</loc>
      <news:news>
        <news:publication>
          <news:name>yinyan.news</news:name>
          <news:language>en</news:language>
        </news:publication>
        <news:publication_date>${new Date(p.date + "T12:00:00Z").toISOString()}</news:publication_date>
        <news:title>${escapeXml(title)}</news:title>
      </news:news>
    </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${items}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
