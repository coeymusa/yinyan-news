import { NextResponse } from "next/server";
import { pinnedFirst } from "../../lib/pairings";

// GET /api/today — the current "hero" pairing as JSON. Generously
// cached at the edge so it survives traffic spikes; the data only
// changes on deploy anyway.
export async function GET() {
  const all = pinnedFirst();
  const top = all[0];
  if (!top) {
    return NextResponse.json({ error: "no pairings yet" }, { status: 404 });
  }
  return NextResponse.json(
    {
      slug: top.slug,
      url: `https://yinyan.news/${top.slug}`,
      embed_url: `https://yinyan.news/embed/${top.slug}`,
      date: top.date,
      topic: top.topic,
      hard: top.hard,
      hopeful: top.hopeful,
      editor_note: top.editor_note ?? null,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
