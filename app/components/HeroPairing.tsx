import Link from "next/link";
import type { Pairing } from "../lib/pairings";
import { TOPIC_LABEL } from "../lib/pairings";
import { formatDate } from "../lib/format";

// The full-bleed hero pairing — the masthead of the site. This is the
// first impression. It's deliberately oversized: each headline gets
// the visual room it would have in a print broadsheet. The rule of
// equal weight is most visible here because both halves are exactly
// half the screen.
//
// Distinct from PairingCard because the hero is the editorial *event*
// of the day, not just a list item.
export default function HeroPairing({ pairing }: { pairing: Pairing }) {
  return (
    <article className="border-b border-ink/15">
      {/* dateline strip — sits above the split, on paper */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-baseline justify-between gap-3 px-5 py-5 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="live-dot" aria-hidden />
          <span>today's pairing</span>
          <span className="text-ink/30">·</span>
          <time dateTime={pairing.date} className="text-ink/70">
            {formatDate(pairing.date)}
          </time>
          <span className="text-ink/30">·</span>
          <Link
            href={`/topic/${pairing.topic}`}
            className="hover:text-blood"
          >
            {TOPIC_LABEL[pairing.topic]}
          </Link>
        </div>
        <Link
          href={`/${pairing.slug}`}
          className="text-ink/40 hover:text-blood"
        >
          read the full pairing →
        </Link>
      </div>

      {/* the split. on mobile stacks; on desktop a true 50/50. each
          half is its own scroll-area-sized panel. */}
      <Link
        href={`/${pairing.slug}`}
        aria-label={`open pairing: ${pairing.hard.headline} / ${pairing.hopeful.headline}`}
        className="block"
      >
        <div className="grid border-y border-ink/15 md:grid-cols-2">
          {/* hard side — full-bleed ink */}
          <div className="ink-grain relative bg-ink p-8 text-bone sm:p-12 md:min-h-[34rem] md:p-16 lg:p-20">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-blood">
              <span className="live-dot" aria-hidden />
              <span>hard</span>
              {pairing.hard.country && (
                <>
                  <span className="text-bone/30">·</span>
                  <span className="text-bone/65">
                    {pairing.hard.country.toUpperCase()}
                  </span>
                </>
              )}
            </div>
            <h2 className="mt-8 font-serif text-4xl italic leading-[1.04] text-bone sm:text-5xl md:text-6xl lg:text-[clamp(2.5rem,4.6vw,4.5rem)]">
              {pairing.hard.headline}
            </h2>
            <p className="mt-8 max-w-prose font-sans text-base leading-relaxed text-bone/80 sm:text-lg">
              {pairing.hard.body}
            </p>
            <div className="mt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/55">
              via {pairing.hard.source.name}
            </div>
          </div>

          {/* hopeful side — full-bleed paper */}
          <div className="paper-grain relative bg-paper p-8 text-ink sm:p-12 md:min-h-[34rem] md:p-16 lg:p-20">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-amber">
              <span
                className="live-dot"
                style={{
                  background: "var(--color-amber)",
                  boxShadow: "0 0 10px rgba(200, 153, 68, 0.6)",
                }}
                aria-hidden
              />
              <span>hopeful</span>
              {pairing.hopeful.country && (
                <>
                  <span className="text-ink/30">·</span>
                  <span className="text-ink/65">
                    {pairing.hopeful.country.toUpperCase()}
                  </span>
                </>
              )}
            </div>
            <h2 className="mt-8 font-serif text-4xl italic leading-[1.04] text-ink sm:text-5xl md:text-6xl lg:text-[clamp(2.5rem,4.6vw,4.5rem)]">
              {pairing.hopeful.headline}
            </h2>
            <p className="mt-8 max-w-prose font-sans text-base leading-relaxed text-ink/80 sm:text-lg">
              {pairing.hopeful.body}
            </p>
            <div className="mt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/55">
              via {pairing.hopeful.source.name}
            </div>
          </div>
        </div>
      </Link>

      {pairing.editor_note && (
        <div className="mx-auto max-w-3xl px-5 py-8 text-center sm:px-8 sm:py-10">
          <p className="font-serif text-2xl italic leading-snug text-ink/70 sm:text-3xl">
            ed. — {pairing.editor_note}
          </p>
        </div>
      )}
    </article>
  );
}
