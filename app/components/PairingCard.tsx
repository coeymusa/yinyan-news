import Link from "next/link";
import type { Pairing } from "../lib/pairings";
import { TOPIC_LABEL } from "../lib/pairings";
import { formatDate } from "../lib/format";

// The two-card unit. This is the entire product.
//
// On wider viewports: side-by-side, vertical rule between the halves.
// On narrow viewports: stacked, horizontal rule between.
//
// Both halves MUST be visually equal in weight. If anything in here
// starts to make the hopeful side smaller / lighter / footnoted, push
// back — it breaks the editorial rule the site is built on.
export default function PairingCard({
  pairing,
  variant = "feed",
}: {
  pairing: Pairing;
  variant?: "feed" | "hero";
}) {
  const isHero = variant === "hero";
  return (
    <article className="group relative">
      <Link
        href={`/${pairing.slug}`}
        aria-label={`open pairing: ${pairing.hard.headline} / ${pairing.hopeful.headline}`}
        className="block"
      >
        {/* metadata strip */}
        <div className="mb-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
          <div className="flex items-center gap-3">
            <span className="text-ink/70">{formatDate(pairing.date)}</span>
            <span className="text-ink/30">·</span>
            <span>{TOPIC_LABEL[pairing.topic]}</span>
          </div>
          <span className="text-ink/35 transition group-hover:text-blood">
            read pairing →
          </span>
        </div>

        {/* the pair */}
        <div
          className={`grid overflow-hidden border border-ink/15 ${
            isHero ? "min-h-[24rem]" : "min-h-[18rem]"
          } md:grid-cols-2`}
        >
          {/* hard side */}
          <div className="ink-grain relative bg-ink p-6 text-bone sm:p-8">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-blood">
              <span className="live-dot" aria-hidden />
              <span>hard</span>
            </div>
            <h3
              className={`mt-4 font-serif italic leading-[1.1] text-bone ${
                isHero ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"
              }`}
            >
              {pairing.hard.headline}
            </h3>
            <p
              className={`mt-4 font-sans leading-relaxed text-bone/75 ${
                isHero ? "text-base sm:text-lg" : "text-sm sm:text-base"
              }`}
            >
              {pairing.hard.body}
            </p>
            <div className="mt-6 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-bone/50">
              <span>via {pairing.hard.source.name}</span>
              {pairing.hard.country && (
                <span className="text-bone/40">{pairing.hard.country.toUpperCase()}</span>
              )}
            </div>
          </div>

          {/* hopeful side */}
          <div className="paper-grain relative bg-paper p-6 text-ink sm:p-8">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-amber">
              <span className="live-dot" style={{ background: "var(--color-amber)", boxShadow: "0 0 10px rgba(200, 153, 68, 0.6)" }} aria-hidden />
              <span>hopeful</span>
            </div>
            <h3
              className={`mt-4 font-serif italic leading-[1.1] text-ink ${
                isHero ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"
              }`}
            >
              {pairing.hopeful.headline}
            </h3>
            <p
              className={`mt-4 font-sans leading-relaxed text-ink/75 ${
                isHero ? "text-base sm:text-lg" : "text-sm sm:text-base"
              }`}
            >
              {pairing.hopeful.body}
            </p>
            <div className="mt-6 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-ink/50">
              <span>via {pairing.hopeful.source.name}</span>
              {pairing.hopeful.country && (
                <span className="text-ink/40">{pairing.hopeful.country.toUpperCase()}</span>
              )}
            </div>
          </div>
        </div>

        {/* editor's note runs across the bottom, pulling both sides
            into one frame. quiet typography on purpose. */}
        {pairing.editor_note && (
          <p className="mt-3 max-w-3xl border-t border-ink/15 pt-3 font-serif text-base italic leading-snug text-ink/55">
            ed. — {pairing.editor_note}
          </p>
        )}
      </Link>
    </article>
  );
}
