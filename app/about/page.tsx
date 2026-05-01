import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "about",
  description: "who's behind yinyan.news, how pairings get chosen, and why.",
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <article className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
          about
        </div>
        <h1 className="mt-6 font-serif text-5xl italic leading-[1.05] text-ink sm:text-6xl">
          a candle, not a firehose.
        </h1>

        <div className="mt-12 space-y-8 font-serif text-lg leading-relaxed text-ink/80 sm:text-xl">
          <p>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
              who
            </span>
            <br />
            yinyan.news is curated by{" "}
            <a
              href="https://coreyscodecave.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:text-blood hover:underline"
            >
              corey musa
            </a>
            , a builder of small, quiet things on the internet. it is a sister
            site to{" "}
            <a
              href="https://whatisyourconcern.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:text-blood hover:underline"
            >
              whatisyourconcern.com
            </a>{" "}
            and{" "}
            <a
              href="https://getmooncake.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:text-blood hover:underline"
            >
              getmooncake.com
            </a>
            .
          </p>

          <p>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
              how a pairing gets chosen
            </span>
            <br />
            every day, a hard story comes from the day's actual front pages.
            the hopeful story is found from a wide net of public-interest
            wires, ngo press rooms, scientific journals, and ministries. ai is
            used to surface candidates. a human picks the pair. the rule of
            equal weight is enforced by hand.
          </p>

          <p>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
              what we will not do
            </span>
            <br />
            we will not run ads. we will not take sponsorships from anyone in
            either side of any pairing. we will not allow comments. we will
            not run a newsletter that is anything other than the dispatch. we
            will not break the rule.
          </p>

          <p>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
              corrections
            </span>
            <br />
            we will get things wrong. when we do, the correction is published
            with the same weight as the original — same column, same
            typography, same date stamp. we never silently edit.
          </p>

          <p>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
              contact
            </span>
            <br />
            corrections, hopeful tips, hard tips: <em>editor at yinyan.news</em>.
          </p>
        </div>
      </article>

      <Footer />
    </>
  );
}
