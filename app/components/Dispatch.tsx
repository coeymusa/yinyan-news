"use client";

import { useState } from "react";

// Newsletter form — "the dispatch". A weekly paired digest, one
// envelope, both halves of the world. Mirrors the WIYC dispatch shape
// so the family of sites feels related.
export default function Dispatch() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState("sending");
    try {
      const r = await fetch("/api/dispatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!r.ok) {
        setState("error");
        return;
      }
      setState("ok");
      setEmail("");
    } catch {
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <div id="dispatch" className="border-t border-ink/15 pt-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
          the dispatch
        </div>
        <p className="mt-4 font-serif text-3xl italic leading-snug text-ink sm:text-4xl">
          you're on the ledger.
        </p>
        <p className="mt-3 max-w-md font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
          one envelope a week. unsubscribe anytime, one click.
        </p>
      </div>
    );
  }

  return (
    <div id="dispatch" className="border-t border-ink/15 pt-10">
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
        the dispatch
      </div>
      <p className="mt-4 max-w-2xl font-serif text-3xl italic leading-snug text-ink sm:text-4xl">
        a weekly envelope — seven pairings, one quiet read.
      </p>

      <form
        onSubmit={submit}
        className="mt-6 flex max-w-lg flex-col gap-3 sm:flex-row sm:items-stretch"
      >
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your email"
          aria-label="email for the dispatch"
          className="
            flex-1 border border-ink/25 bg-bone px-4 py-3
            font-serif text-base italic text-ink placeholder:text-ink/40
            focus:border-blood focus:outline-none
          "
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="
            border border-ink/40 bg-ink px-6 py-3 font-mono text-[10px]
            uppercase tracking-[0.25em] text-paper transition
            hover:border-blood hover:bg-blood
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          {state === "sending" ? "sending…" : "subscribe"}
        </button>
      </form>

      <p className="mt-4 max-w-lg font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">
        free. no tracking. one envelope a week, sometimes none. unsubscribe
        is one click.
      </p>

      {state === "error" && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-blood">
          something went wrong. try again in a moment.
        </p>
      )}
    </div>
  );
}
