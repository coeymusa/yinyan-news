"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Pairing, PairingTopic } from "../lib/pairings";
import { TOPIC_LABEL } from "../lib/pairings";
import { formatDate } from "../lib/format";

type Props = {
  pairings: Pairing[];
};

const ALL_TOPICS: (PairingTopic | "all")[] = [
  "all",
  "climate","war","democracy","economy","ai","health",
  "science","culture","rights","other",
];

// Client-side search + topic filter for /archive. Pairings count is
// small enough (<10k forever) that filtering in the browser is fine —
// no api round-trip needed.
export default function ArchiveSearch({ pairings }: Props) {
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState<PairingTopic | "all">("all");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return pairings.filter((p) => {
      if (topic !== "all" && p.topic !== topic) return false;
      if (!needle) return true;
      const hay = `${p.hard.headline} ${p.hard.body} ${p.hopeful.headline} ${p.hopeful.body} ${p.editor_note ?? ""} ${p.hard.source.name} ${p.hopeful.source.name}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [pairings, q, topic]);

  // group by month
  const buckets: Record<string, Pairing[]> = {};
  for (const p of filtered) {
    const m = p.date.slice(0, 7);
    if (!buckets[m]) buckets[m] = [];
    buckets[m].push(p);
  }
  const months = Object.keys(buckets).sort().reverse();

  return (
    <>
      {/* search + filter strip */}
      <div className="mb-12 grid gap-3 border-b border-ink/15 pb-8 sm:grid-cols-[1fr_auto] sm:items-center">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="search the ledger…"
          aria-label="search archive"
          className="
            border border-ink/25 bg-bone px-4 py-3
            font-serif text-lg italic text-ink placeholder:text-ink/40
            focus:border-blood focus:outline-none
          "
        />
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value as PairingTopic | "all")}
          aria-label="filter by topic"
          className="
            border border-ink/25 bg-bone px-4 py-3
            font-mono text-[11px] uppercase tracking-[0.22em] text-ink
            focus:border-blood focus:outline-none
          "
        >
          {ALL_TOPICS.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "all topics" : TOPIC_LABEL[t]}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.28em] text-ink/55">
        {filtered.length} of {pairings.length} pairings
      </div>

      {filtered.length === 0 ? (
        <p className="font-serif text-3xl italic leading-snug text-ink/55">
          no pairings match. try a different word, or clear the filter.
        </p>
      ) : (
        <div className="space-y-16">
          {months.map((m) => (
            <section key={m}>
              <div className="mb-6 flex items-baseline justify-between border-b border-ink/15 pb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
                <span>{monthLabel(m)}</span>
                <span className="text-ink/40">
                  {buckets[m].length} pairing{buckets[m].length === 1 ? "" : "s"}
                </span>
              </div>
              <ul className="divide-y divide-ink/10">
                {buckets[m].map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/${p.slug}`}
                      className="group grid items-center gap-4 py-5 sm:grid-cols-[6rem_1fr_1fr_8rem]"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/55">
                        {formatDate(p.date)}
                      </span>
                      <span className="font-serif text-lg italic leading-snug text-blood group-hover:underline">
                        {p.hard.headline}
                      </span>
                      <span className="font-serif text-lg italic leading-snug text-amber group-hover:underline">
                        {p.hopeful.headline}
                      </span>
                      <span className="text-right font-mono text-[10px] uppercase tracking-[0.25em] text-ink/45">
                        {TOPIC_LABEL[p.topic]}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </>
  );
}

function monthLabel(yyyymm: string): string {
  const [y, m] = yyyymm.split("-").map(Number);
  const months = [
    "january","february","march","april","may","june",
    "july","august","september","october","november","december",
  ];
  return `${months[m - 1]} ${y}`;
}
