import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Dispatch from "../components/Dispatch";
import {
  BreadcrumbSchema,
  NewsArticleSchema,
} from "../components/StructuredData";
import ShareLinks from "../components/ShareLinks";
import { allSlugs, getPairing, PAIRINGS, TOPIC_LABEL } from "../lib/pairings";
import { formatDate } from "../lib/format";

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
  const title = `${p.hard.headline.replace(/\.$/, "")} / ${p.hopeful.headline.replace(/\.$/, "")}`;
  const desc = `${formatDate(p.date)} — ${p.hard.body.slice(0, 130)}…`;
  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      url: `https://yinyan.news/${slug}`,
      type: "article",
      publishedTime: p.date,
    },
    twitter: { card: "summary_large_image", title, description: desc },
    alternates: { canonical: `https://yinyan.news/${slug}` },
  };
}

export default async function PairingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPairing(slug);
  if (!p) notFound();

  const idx = PAIRINGS.findIndex((x) => x.slug === slug);
  const prev = idx > 0 ? PAIRINGS[idx - 1] : null;
  const next = idx < PAIRINGS.length - 1 ? PAIRINGS[idx + 1] : null;

  return (
    <>
      <Header />
      <NewsArticleSchema pairing={p} />
      <BreadcrumbSchema
        trail={[
          { name: "yinyan.news", url: "https://yinyan.news" },
          { name: "archive", url: "https://yinyan.news/archive" },
          {
            name: TOPIC_LABEL[p.topic],
            url: `https://yinyan.news/topic/${p.topic}`,
          },
          {
            name: p.hard.headline,
            url: `https://yinyan.news/${p.slug}`,
          },
        ]}
      />

      <article className="bg-paper">
        {/* metadata strip */}
        <div className="mx-auto max-w-5xl px-5 pt-12 sm:px-8 sm:pt-16">
          <Link
            href="/"
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/55 hover:text-blood"
          >
            ← all pairings
          </Link>
          <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/55">
            <div className="flex items-center gap-3">
              <time dateTime={p.date} className="text-ink/70">
                {formatDate(p.date)}
              </time>
              <span className="text-ink/30">·</span>
              <Link
                href={`/topic/${p.topic}`}
                className="hover:text-blood"
              >
                {TOPIC_LABEL[p.topic]}
              </Link>
            </div>
            <span className="text-ink/40">{p.slug}</span>
          </div>
        </div>

        {/* h1 sits above both halves so news crawlers see one unambiguous
            article subject. visually hidden but on the page for SEO. */}
        <h1 className="sr-only">
          {p.hard.headline} / {p.hopeful.headline}
        </h1>

        {/* the pair, full-page */}
        <div className="mx-auto mt-8 max-w-6xl px-5 sm:px-8">
          <div className="grid overflow-hidden border border-ink/15 md:grid-cols-2">
            {/* hard */}
            <section className="ink-grain bg-ink p-8 text-bone sm:p-12">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-blood">
                <span className="live-dot" aria-hidden />
                <span>hard</span>
                {p.hard.country && (
                  <>
                    <span className="text-bone/30">·</span>
                    <span className="text-bone/60">{p.hard.country.toUpperCase()}</span>
                  </>
                )}
              </div>
              <h2 className="mt-6 font-serif text-3xl italic leading-[1.08] text-bone sm:text-5xl">
                {p.hard.headline}
              </h2>
              <p className="mt-6 font-sans text-lg leading-relaxed text-bone/80 sm:text-xl">
                {p.hard.body}
              </p>
              <a
                href={p.hard.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 border-t border-bone/20 pt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/65 hover:text-blood"
              >
                read the source at {p.hard.source.name} ↗
              </a>
            </section>

            {/* hopeful */}
            <section className="paper-grain bg-paper p-8 text-ink sm:p-12">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-amber">
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
                  <>
                    <span className="text-ink/30">·</span>
                    <span className="text-ink/60">{p.hopeful.country.toUpperCase()}</span>
                  </>
                )}
              </div>
              <h2 className="mt-6 font-serif text-3xl italic leading-[1.08] text-ink sm:text-5xl">
                {p.hopeful.headline}
              </h2>
              <p className="mt-6 font-sans text-lg leading-relaxed text-ink/80 sm:text-xl">
                {p.hopeful.body}
              </p>
              <a
                href={p.hopeful.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 border-t border-ink/20 pt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/65 hover:text-amber"
              >
                read the source at {p.hopeful.source.name} ↗
              </a>
            </section>
          </div>

          {p.editor_note && (
            <p className="mx-auto mt-10 max-w-3xl text-center font-serif text-2xl italic leading-snug text-ink/60">
              ed. — {p.editor_note}
            </p>
          )}

          {/* share — high-intent moment, right under the pairing */}
          <div className="mx-auto mt-12 max-w-2xl">
            <ShareLinks
              url={`https://yinyan.news/${p.slug}`}
              hardHeadline={p.hard.headline}
              hopefulHeadline={p.hopeful.headline}
              tone="light"
            />
          </div>
        </div>

        {/* prev / next */}
        <nav className="mx-auto mt-20 max-w-5xl border-t border-ink/15 px-5 py-10 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              {prev && (
                <Link href={`/${prev.slug}`} className="group block">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/40">
                    ← previous pairing
                  </div>
                  <p className="mt-2 font-serif text-xl italic leading-snug text-ink/80 group-hover:text-blood">
                    {prev.hard.headline}
                  </p>
                </Link>
              )}
            </div>
            <div className="text-right">
              {next && (
                <Link href={`/${next.slug}`} className="group block">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/40">
                    next pairing →
                  </div>
                  <p className="mt-2 font-serif text-xl italic leading-snug text-ink/80 group-hover:text-amber">
                    {next.hard.headline}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* dispatch in the article tail — high-intent moment */}
        <section className="bg-paper-deep">
          <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
            <Dispatch />
          </div>
        </section>
      </article>

      <Footer />
    </>
  );
}
