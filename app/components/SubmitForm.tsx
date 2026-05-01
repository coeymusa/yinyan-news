"use client";

import { useState } from "react";

export default function SubmitForm() {
  const [url, setUrl] = useState("");
  const [why, setWhy] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setState("sending");
    try {
      const r = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          why: why.trim() || undefined,
          email: email.trim() || undefined,
        }),
      });
      if (!r.ok) {
        setState("error");
        return;
      }
      setState("ok");
      setUrl("");
      setWhy("");
      setEmail("");
    } catch {
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <div className="border border-ink/15 bg-bone p-8">
        <p className="font-serif text-3xl italic leading-snug text-ink">
          thanks. it's in the editor's queue.
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/55">
          if it makes a pairing, you'll see it on the site.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <label
          htmlFor="url"
          className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/55"
        >
          link to the story *
        </label>
        <input
          id="url"
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://"
          className="
            mt-2 block w-full border border-ink/25 bg-bone px-4 py-3
            font-serif text-lg italic text-ink placeholder:text-ink/35
            focus:border-blood focus:outline-none
          "
        />
      </div>

      <div>
        <label
          htmlFor="why"
          className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/55"
        >
          why this is hopeful (optional, max 500 chars)
        </label>
        <textarea
          id="why"
          rows={4}
          maxLength={500}
          value={why}
          onChange={(e) => setWhy(e.target.value)}
          placeholder="not required. but if you have a one-liner about why this matters, it helps the editor."
          className="
            mt-2 block w-full border border-ink/25 bg-bone px-4 py-3
            font-serif text-base italic text-ink placeholder:text-ink/35
            focus:border-blood focus:outline-none
          "
        />
        <div className="mt-1 text-right font-mono text-[9px] uppercase tracking-[0.25em] text-ink/40">
          {why.length} / 500
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/55"
        >
          your email (optional — only used if the editor needs to ask)
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@somewhere.com"
          className="
            mt-2 block w-full border border-ink/25 bg-bone px-4 py-3
            font-serif text-base italic text-ink placeholder:text-ink/35
            focus:border-blood focus:outline-none
          "
        />
      </div>

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
        {state === "sending" ? "sending…" : "send to the editor →"}
      </button>

      {state === "error" && (
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-blood">
          something went wrong. try again, or email the editor directly.
        </p>
      )}
    </form>
  );
}
