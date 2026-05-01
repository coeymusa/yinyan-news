import { NextResponse } from "next/server";
import { hasSupabase, insertSubmission } from "../../lib/supabase";
import { hashIp, rateLimitOk } from "../../lib/rate-limit";

const URL_RE = /^https?:\/\/[^\s]+$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clientIp(req: Request): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  return req.headers.get("cf-connecting-ip") ?? "0.0.0.0";
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }
  const url = (body as { url?: unknown })?.url;
  const why = (body as { why?: unknown })?.why;
  const email = (body as { email?: unknown })?.email;

  if (typeof url !== "string" || !URL_RE.test(url.trim())) {
    return NextResponse.json({ ok: false, error: "invalid url" }, { status: 400 });
  }
  if (why !== undefined && (typeof why !== "string" || why.length > 500)) {
    return NextResponse.json({ ok: false, error: "why too long" }, { status: 400 });
  }
  if (email !== undefined && email !== "" && (typeof email !== "string" || !EMAIL_RE.test(email.trim()))) {
    return NextResponse.json({ ok: false, error: "invalid email" }, { status: 400 });
  }

  const ip = clientIp(req);
  const ipHash = await hashIp(ip);
  // 3 submissions per hour per ip — generous for one curious reader,
  // tight enough to discourage scripted spam.
  if (!rateLimitOk(`submit:${ipHash}`, 3)) {
    return NextResponse.json({ ok: false, error: "rate limit" }, { status: 429 });
  }

  if (!hasSupabase()) {
    return NextResponse.json({ ok: true });
  }

  const { ok } = await insertSubmission({
    url: url.trim(),
    why: typeof why === "string" && why.trim() ? why.trim().slice(0, 500) : null,
    email: typeof email === "string" && email.trim() ? email.trim().toLowerCase() : null,
    ip_hash: ipHash,
  });
  if (!ok) {
    return NextResponse.json({ ok: false, error: "write failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
