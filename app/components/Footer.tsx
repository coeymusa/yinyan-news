import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 border-t border-ink/15 bg-paper-deep">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
              colophon
            </div>
            <p className="mt-3 font-serif text-base italic leading-relaxed text-ink/75">
              instrument serif · jetbrains mono · geist. paired daily by hand.
              built in the open by{" "}
              <a
                href="https://coreyscodecave.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:text-blood hover:underline"
              >
                corey musa
              </a>
              .
            </p>
          </div>

          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
              elsewhere in the family
            </div>
            <ul className="mt-3 space-y-2 font-serif text-base italic text-ink/75">
              <li>
                <a
                  href="https://whatisyourconcern.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:text-blood hover:underline"
                >
                  whatisyourconcern.com
                </a>
                <span className="text-ink/40"> — what people are afraid of</span>
              </li>
              <li>
                <a
                  href="https://getmooncake.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:text-blood hover:underline"
                >
                  getmooncake.com
                </a>
                <span className="text-ink/40"> — a quiet space to talk</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
              the rule
            </div>
            <p className="mt-3 font-serif text-base italic leading-relaxed text-ink/75">
              for every hard headline, an equal-weight one that's hopeful.
              we will not break the rule.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
              <Link href="/manifesto" className="hover:text-blood">
                manifesto ↗
              </Link>
              <Link href="/editor" className="hover:text-blood">
                editor ↗
              </Link>
              <Link href="/about" className="hover:text-blood">
                about ↗
              </Link>
              <Link href="/archive" className="hover:text-blood">
                archive ↗
              </Link>
              <Link href="/stats" className="hover:text-blood">
                stats ↗
              </Link>
              <Link href="/random" className="hover:text-blood">
                stumble ↗
              </Link>
              <a href="/rss.xml" className="hover:text-blood">
                rss ↗
              </a>
            </div>
          </div>
        </div>

        {/* quiet mooncake aside — only-if-it-resonated voice. lives at
            the very end so it never interrupts the editorial flow. */}
        <p className="mt-14 max-w-2xl font-serif text-base italic leading-relaxed text-ink/55">
          if any of these pairings stayed with you, you can keep talking at{" "}
          <a
            href="https://getmooncake.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink/75 underline-offset-4 hover:text-blood hover:underline"
          >
            getmooncake.com
          </a>
          {" "}— a quiet space for the conversations the news leaves you with.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/45">
          <span>vol. I · the ledger of {year}</span>
          <span>© yinyan.news · {year}</span>
        </div>
      </div>
    </footer>
  );
}
