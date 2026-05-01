import { NextResponse } from "next/server";
import { hasSupabase, insertDispatchSubscriber } from "../../lib/supabase";
import { hashIp, rateLimitOk } from "../../lib/rate-limit";

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
  const email = (body as { email?: unknown })?.email;
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ ok: false, error: "invalid email" }, { status: 400 });
  }
  const normalised = email.trim().toLowerCase();

  const ip = clientIp(req);
  const ipHash = await hashIp(ip);
  if (!rateLimitOk(`subscribe:${ipHash}`, 5)) {
    return NextResponse.json({ ok: false, error: "rate limit" }, { status: 429 });
  }

  if (!hasSupabase()) {
    // dev / preview without env: pretend we wrote it
    return NextResponse.json({ ok: true });
  }

  const { ok } = await insertDispatchSubscriber({
    email: normalised,
    ip_hash: ipHash,
  });
  if (!ok) {
    return NextResponse.json({ ok: false, error: "write failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
