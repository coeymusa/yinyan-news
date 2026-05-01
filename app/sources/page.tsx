import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { PAIRINGS, TOPIC_LABEL } from "../lib/pairings";
import { formatDate } from "../lib/format";

export const metadata: Metadata = {
  title: "the sources",
  description:
    "every publication, ministry, and journal yinyan.news has cited. organised, transparent, and credited.",
  alternates: { canonical: "https://yinyan.news/sources" },
};

type SourceUse = {
  side: "hard" | "hopeful";
  url: string;
  pairingSlug: string;
  pairingDate: string;
  pairingTopic: string;
  headline: string;
};

// /sources — a transparency page that doubles as link equity. lists
// every outlet we've cited, the dates, the urls. great for SEO (each
// source name is a search query someone runs) and for credibility.
export default function SourcesPage() {
  // bucket all source uses by source name
  const byName = new Map<string, SourceUse[]>();
  for (const p of PAIRINGS) {
    const hard: SourceUse = {
      side: "hard",
      url: p.hard.source.url,
      pairingSlug: p.slug,
      pairingDate: p.date,
      pairingTopic: TOPIC_LABEL[p.topic],
      headline: p.hard.headline,
    };
    const hopeful: SourceUse = {
      side: "hopeful",
      url: p.hopeful.source.url,
      pairingSlug: p.slug,
      pairingDate: p.date,
      pairingTopic: TOPIC_LABEL[p.topic],
      headline: p.hopeful.headline,
    };
    const hardName = p.hard.source.name;
    const hopefulName = p.hopeful.source.name;
    if (!byName.has(hardName)) byName.set(hardName, []);
    byName.get(hardName)!.push(hard);
    if (!byName.has(hopefulName)) byName.set(hopefulName, []);
    byName.get(hopefulName)!.push(hopeful);
  }

  // sort sources alphabetically
  const sorted = [...byName.entries()].sort((a, b) =>
    a[0].toLowerCase().localeCompare(b[0].toLowerCase()),
  );

  return (
    <>
      <Header />

      <article className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
          the sources
        </div>
        <h1 className="mt-6 font-serif text-5xl italic leading-[1.05] text-ink sm:text-7xl">
          credit, where it's due.
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-ink/65 sm:text-2xl">
          every publication, ministry, agency, and journal we've cited.
          organised alphabetically. links go to the original. yinyan.news
          does no original reporting; the editor's job is to find and pair.
        </p>

        <div className="mt-16 space-y-12">
          {sorted.map(([name, uses]) => {
            // compute side counts
            const hard = uses.filter((u) => u.side === "hard").length;
            const hopeful = uses.filter((u) => u.side === "hopeful").length;
            return (
              <section
                key={name}
                className="border-b border-ink/15 pb-10"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink/10 pb-3">
                  <h2 className="font-serif text-2xl italic leading-snug text-ink sm:text-3xl">
                    {name}
                  </h2>
                  <div className="flex gap-3 font-mono text-[10px] uppercase tracking-[0.22em]">
                    {hard > 0 && (
                      <span className="text-blood">
                        ↑ {hard} hard
                      </span>
                    )}
                    {hopeful > 0 && (
                      <span className="text-amber">
                        ↓ {hopeful} hopeful
                      </span>
                    )}
                  </div>
                </div>
                <ul className="mt-4 space-y-3">
                  {uses.map((u, i) => (
                    <li
                      key={`${u.pairingSlug}-${u.side}-${i}`}
                      className="grid items-baseline gap-3 sm:grid-cols-[6rem_1fr_5rem]"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
                        {formatDate(u.pairingDate)}
                      </span>
                      <Link
                        href={`/${u.pairingSlug}`}
                        className={`font-serif italic leading-snug ${
                          u.side === "hard" ? "text-blood" : "text-amber"
                        } hover:underline`}
                      >
                        {u.headline}
                      </Link>
                      <span className="text-right font-mono text-[9px] uppercase tracking-[0.22em] text-ink/45">
                        {u.pairingTopic}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        <div className="mt-16 border-t border-ink/15 pt-8 font-mono text-[10px] uppercase tracking-[0.28em] text-ink/45">
          {sorted.length} sources · {PAIRINGS.length * 2} citations
        </div>
      </article>

      <Footer />
    </>
  );
}
