// Minimal RSS / Atom fetcher. No deps — Next.js fetch + tiny regex
// parser. Good enough for harvesting headline + link + description from
// the major reputable feeds. Fails silently per feed so one slow source
// can't break the cron.

export type Feed = {
  url: string;
  publication: string;
  side: "hard" | "hopeful";
};

export type Item = {
  title: string;
  link: string;
  description: string;
  publication: string;
  side: "hard" | "hopeful";
  pubDate: string | null;
};

// Curated feed list. Hard sources are mainstream wire / world desks.
// Hopeful sources are explicit good-news outlets, all human-edited and
// reputable. Keep both lists small to keep the cron under 30 seconds.
export const FEEDS: Feed[] = [
  // hard
  { url: "http://feeds.bbci.co.uk/news/world/rss.xml", publication: "BBC", side: "hard" },
  { url: "https://www.theguardian.com/world/rss", publication: "The Guardian", side: "hard" },
  { url: "https://feeds.npr.org/1004/rss.xml", publication: "NPR", side: "hard" },
  { url: "https://www.aljazeera.com/xml/rss/all.xml", publication: "Al Jazeera", side: "hard" },
  { url: "https://feeds.reuters.com/reuters/worldNews", publication: "Reuters", side: "hard" },
  // hopeful
  { url: "https://www.positive.news/feed/", publication: "Positive News", side: "hopeful" },
  { url: "https://www.goodnewsnetwork.org/feed/", publication: "Good News Network", side: "hopeful" },
  { url: "https://reasonstobecheerful.world/feed/", publication: "Reasons to be Cheerful", side: "hopeful" },
];

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&nbsp;/g, " ")
    .trim();

const pick = (block: string, tag: string): string => {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = block.match(re);
  return m ? decode(m[1]) : "";
};

const pickLink = (block: string): string => {
  // RSS: <link>url</link>. Atom: <link href="url"/>. Try both.
  const inline = block.match(/<link[^>]*href="([^"]+)"/i);
  if (inline) return inline[1];
  return pick(block, "link");
};

function parseFeed(xml: string, feed: Feed): Item[] {
  const items: Item[] = [];
  const entryRe = /<(item|entry)\b[^>]*>([\s\S]*?)<\/(item|entry)>/gi;
  let m: RegExpExecArray | null;
  while ((m = entryRe.exec(xml)) !== null) {
    const block = m[2];
    const title = pick(block, "title");
    const link = pickLink(block);
    const desc = pick(block, "description") || pick(block, "summary") || pick(block, "content");
    const pubDate = pick(block, "pubDate") || pick(block, "published") || pick(block, "updated") || null;
    if (title && link) {
      items.push({
        title,
        link,
        description: desc.slice(0, 800),
        publication: feed.publication,
        side: feed.side,
        pubDate,
      });
    }
    if (items.length >= 12) break; // bound per-feed work
  }
  return items;
}

async function fetchFeed(feed: Feed): Promise<Item[]> {
  try {
    const r = await fetch(feed.url, {
      headers: { "User-Agent": "yinyan.news/auto-pair (+https://yinyan.news)" },
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!r.ok) return [];
    const xml = await r.text();
    return parseFeed(xml, feed);
  } catch {
    return [];
  }
}

export async function fetchAll(): Promise<{ hard: Item[]; hopeful: Item[] }> {
  const results = await Promise.all(FEEDS.map(fetchFeed));
  const hard: Item[] = [];
  const hopeful: Item[] = [];
  results.forEach((items, i) => {
    const side = FEEDS[i].side;
    if (side === "hard") hard.push(...items);
    else hopeful.push(...items);
  });
  return { hard, hopeful };
}

// Recent within the last N hours. RSS pubDate parsing is lax: trust
// the feed; if missing, keep the item anyway.
export function withinHours(items: Item[], hours: number): Item[] {
  const cutoff = Date.now() - hours * 3600 * 1000;
  return items.filter((it) => {
    if (!it.pubDate) return true;
    const t = Date.parse(it.pubDate);
    if (Number.isNaN(t)) return true;
    return t >= cutoff;
  });
}
