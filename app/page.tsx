import Header from "./components/Header";
import Footer from "./components/Footer";
import Dispatch from "./components/Dispatch";
import PairingCard from "./components/PairingCard";
import { pinnedFirst, TOPIC_LABEL } from "./lib/pairings";

export default function Home() {
  const all = pinnedFirst();
  const [hero, ...rest] = all;
  const today = new Date();
  const dayMonth = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).toLowerCase();

  return (
    <>
      <Header />

      {/* masthead — what the site is, in one breath */}
      <section className="border-b border-ink/15">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink/55">
            <span className="live-dot" aria-hidden />
            <span>today's ledger · {dayMonth}</span>
          </div>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl italic leading-[1.05] text-ink sm:text-7xl">
            for every <span className="text-blood">hard</span> headline,
            an equal-weight one that is <span className="text-amber">hopeful</span>.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-ink/65 sm:text-2xl">
            the world is not all bad. it is also not all good. this is the
            ledger of both, paired by hand, one day at a time.
          </p>
        </div>
      </section>

      {/* hero pairing — today's full-bleed read */}
      {hero && (
        <section className="border-b border-ink/15">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
              § 01 — the pairing
            </div>
            <PairingCard pairing={hero} variant="hero" />
          </div>
        </section>
      )}

      {/* the timeline — recent pairings, newest first */}
      {rest.length > 0 && (
        <section className="border-b border-ink/15">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="mb-8 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
              <span>§ 02 — the timeline</span>
              <span className="text-ink/40">{rest.length} prior pairings</span>
            </div>
            <div className="space-y-12">
              {rest.map((p) => (
                <PairingCard key={p.slug} pairing={p} variant="feed" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* dispatch + manifesto teaser */}
      <section className="bg-paper-deep">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid gap-16 sm:grid-cols-[1fr_1fr]">
            <Dispatch />

            <div className="border-t border-ink/15 pt-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
                the manifesto
              </div>
              <p className="mt-4 font-serif text-3xl italic leading-snug text-ink sm:text-4xl">
                the news will tell you the world is on fire. it is. it is
                also being put out, in places, by people who will never be
                on the front page.
              </p>
              <a
                href="/manifesto"
                className="mt-6 inline-block font-mono text-[10px] uppercase tracking-[0.25em] text-ink/65 hover:text-blood"
              >
                read the manifesto →
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

void TOPIC_LABEL;
