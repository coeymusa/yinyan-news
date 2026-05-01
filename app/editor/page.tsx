import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SITE = "https://yinyan.news";
const PERSON_ID = `${SITE}/editor#corey`;

export const metadata: Metadata = {
  title: "the editor",
  description:
    "yinyan.news is curated by a single named human, by hand. corey musa, ex-fintech, builder of small quiet things on the internet.",
  alternates: { canonical: `${SITE}/editor` },
};

// Person JSON-LD — the single most important E-E-A-T signal a one-person
// publication can ship. Google News reviewers look for: real name, real
// photo or avatar, verifiable links, accountability for what's published.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Corey Musa",
  jobTitle: "Editor",
  description:
    "Editor and curator of yinyan.news. Builds small, quiet things on the internet, including whatisyourconcern.com and getmooncake.com.",
  url: "https://coreyscodecave.com",
  image: "https://coreyscodecave.com/avatar.png",
  worksFor: {
    "@type": "NewsMediaOrganization",
    name: "yinyan.news",
    url: SITE,
  },
  sameAs: [
    "https://coreyscodecave.com",
    "https://github.com/coeymusa",
    "https://whatisyourconcern.com",
    "https://getmooncake.com",
  ],
};

export default function EditorPage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
        }}
      />

      <article className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
          the editor
        </div>
        <h1 className="mt-6 font-serif text-5xl italic leading-[1.05] text-ink sm:text-7xl">
          one human, by hand.
        </h1>

        <div className="mt-12 space-y-8 font-serif text-xl leading-relaxed text-ink/85 sm:text-2xl">
          <p>
            yinyan.news is curated by{" "}
            <a
              href="https://coreyscodecave.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:text-blood hover:underline"
            >
              corey musa
            </a>
            . that's it. no editorial board, no hidden algorithm, no rotating
            staff.
          </p>
          <p>
            every pairing on this site is read, paired, and approved by one
            person. the rule of equal weight is enforced by hand. the absence
            of a pairing on a given day is also a decision made by hand.
          </p>
          <p>
            corey is a software builder, formerly at ubs and credit suisse,
            now full-time on small, quiet things on the internet — sister
            sites{" "}
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
        </div>

        <div className="mt-16 grid gap-10 border-t border-ink/15 pt-10 sm:grid-cols-2">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
              accountability
            </div>
            <p className="mt-3 font-serif text-base italic leading-relaxed text-ink/75">
              corrections and complaints come to the editor's inbox at{" "}
              <em>editor at yinyan.news</em>. corrections are published with
              the same weight as the original.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
              transparency
            </div>
            <p className="mt-3 font-serif text-base italic leading-relaxed text-ink/75">
              the source code for this site is public on{" "}
              <a
                href="https://github.com/coeymusa/yinyan-news"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:text-blood hover:underline"
              >
                github
              </a>
              . every pairing's git history is the audit trail.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-ink/15 pt-10 sm:grid-cols-2">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
              elsewhere
            </div>
            <ul className="mt-3 space-y-2 font-serif text-base italic text-ink/85">
              <li>
                <a
                  href="https://coreyscodecave.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:text-blood hover:underline"
                >
                  coreyscodecave.com
                </a>{" "}
                <span className="text-ink/40">— the workshop</span>
              </li>
              <li>
                <a
                  href="https://github.com/coeymusa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:text-blood hover:underline"
                >
                  github.com/coeymusa
                </a>{" "}
                <span className="text-ink/40">— the receipts</span>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
              the rule
            </div>
            <p className="mt-3 font-serif text-base italic leading-relaxed text-ink/75">
              for every hard headline, an equal-weight one that's hopeful.
              read{" "}
              <a
                href="/manifesto"
                className="underline-offset-4 hover:text-blood hover:underline"
              >
                the manifesto
              </a>
              .
            </p>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
