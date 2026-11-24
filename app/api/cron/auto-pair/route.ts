import { NextResponse } from "next/server";
import { fetchAll, withinHours } from "../../../lib/rss";
import { generatePairing } from "../../../lib/ai";
import { getFile, putFile } from "../../../lib/github";
import type { Pairing } from "../../../lib/pairings";

// Daily auto-pair. Runs from Vercel cron once a day. Idempotent: skips
// if a pairing already exists for today (in either curated or
// generated archives).
//
// Failure mode is deliberately quiet: if no candidates, or AI fails,
// or GitHub commit fails, we return a 200 JSON with `published: false`
// and a reason. The site stays static and untouched. Better to skip a
// day than to publish junk.

export const runtime = "nodejs";
export const maxDuration = 120;
export const dynamic = "force-dynamic";

const FILE_PATH = "app/lib/generated-pairings.json";

export async function GET(req: Request) {
  // Auth: Vercel cron sends Authorization: Bearer <CRON_SECRET>.
  // Manual probe via ?force=<CRON_SECRET> for one-off testing.
  const auth = req.headers.get("authorization");
  const url = new URL(req.url);
  const force = url.searchParams.get("force");
  const ok =
    auth === `Bearer ${process.env.CRON_SECRET}` ||
    (force && force === process.env.CRON_SECRET);
  if (!ok && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const today = new Date().toISOString().slice(0, 10);
  const dryRun = url.searchParams.get("dry") === "1";

  try {
    // 1. Pull current generated archive from GitHub. Existing
    //    pairings tell us if today is already covered.
    const file = await getFile(FILE_PATH);
    const existing = JSON.parse(file.content) as Pairing[];

    if (!dryRun && existing.some((p) => p.date === today)) {
      return NextResponse.json({
        published: false,
        reason: "already-published-today",
        date: today,
      });
    }

    // 2. Fetch RSS feeds and constrain to last 36h of news.
    const all = await fetchAll();
    const hard = withinHours(all.hard, 36);
    const hopeful = withinHours(all.hopeful, 36);
    if (hard.length < 3 || hopeful.length < 3) {
      return NextResponse.json({
        published: false,
        reason: "thin-candidates",
        hard: hard.length,
        hopeful: hopeful.length,
      });
    }

    // 3. Ask the model for a structured pairing. Validates voice and
    //    word-balance rules; throws if the output is junk.
    const pairing = await generatePairing(hard, hopeful);

    // 4. Belt-and-braces slug check: if the model echoed a slug
    //    already in the archive, append a suffix.
    let slug = pairing.slug;
    const taken = new Set(existing.map((p) => p.slug));
    if (taken.has(slug)) {
      slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`;
      pairing.slug = slug;
    }

    if (dryRun) {
      return NextResponse.json({ published: false, dryRun: true, pairing });
    }

    // 5. Prepend new pairing and commit. The commit triggers a Vercel
    //    rebuild — that is the publish step.
    const next = [pairing, ...existing];
    const newContent = JSON.stringify(next, null, 2) + "\n";
    await putFile({
      path: FILE_PATH,
      content: newContent,
      sha: file.sha,
      message: `chore(auto-pair): publish ${pairing.slug}`,
    });

    return NextResponse.json({
      published: true,
      slug: pairing.slug,
      date: pairing.date,
      topic: pairing.topic,
      total: next.length,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { published: false, reason: "error", error: msg.slice(0, 500) },
      { status: 200 },
    );
  }
}
