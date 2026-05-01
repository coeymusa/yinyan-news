import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ArchiveSearch from "../components/ArchiveSearch";
import { ItemListSchema } from "../components/StructuredData";
import { PAIRINGS } from "../lib/pairings";

export const metadata: Metadata = {
  title: "archive",
  description: "every pairing, in order, in full. searchable.",
};

export default function ArchivePage() {
  return (
    <>
      <Header />
      <ItemListSchema
        name="yinyan.news archive"
        items={PAIRINGS.map((p) => ({
          url: `https://yinyan.news/${p.slug}`,
          title: `${p.hard.headline} / ${p.hopeful.headline}`,
          date: p.date,
        }))}
      />

      <article className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
          archive
        </div>
        <h1 className="mt-6 font-serif text-5xl italic leading-[1.05] text-ink sm:text-7xl">
          every pairing, in order.
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-ink/65 sm:text-2xl">
          {PAIRINGS.length} pairings published. one ledger. searchable.
        </p>

        <div className="mt-16">
          <ArchiveSearch pairings={PAIRINGS} />
        </div>
      </article>

      <Footer />
    </>
  );
}
