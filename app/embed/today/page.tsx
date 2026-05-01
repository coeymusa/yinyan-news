import { redirect } from "next/navigation";
import { pinnedFirst } from "../../lib/pairings";

// /embed/today → 307 to the embed for today's hero pairing.
// makes "embed today's pairing" a stable URL bloggers can paste once.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function EmbedToday() {
  const all = pinnedFirst();
  const top = all[0];
  if (!top) redirect("/");
  redirect(`/embed/${top.slug}`);
}
