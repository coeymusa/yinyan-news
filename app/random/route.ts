import { redirect } from "next/navigation";
import { pickRandomSlug } from "../lib/pairings";

// /random — the stumble button. picks a random pairing and 307s.
// Force dynamic + no-cache so each visit gets a fresh roll.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const slug = pickRandomSlug();
  if (!slug) redirect("/");
  redirect(`/${slug}`);
}
