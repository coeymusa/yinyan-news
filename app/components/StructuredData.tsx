// JSON-LD structured data emitters. Server components — no client JS.
//
// Google reads schema.org markup to surface us in News, Discover,
// rich snippets, and the knowledge graph. We emit:
//
// - NewsMediaOrganization (global, in layout)
// - WebSite with SearchAction (global, in layout)
// - NewsArticle per pairing (in [slug] page)
// - BreadcrumbList per non-home page

import type { Pairing } from "../lib/pairings";

const SITE = "https://yinyan.news";

function ldjson(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "yinyan.news",
    alternateName: "yinyan",
    url: SITE,
    logo: `${SITE}/icon.png`,
    description:
      "for every hard headline in the world, an equal-weight one that's hopeful. a slow, paired editorial ledger.",
    foundingDate: "2026-05-01",
    founder: {
      "@type": "Person",
      name: "Corey Musa",
      url: "https://coreyscodecave.com",
    },
    sameAs: [
      "https://coreyscodecave.com",
      "https://whatisyourconcern.com",
      "https://getmooncake.com",
      "https://github.com/coeymusa/yinyan-news",
    ],
    masthead: `${SITE}/about`,
    diversityPolicy: `${SITE}/manifesto`,
    ethicsPolicy: `${SITE}/manifesto`,
    correctionsPolicy: `${SITE}/about`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: ldjson(data) }}
    />
  );
}

export function WebsiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "yinyan.news",
    url: SITE,
    description:
      "for every hard headline, an equal-weight one that's hopeful.",
    publisher: { "@type": "NewsMediaOrganization", name: "yinyan.news" },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: ldjson(data) }}
    />
  );
}

export function NewsArticleSchema({ pairing }: { pairing: Pairing }) {
  const url = `${SITE}/${pairing.slug}`;
  const headline = `${pairing.hard.headline} / ${pairing.hopeful.headline}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: headline.slice(0, 110),
    alternativeHeadline: pairing.editor_note,
    description:
      `${pairing.hard.body} | ${pairing.hopeful.body}`.slice(0, 280),
    datePublished: pairing.date,
    dateModified: pairing.date,
    articleSection: pairing.topic,
    inLanguage: "en",
    image: [`${url}/opengraph-image`],
    author: {
      "@type": "Person",
      name: "Corey Musa",
      url: "https://coreyscodecave.com",
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: "yinyan.news",
      logo: { "@type": "ImageObject", url: `${SITE}/icon.png` },
    },
    citation: [
      {
        "@type": "CreativeWork",
        name: pairing.hard.source.name,
        url: pairing.hard.source.url,
      },
      {
        "@type": "CreativeWork",
        name: pairing.hopeful.source.name,
        url: pairing.hopeful.source.url,
      },
    ],
    isAccessibleForFree: true,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: ldjson(data) }}
    />
  );
}

export function ItemListSchema({
  name,
  items,
}: {
  name: string;
  items: { url: string; title: string; date: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: it.url,
      name: it.title,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: ldjson(data) }}
    />
  );
}

export function BreadcrumbSchema({
  trail,
}: {
  trail: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: ldjson(data) }}
    />
  );
}
