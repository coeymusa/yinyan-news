import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PairingCard from "../../components/PairingCard";
import { BreadcrumbSchema } from "../../components/StructuredData";
import {
  PAIRINGS,
  pairingsByTopic,
  TOPIC_LABEL,
  type PairingTopic,
} from "../../lib/pairings";

const TOPICS: PairingTopic[] = [
  "climate","war","democracy","economy","ai","health",
  "science","culture","rights","other",
];

export function generateStaticParams() {
  return TOPICS.map((topic) => ({ topic }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  if (!TOPICS.includes(topic as PairingTopic)) return { title: "not found" };
  const label = TOPIC_LABEL[topic as PairingTopic];
  return {
    title: `${label} — yinyan.news`,
    description: `every paired pairing on ${label}. for every hard headline, an equal-weight one that's hopeful.`,
    alternates: { canonical: `https://yinyan.news/topic/${topic}` },
    openGraph: {
      title: `${label} on yinyan.news`,
      description: `paired headlines from the ${label} ledger.`,
      url: `https://yinyan.news/topic/${topic}`,
      type: "website",
    },
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  if (!TOPICS.includes(topic as PairingTopic)) notFound();
  const t = topic as PairingTopic;
  const pairings = pairingsByTopic(t);
  const label = TOPIC_LABEL[t];

  return (
    <>
      <Header />
      <BreadcrumbSchema
        trail={[
          { name: "yinyan.news", url: "https://yinyan.news" },
          { name: "archive", url: "https://yinyan.news/archive" },
          { name: label, url: `https://yinyan.news/topic/${t}` },
        ]}
      />

      <article className="bg-paper">
        <section className="border-b border-ink/15">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
              topic
            </div>
            <h1 className="mt-4 font-serif text-5xl italic leading-[1.05] text-ink sm:text-7xl">
              {label}.
            </h1>
            <p className="mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-ink/65 sm:text-2xl">
              {pairings.length} pairing{pairings.length === 1 ? "" : "s"} on
              this topic. for every hard headline,{" "}
              <span className="text-amber">an equal-weight one that's hopeful</span>.
            </p>
          </div>
        </section>

        {pairings.length > 0 ? (
          <section>
            <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
              <div className="space-y-12">
                {pairings.map((p) => (
                  <PairingCard key={p.slug} pairing={p} variant="feed" />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="mx-auto max-w-3xl px-5 py-32 text-center sm:px-8">
            <p className="font-serif text-3xl italic leading-snug text-ink/65">
              no pairings on this topic yet — a hopeful equal hasn't been
              found for the day's hard headline. come back soon.
            </p>
          </section>
        )}
      </article>

      <Footer />
    </>
  );
}

void PAIRINGS;
