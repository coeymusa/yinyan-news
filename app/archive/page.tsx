import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { PAIRINGS, TOPIC_LABEL } from "../lib/pairings";
import { formatDate } from "../lib/format";

export const metadata: Metadata = {
  title: "archive",
  description: "every pairing, in order, in full.",
};

// Group pairings by month for the archive table.
function groupByMonth(): Record<string, typeof PAIRINGS> {
  const buckets: Record<string, typeof PAIRINGS> = {};
  for (const p of PAIRINGS) {
    const m = p.date.slice(0, 7); // YYYY-MM
    if (!buckets[m]) buckets[m] = [];
    buckets[m].push(p);
  }
  return buckets;
}

function monthLabel(yyyymm: string): string {
  const [y, m] = yyyymm.split("-").map(Number);
  const months = [
    "january","february","march","april","may","june",
    "july","august","september","october","november","december",
  ];
  return `${months[m - 1]} ${y}`;
}

export default function ArchivePage() {
  const buckets = groupByMonth();
  const months = Object.keys(buckets).sort().reverse();

  return (
    <>
      <Header />

      <article className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
          archive
        </div>
        <h1 className="mt-6 font-serif text-5xl italic leading-[1.05] text-ink sm:text-7xl">
          every pairing, in order.
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-ink/65 sm:text-2xl">
          {PAIRINGS.length} pairings published. one ledger.
        </p>

        <div className="mt-16 space-y-16">
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
      </article>

      <Footer />
    </>
  );
}
