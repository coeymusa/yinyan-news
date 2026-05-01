import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "embed yinyan.news",
  description:
    "embed today's pairing in your blog, newsletter, or substack. one line of html. always fresh.",
  alternates: { canonical: "https://yinyan.news/embed" },
};

export default function EmbedDocsPage() {
  return (
    <>
      <Header />

      <article className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
          embed
        </div>
        <h1 className="mt-6 font-serif text-5xl italic leading-[1.05] text-ink sm:text-7xl">
          drop the world,
          <br />
          in pairs,
          <br />
          into your page.
        </h1>

        <p className="mt-8 max-w-2xl font-serif text-xl italic leading-relaxed text-ink/65 sm:text-2xl">
          one line of html, always fresh. great for substack, ghost,
          wordpress, notion, any blog that takes raw embeds.
        </p>

        {/* today's pairing — auto-rotating */}
        <section className="mt-16 border-t border-ink/15 pt-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
            today's pairing — always current
          </div>
          <h2 className="mt-4 font-serif text-3xl italic leading-snug text-ink sm:text-4xl">
            paste this. it stays fresh.
          </h2>
          <pre className="mt-6 overflow-x-auto border border-ink/20 bg-bone p-4 font-mono text-xs leading-relaxed text-ink">
            <code>{`<iframe
  src="https://yinyan.news/embed/today"
  width="100%"
  height="380"
  frameborder="0"
  style="border: 1px solid #d6cba2; max-width: 720px;"
  title="today's pairing — yinyan.news"
></iframe>`}</code>
          </pre>

          {/* live preview */}
          <div className="mt-8">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
              live preview
            </div>
            <iframe
              src="/embed/today"
              width="100%"
              height={380}
              style={{
                border: "1px solid var(--color-ink, #0a0908)",
                borderColor: "rgba(10, 9, 8, 0.15)",
                maxWidth: 720,
              }}
              title="today's pairing"
            />
          </div>
        </section>

        {/* specific pairing */}
        <section className="mt-20 border-t border-ink/15 pt-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
            a specific pairing
          </div>
          <h2 className="mt-4 font-serif text-3xl italic leading-snug text-ink sm:text-4xl">
            a pairing that struck you, frozen in place.
          </h2>
          <p className="mt-4 max-w-prose font-sans text-base leading-relaxed text-ink/70">
            grab the slug from any pairing url. example: the press freedom
            pairing lives at <code className="text-ink/80">/20260501-pressfreedom-syria</code>.
          </p>
          <pre className="mt-6 overflow-x-auto border border-ink/20 bg-bone p-4 font-mono text-xs leading-relaxed text-ink">
            <code>{`<iframe
  src="https://yinyan.news/embed/20260501-pressfreedom-syria"
  width="100%"
  height="380"
  frameborder="0"
  style="border: 1px solid #d6cba2; max-width: 720px;"
  title="yinyan.news — press freedom pairing"
></iframe>`}</code>
          </pre>
        </section>

        {/* api */}
        <section className="mt-20 border-t border-ink/15 pt-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
            json api
          </div>
          <h2 className="mt-4 font-serif text-3xl italic leading-snug text-ink sm:text-4xl">
            for developers, the raw data.
          </h2>
          <p className="mt-4 max-w-prose font-sans text-base leading-relaxed text-ink/70">
            two read endpoints, no auth, public, generously cached:
          </p>
          <ul className="mt-6 space-y-3 font-mono text-sm text-ink">
            <li>
              <a
                href="/api/today"
                className="text-blood underline-offset-4 hover:underline"
              >
                GET /api/today
              </a>{" "}
              <span className="text-ink/55">— today's pairing</span>
            </li>
            <li>
              <a
                href="/api/pairings"
                className="text-blood underline-offset-4 hover:underline"
              >
                GET /api/pairings
              </a>{" "}
              <span className="text-ink/55">— full archive</span>
            </li>
            <li>
              <a
                href="/rss.xml"
                className="text-blood underline-offset-4 hover:underline"
              >
                GET /rss.xml
              </a>{" "}
              <span className="text-ink/55">— rss</span>
            </li>
          </ul>
        </section>

        {/* terms */}
        <section className="mt-20 border-t border-ink/15 pt-10 font-serif text-base italic leading-relaxed text-ink/70">
          <p>
            free to embed. one ask: don't strip the link back. each
            embedded pairing carries a small "via yinyan.news" footer so
            readers can find their way home. respect the editorial rule.
          </p>
        </section>
      </article>

      <Footer />
    </>
  );
}
