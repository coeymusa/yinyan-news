import { NextResponse } from "next/server";
import { PAIRINGS } from "../../lib/pairings";

// Public read — useful for syndication / external embeds. Cache hard
// because pairings are static at the file level until next deploy.
export async function GET() {
  return NextResponse.json(
    { total: PAIRINGS.length, pairings: PAIRINGS },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    },
  );
}
