import { PAIRINGS } from "../lib/pairings";

const SITE = "https://yinyan.news";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = PAIRINGS.map((p) => {
    const title = `${p.hard.headline} / ${p.hopeful.headline}`;
    const desc =
      `<![CDATA[<p><strong>hard:</strong> ${p.hard.body}</p>` +
      `<p><strong>hopeful:</strong> ${p.hopeful.body}</p>${
        p.editor_note ? `<p><em>ed. ${p.editor_note}</em></p>` : ""
      }]]>`;
    return `
    <item>
      <title>${escapeXml(title)}</title>
      <link>${SITE}/${p.slug}</link>
      <guid isPermaLink="true">${SITE}/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${desc}</description>
      <category>${escapeXml(p.topic)}</category>
    </item>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>yinyan.news</title>
    <link>${SITE}</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>for every hard headline, an equal-weight one that's hopeful.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
