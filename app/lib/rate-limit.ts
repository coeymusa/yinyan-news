// Lightweight in-memory sliding-window rate limiter. Per-key cap.
const HITS = new Map<string, number[]>();

export function rateLimitOk(
  key: string,
  max = 5,
  windowMs = 60 * 60 * 1000,
): boolean {
  const now = Date.now();
  const arr = (HITS.get(key) ?? []).filter((t) => now - t < windowMs);
  if (arr.length >= max) {
    HITS.set(key, arr);
    return false;
  }
  arr.push(now);
  HITS.set(key, arr);
  return true;
}

export async function hashIp(ip: string): Promise<string> {
  const salt = process.env.IP_HASH_SALT ?? "yinyan-default-salt";
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
