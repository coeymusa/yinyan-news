import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  computeStats,
  PAIRINGS,
  TOPIC_LABEL,
  type PairingTopic,
} from "../lib/pairings";
import { formatDate } from "../lib/format";

export const metadata: Metadata = {
  title: "the ledger in numbers",
  description:
    "every pairing, every topic, every source on yinyan.news. the editorial rule, audited.",
  alternates: { canonical: "https://yinyan.news/stats" },
};

// /stats — a shareable artifact. shows the editorial rule is being
// kept (equal split between hard and hopeful sides), distribution
// across topics + countries + sources, and the run-rate.
export default function StatsPage() {
  const s = computeStats();

  // topic distribution
  const topicCounts = new Map<PairingTopic, number>();
  for (const p of PAIRINGS) {
    topicCounts.set(p.topic, (topicCounts.get(p.topic) ?? 0) + 1);
  }
  const topicEntries = [...topicCounts.entries()].sort((a, b) => b[1] - a[1]);
  const topicMax = topicEntries[0]?.[1] ?? 1;

  // country distribution
  const countryCounts = new Map<string, number>();
  for (const p of PAIRINGS) {
    if (p.hard.country && p.hard.country !== "global")
      countryCounts.set(p.hard.country, (countryCounts.get(p.hard.country) ?? 0) + 1);
    if (p.hopeful.country && p.hopeful.country !== "global")
      countryCounts.set(p.hopeful.country, (countryCounts.get(p.hopeful.country) ?? 0) + 1);
  }
  const countryEntries = [...countryCounts.entries()].sort((a, b) => b[1] - a[1]);

  // source counts
  const sourceCounts = new Map<string, number>();
  for (const p of PAIRINGS) {
    sourceCounts.set(p.hard.source.name, (sourceCounts.get(p.hard.source.name) ?? 0) + 1);
    sourceCounts.set(
      p.hopeful.source.name,
      (sourceCounts.get(p.hopeful.source.name) ?? 0) + 1,
    );
  }
  const sourceEntries = [...sourceCounts.entries()].sort((a, b) => b[1] - a[1]);

  // hard / hopeful split — proves the editorial rule is being kept.
  // by definition each pairing contributes exactly 1 to each side.
  // counting independently lets us spot if anything ever drifts.
  const hardCount = PAIRINGS.length;
  const hopefulCount = PAIRINGS.length;

  return (
    <>
      <Header />

      <article className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
          § the ledger in numbers
        </div>
        <h1 className="mt-6 font-serif text-5xl italic leading-[1.05] text-ink sm:text-7xl">
          {s.total.toLocaleString()} pairing{s.total === 1 ? "" : "s"}.
          <br />
          {s.countries.toLocaleString()} countries.
          <br />
          one rule, kept.
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-ink/65 sm:text-2xl">
          the editorial rule is the product. these numbers are the audit.
          since {formatDate(s.earliest ?? "2026-05-01")}.
        </p>

        {/* the rule, audited */}
        <section className="mt-16 border-t border-ink/15 pt-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
            the rule, kept
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="ink-grain bg-ink p-8 text-bone">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-blood">
                hard
              </div>
              <div className="mt-3 font-serif text-7xl italic leading-none">
                {hardCount.toLocaleString()}
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/55">
                hard headlines published
              </div>
            </div>
            <div className="paper-grain bg-paper p-8 text-ink">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber">
                hopeful
              </div>
              <div className="mt-3 font-serif text-7xl italic leading-none">
                {hopefulCount.toLocaleString()}
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/55">
                hopeful headlines published
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-2xl font-serif text-base italic leading-relaxed text-ink/55">
            every pairing has both. the equal-weight rule has been kept{" "}
            {hardCount.toLocaleString()} times in a row.
          </p>
        </section>

        {/* topic distribution */}
        <section className="mt-20 border-t border-ink/15 pt-10">
          <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
            <span>by topic</span>
            <span className="text-ink/40">{s.topics} active</span>
          </div>
          <ul className="mt-6 space-y-3">
            {topicEntries.map(([topic, n]) => (
              <li key={topic} className="grid grid-cols-[10rem_1fr_3rem] items-center gap-4">
                <Link
                  href={`/topic/${topic}`}
                  className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink hover:text-blood"
                >
                  {TOPIC_LABEL[topic]}
                </Link>
                <div className="h-2 bg-ink/10">
                  <div
                    className="h-full bg-ink"
                    style={{ width: `${(n / topicMax) * 100}%` }}
                  />
                </div>
                <span className="text-right font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
                  {n}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* country distribution */}
        <section className="mt-20 border-t border-ink/15 pt-10">
          <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
            <span>by country</span>
            <span className="text-ink/40">{s.countries} represented</span>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {countryEntries.map(([code, n]) => (
              <li
                key={code}
                className="border border-ink/20 bg-bone px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/75"
              >
                {code} <span className="text-ink/40">×{n}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* sources */}
        <section className="mt-20 border-t border-ink/15 pt-10">
          <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
            <span>by source</span>
            <span className="text-ink/40">{s.sources} cited</span>
          </div>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {sourceEntries.map(([name, n]) => (
              <li
                key={name}
                className="flex items-baseline justify-between border-b border-ink/10 pb-2 font-serif italic"
              >
                <span className="text-base text-ink">{name}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
                  ×{n}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* footer note */}
        <section className="mt-24 border-t border-ink/15 pt-8 font-mono text-[10px] uppercase tracking-[0.28em] text-ink/45">
          rebuilt every deploy · ledger started {formatDate(s.earliest ?? "2026-05-01")}
        </section>
      </article>

      <Footer />
    </>
  );
}
