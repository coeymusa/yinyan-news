import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allSlugs, getPairing } from "../../lib/pairings";
import { TOPIC_LABEL } from "../../lib/pairings";
import { formatDate } from "../../lib/format";

// /embed/[slug] — a stripped-down, iframe-friendly version of any
// pairing. No header, no footer, no nav. Designed to be dropped into
// a substack/blog/newsletter with a 300px-tall iframe.
//
// The pairing card itself is the entire content. We add a small
// 'via yinyan.news' link at the bottom so embedded pairings still
// drive traffic back. Each embed = one earned backlink.

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPairing(slug);
  if (!p) return { title: "not found" };
  return {
    title: `${p.hard.headline} / ${p.hopeful.headline} — yinyan.news`,
    robots: { index: false, follow: true },
  };
}

// Iframe-friendly: don't block embedding on any origin.
export default async function EmbedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPairing(slug);
  if (!p) notFound();

  return (
    <main className="min-h-screen bg-paper p-3 text-ink">
      <article className="overflow-hidden border border-ink/15">
        <div className="flex items-baseline justify-between bg-paper-deep px-4 py-2 font-mono text-[9px] uppercase tracking-[0.28em] text-ink/55">
          <a
            href={`https://yinyan.news/${p.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blood"
          >
            <span className="text-blood">yin</span>
            <span className="text-ink/35"> · </span>
            <span className="text-amber">yan</span>
            <span className="ml-1 text-ink/40">.news</span>
          </a>
          <span className="text-ink/45">
            {formatDate(p.date)} · {TOPIC_LABEL[p.topic]}
          </span>
        </div>

        <div className="grid md:grid-cols-2">
          {/* hard */}
          <div className="ink-grain bg-ink p-5 text-bone sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.3em] text-blood">
              <span className="live-dot" aria-hidden />
              <span>hard</span>
              {p.hard.country && (
                <span className="ml-1 text-bone/55">
                  · {p.hard.country.toUpperCase()}
                </span>
              )}
            </div>
            <h2 className="mt-3 font-serif text-xl italic leading-tight text-bone sm:text-2xl">
              {p.hard.headline}
            </h2>
            <p className="mt-3 font-sans text-xs leading-relaxed text-bone/75 sm:text-sm">
              {p.hard.body}
            </p>
          </div>

          {/* hopeful */}
          <div className="paper-grain bg-paper p-5 text-ink sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.3em] text-amber">
              <span
                className="live-dot"
                style={{
                  background: "var(--color-amber)",
                  boxShadow: "0 0 10px rgba(200, 153, 68, 0.6)",
                }}
                aria-hidden
              />
              <span>hopeful</span>
              {p.hopeful.country && (
                <span className="ml-1 text-ink/55">
                  · {p.hopeful.country.toUpperCase()}
                </span>
              )}
            </div>
            <h2 className="mt-3 font-serif text-xl italic leading-tight text-ink sm:text-2xl">
              {p.hopeful.headline}
            </h2>
            <p className="mt-3 font-sans text-xs leading-relaxed text-ink/75 sm:text-sm">
              {p.hopeful.body}
            </p>
          </div>
        </div>

        <a
          href={`https://yinyan.news/${p.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block border-t border-ink/15 bg-bone px-4 py-2 text-center font-mono text-[9px] uppercase tracking-[0.28em] text-ink/55 hover:bg-paper-deep hover:text-blood"
        >
          read the sources at yinyan.news →
        </a>
      </article>
    </main>
  );
}
