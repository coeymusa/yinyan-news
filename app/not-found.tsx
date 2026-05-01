import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <section className="mx-auto max-w-3xl px-5 py-32 text-center sm:px-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
          404 · not in the ledger
        </div>
        <h1 className="mt-6 font-serif text-6xl italic leading-[1.05] text-ink sm:text-7xl">
          we couldn't pair this one.
        </h1>
        <p className="mt-8 font-serif text-xl italic leading-relaxed text-ink/65 sm:text-2xl">
          the page you're looking for either never had a hopeful equal,
          or never existed at all.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="border border-ink/30 bg-ink px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-paper transition hover:border-blood hover:bg-blood"
          >
            ← today's pairing
          </Link>
          <Link
            href="/random"
            className="border border-ink/30 bg-bone px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink transition hover:border-blood hover:text-blood"
          >
            stumble on a pairing →
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
