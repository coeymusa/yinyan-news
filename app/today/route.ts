import { redirect } from "next/navigation";
import { pinnedFirst } from "../lib/pairings";

// /today → 307 to today's hero pairing. clean URL for share copy
// ("read today's pairing at yinyan.news/today") that auto-rotates.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const all = pinnedFirst();
  const top = all[0];
  if (!top) redirect("/");
  redirect(`/${top.slug}`);
}
