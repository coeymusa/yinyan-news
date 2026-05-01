// Optional Supabase persistence for newsletter subscribers. If env is
// unset, /api/dispatch returns ok without writing — useful in dev and
// for the 0-traffic period before the dispatch is connected.

const URL_KEY = "SUPABASE_URL";
const SERVICE_KEY = "SUPABASE_SERVICE_ROLE_KEY";

export function hasSupabase(): boolean {
  return !!(process.env[URL_KEY] && process.env[SERVICE_KEY]);
}

export async function insertDispatchSubscriber(input: {
  email: string;
  ip_hash: string | null;
}): Promise<{ ok: boolean }> {
  const base = process.env[URL_KEY];
  const k = process.env[SERVICE_KEY];
  if (!base || !k) return { ok: false };
  const r = await fetch(`${base}/rest/v1/dispatch_subscribers`, {
    method: "POST",
    headers: {
      apikey: k,
      Authorization: `Bearer ${k}`,
      "Content-Type": "application/json",
      Prefer: "resolution=ignore-duplicates,return=minimal",
    },
    body: JSON.stringify(input),
  });
  return { ok: r.ok };
}
