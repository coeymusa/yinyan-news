import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dispatch from "./components/Dispatch";
import HeroPairing from "./components/HeroPairing";
import PairingCard from "./components/PairingCard";
import { computeStats, pinnedFirst, TOPIC_LABEL } from "./lib/pairings";
import { formatDate } from "./lib/format";

export default function Home() {
  const all = pinnedFirst();
  const [hero, ...rest] = all;
  const stats = computeStats();

  // group the rest by ISO date so the timeline reads like a paper trail
  const byDate = rest.reduce<Record<string, typeof rest>>((acc, p) => {
    if (!acc[p.date]) acc[p.date] = [];
    acc[p.date].push(p);
    return acc;
  }, {});
  const dateKeys = Object.keys(byDate).sort().reverse();

  return (
    <>
      <Header />

      {/* masthead — the tagline that sits above the day's pairing.
          short on purpose; the pairing itself does the real work. */}
      <section className="border-b border-ink/15 bg-paper-deep">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <h1 className="max-w-5xl font-serif text-4xl italic leading-[1.04] text-ink sm:text-6xl lg:text-7xl">
            for every <span className="text-blood">hard</span> headline,{" "}
            <br className="hidden sm:inline" />
            an equal-weight one that is{" "}
            <span className="text-amber">hopeful</span>.
          </h1>
          <p className="mt-5 max-w-2xl font-serif text-lg italic leading-relaxed text-ink/65 sm:text-xl">
            paired by hand, one day at a time. the world is not all bad. it
            is also not all good. this is the ledger of both.
          </p>
        </div>
      </section>

      {/* THE EVENT — today's pairing, full-bleed */}
      {hero && <HeroPairing pairing={hero} />}

      {/* stats strip — aliveness signal. the numbers update each deploy. */}
      <section className="border-b border-ink/15 bg-paper">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-5 py-10 sm:grid-cols-4 sm:px-8 sm:py-12">
          <Stat n={stats.total} label="pairings" />
          <Stat n={stats.countries} label="countries" />
          <Stat n={stats.sources} label="sources" />
          <Stat n={stats.topics} label="topics" />
        </div>
      </section>

      {/* THE LEDGER — recent pairings, grouped by date */}
      {dateKeys.length > 0 && (
        <section className="border-b border-ink/15">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="mb-10 flex items-baseline justify-between border-b border-ink/15 pb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
              <span>§ 02 — the ledger</span>
              <Link href="/archive" className="text-ink/40 hover:text-blood">
                full archive →
              </Link>
            </div>

            <div className="space-y-16">
              {dateKeys.map((date) => (
                <div key={date}>
                  <div className="mb-5 flex items-baseline justify-between border-b border-ink/10 pb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-ink/45">
                    <time dateTime={date}>{formatDate(date)}</time>
                    <span className="text-ink/30">
                      {byDate[date].length} pairing{byDate[date].length === 1 ? "" : "s"}
                    </span>
                  </div>
                  <div className="space-y-12">
                    {byDate[date].map((p) => (
                      <PairingCard key={p.slug} pairing={p} variant="feed" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* dispatch + the rule */}
      <section className="bg-paper-deep">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid gap-16 sm:grid-cols-[1fr_1fr]">
            <Dispatch />

            <div className="border-t border-ink/15 pt-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
                the rule
              </div>
              <p className="mt-4 font-serif text-3xl italic leading-snug text-ink sm:text-4xl">
                the news will tell you the world is on fire. it is. it is
                also being put out, in places, by people who will never be
                on the front page.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/55">
                <Link href="/manifesto" className="hover:text-blood">
                  read the manifesto →
                </Link>
                <Link href="/random" className="hover:text-blood">
                  stumble on a pairing →
                </Link>
                <Link href="/stats" className="hover:text-blood">
                  the ledger in numbers →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div>
      <div className="font-serif text-5xl italic leading-none text-ink sm:text-6xl">
        {n.toLocaleString()}
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
        {label}
      </div>
    </div>
  );
}

void TOPIC_LABEL;
