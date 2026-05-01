import Link from "next/link";

// Minimal, editorial header. The "yinyan" wordmark itself encodes the
// product: the y-i-n in blood, the y-a-n in amber, with a thin rule
// between them. Nav stays terse (3 links + dispatch CTA).
export default function Header() {
  return (
    <header className="border-b border-ink/10 bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 sm:py-6">
        <Link href="/" className="group flex items-center gap-3">
          <Wordmark />
        </Link>

        <nav className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/65 sm:gap-8">
          <Link href="/archive" className="transition hover:text-blood">
            archive
          </Link>
          <Link href="/manifesto" className="transition hover:text-blood">
            manifesto
          </Link>
          <Link href="/about" className="hidden transition hover:text-blood sm:inline">
            about
          </Link>
          <Link
            href="#dispatch"
            className="border border-ink/30 bg-ink px-3 py-1.5 text-paper transition hover:border-blood hover:bg-blood"
          >
            dispatch ↗
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Wordmark() {
  return (
    <div className="flex items-baseline gap-1 font-serif text-2xl italic leading-none sm:text-3xl">
      <span className="text-blood">yin</span>
      <span className="text-ink/30">·</span>
      <span className="text-amber">yan</span>
      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink/40 ml-2">
        .news
      </span>
    </div>
  );
}
