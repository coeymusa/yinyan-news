import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Dispatch from "../components/Dispatch";

export const metadata: Metadata = {
  title: "manifesto",
  description:
    "the rule that made yinyan.news. why every hard headline gets an equal-weight hopeful one.",
};

export default function ManifestoPage() {
  return (
    <>
      <Header />

      <article className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
          § the manifesto
        </div>
        <h1 className="mt-6 font-serif text-5xl italic leading-[1.05] text-ink sm:text-7xl">
          one ledger.
          <br />
          two halves.
          <br />
          <span className="text-blood">held</span> in <span className="text-amber">balance</span>.
        </h1>

        <div className="mt-12 space-y-8 font-serif text-xl leading-relaxed text-ink/80 sm:text-2xl">
          <p>
            the news, as you have been served it, is asymmetric. it knows that
            fear holds you, and dread keeps you. it has no equivalent muscle
            for hope, because hope does not pay as well.
          </p>
          <p>
            this site exists to fix exactly that asymmetry, and only that. the
            rule is one sentence:
          </p>
          <p className="border-l-2 border-blood pl-5 italic text-ink">
            for every hard headline we publish, we publish an equal-weight one
            that is hopeful. the same word count. the same prominence. the
            same gravity. always.
          </p>
          <p>
            the hopeful side is not a footnote. it is not a "but on a lighter
            note." it is not a kicker. it stands in the same column as the
            hard side because it must.
          </p>
          <p>
            we will never run a day of only hard. we will never run a day of
            only hopeful. if we cannot find a hopeful equal in weight to the
            day's hard, we publish nothing. we do not lie by omission, in
            either direction.
          </p>
          <p>
            we are slow. one pairing a day, sometimes none. we read the world
            in pairs because that is what the world is. we are not a
            firehose. we are a candle.
          </p>
        </div>

        <div className="mt-16 border-t border-ink/15 pt-12">
          <Dispatch />
        </div>
      </article>

      <Footer />
    </>
  );
}
