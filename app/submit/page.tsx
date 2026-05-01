import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SubmitForm from "../components/SubmitForm";

export const metadata: Metadata = {
  title: "tip the editor",
  description:
    "found a hopeful headline that deserves to be paired? send it. the editor reads everything.",
  alternates: { canonical: "https://yinyan.news/submit" },
};

export default function SubmitPage() {
  return (
    <>
      <Header />

      <article className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
          tip the editor
        </div>
        <h1 className="mt-6 font-serif text-5xl italic leading-[1.05] text-ink sm:text-7xl">
          send a <span className="text-amber">hopeful</span> headline.
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-ink/65 sm:text-2xl">
          the hardest part of the editorial rule is finding the hopeful
          half. if you've read something this week that should be paired,
          send the link. one human reads every submission.
        </p>

        <div className="mt-12">
          <SubmitForm />
        </div>

        <div className="mt-20 border-t border-ink/15 pt-10 font-serif text-base italic leading-relaxed text-ink/65">
          <p>
            <strong className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55 not-italic">
              what we're looking for
            </strong>
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>recent (within the last ~14 days)</li>
            <li>credible source — wire, ministry, journal, established outlet</li>
            <li>not opinion, not a brand newsroom puff piece</li>
            <li>substantive — a recovery, a policy that worked, a record beaten in the right direction, a quiet long-term win</li>
            <li>has a hard equivalent we could pair it with</li>
          </ul>
        </div>

        <div className="mt-16 border-t border-ink/15 pt-10 font-serif text-base italic leading-relaxed text-ink/65">
          you can also email the editor directly:{" "}
          <em>editor at yinyan.news</em>.
        </div>
      </article>

      <Footer />
    </>
  );
}
