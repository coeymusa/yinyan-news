import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { computeStats } from "../lib/pairings";
import { formatDate } from "../lib/format";

export const metadata: Metadata = {
  title: "press kit",
  description:
    "covering yinyan.news? everything you need: the rule, the editor, the assets, the boilerplate.",
  alternates: { canonical: "https://yinyan.news/press" },
};

export default function PressPage() {
  const s = computeStats();
  return (
    <>
      <Header />

      <article className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
          press kit
        </div>
        <h1 className="mt-6 font-serif text-5xl italic leading-[1.05] text-ink sm:text-7xl">
          covering yinyan.news?
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-ink/65 sm:text-2xl">
          everything below is licensed for use in any editorial context.
          take what you need.
        </p>

        {/* one-line description */}
        <section className="mt-16 border-t border-ink/15 pt-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
            the one-line description
          </div>
          <blockquote className="mt-4 border-l-2 border-blood pl-5 font-serif text-2xl italic leading-snug text-ink sm:text-3xl">
            yinyan.news is a paired-news ledger: for every hard headline,
            an equal-weight one that's hopeful. one editor. one rule.
          </blockquote>
        </section>

        {/* longer boilerplate */}
        <section className="mt-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
            the boilerplate
          </div>
          <p className="mt-4 font-serif text-lg leading-relaxed text-ink/85 sm:text-xl">
            yinyan.news is an editorial news site that publishes news in
            pairs. for every hard headline of the day, the editor finds an
            equal-weight one that is hopeful — same word count, same
            prominence, same gravity. there are no ads, no comments, no
            algorithmic feed. one human, by hand. founded in 2026 by{" "}
            <a
              href="https://coreyscodecave.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:text-blood hover:underline"
            >
              corey musa
            </a>
            , a software builder formerly at ubs and credit suisse.
          </p>
        </section>

        {/* tight quote-friendly facts */}
        <section className="mt-16 border-t border-ink/15 pt-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
            facts you can quote
          </div>
          <dl className="mt-6 grid gap-x-10 gap-y-4 font-serif text-lg leading-relaxed sm:grid-cols-[10rem_1fr]">
            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
              founded
            </dt>
            <dd>
              <time dateTime={s.earliest ?? "2026-05-01"}>
                {formatDate(s.earliest ?? "2026-05-01")}
              </time>
            </dd>

            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
              editor
            </dt>
            <dd>corey musa</dd>

            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
              location
            </dt>
            <dd>independent, internet</dd>

            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
              cadence
            </dt>
            <dd>one pairing a day, sometimes none</dd>

            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
              business model
            </dt>
            <dd>none. no ads, no sponsorships, no paid tier</dd>

            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
              pairings to date
            </dt>
            <dd>{s.total.toLocaleString()}</dd>

            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
              countries covered
            </dt>
            <dd>{s.countries.toLocaleString()}</dd>

            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
              sources cited
            </dt>
            <dd>{s.sources.toLocaleString()}</dd>
          </dl>
        </section>

        {/* assets */}
        <section className="mt-16 border-t border-ink/15 pt-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
            assets
          </div>
          <ul className="mt-6 space-y-3 font-serif text-lg leading-relaxed text-ink/85">
            <li>
              <a
                href="/icon"
                className="text-blood underline-offset-4 hover:underline"
              >
                site icon (96×96 png)
              </a>
              <span className="text-ink/55"> — split disc, blood + amber dots</span>
            </li>
            <li>
              <a
                href="/opengraph-image"
                className="text-blood underline-offset-4 hover:underline"
              >
                default open-graph card (1200×630 png)
              </a>
              <span className="text-ink/55"> — split-screen hard / hopeful</span>
            </li>
            <li>
              <a
                href="https://github.com/coeymusa/yinyan-news"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blood underline-offset-4 hover:underline"
              >
                source code (github)
              </a>
              <span className="text-ink/55"> — open. every pairing's commit is the audit trail.</span>
            </li>
          </ul>
        </section>

        {/* embed */}
        <section className="mt-16 border-t border-ink/15 pt-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
            quote a pairing
          </div>
          <p className="mt-4 max-w-prose font-serif text-lg leading-relaxed text-ink/85">
            you can embed any pairing as a one-line iframe.{" "}
            <a
              href="/embed"
              className="underline-offset-4 hover:text-blood hover:underline"
            >
              instructions on the embed page
            </a>
            .
          </p>
        </section>

        {/* contact */}
        <section className="mt-16 border-t border-ink/15 pt-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
            contact
          </div>
          <p className="mt-4 font-serif text-lg leading-relaxed text-ink/85">
            press, interview requests, hopeful tips, hard tips, corrections:{" "}
            <em>editor at yinyan.news</em>.
          </p>
        </section>
      </article>

      <Footer />
    </>
  );
}
