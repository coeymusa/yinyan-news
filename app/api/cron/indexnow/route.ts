import { NextResponse } from "next/server";
import { PAIRINGS } from "../../../lib/pairings";

// IndexNow lets Bing, Yandex, DuckDuckGo, Naver, Seznam pick up new
// content within minutes instead of waiting for them to crawl on
// their own cadence. This route fires from a Vercel cron and pushes
// every published URL into the protocol's queue.
//
// Setup: the key file lives at /public/<KEY>.txt — Bing reads it to
// verify ownership of the domain.

const KEY = "22d4c010d0514e99840da48c083e4bb9";
const SITE = "https://yinyan.news";

export async function GET(req: Request) {
  // Vercel cron requests carry a CRON_SECRET header in production;
  // we accept either that or a manual probe via ?force=1 for ad-hoc
  // testing.
  const auth = req.headers.get("authorization");
  const ok =
    auth === `Bearer ${process.env.CRON_SECRET}` ||
    new URL(req.url).searchParams.get("force") === process.env.CRON_SECRET;
  if (!ok && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const urlList = [
    `${SITE}/`,
    `${SITE}/archive`,
    `${SITE}/sources`,
    `${SITE}/stats`,
    ...PAIRINGS.map((p) => `${SITE}/${p.slug}`),
  ];

  const body = {
    host: "yinyan.news",
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
  };

  // Hit the IndexNow endpoint. Bing acts as the canonical relay and
  // forwards to participating engines.
  const r = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  return NextResponse.json({
    ok: r.ok,
    status: r.status,
    pushed: urlList.length,
    timestamp: new Date().toISOString(),
  });
}
