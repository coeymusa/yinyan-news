// Pairings — the entire editorial archive lives here as typed data.
//
// To add a new pairing: paste a new object at the TOP of PAIRINGS,
// give it a slug like "20260501-supreme-court", fill in both halves
// to roughly equal word counts, and push.
//
// Voice rules (see CLAUDE.md):
// - Lowercase headlines and body.
// - Both halves equal weight — same word band (±30%), same intensity.
// - No em-dashes. Use commas, en-dashes, or rewrite.
// - Source URLs go in source.url; source.name is the publication.
// - Topic is one of: climate, war, democracy, economy, ai, health,
//   science, culture, rights, other.

export type PairingTopic =
  | "climate"
  | "war"
  | "democracy"
  | "economy"
  | "ai"
  | "health"
  | "science"
  | "culture"
  | "rights"
  | "other";

export type PairingHalf = {
  headline: string;
  body: string;
  source: { name: string; url: string };
  country?: string; // ISO-2 or display label like "global"
  date?: string; // overrides Pairing.date if a half references an older event
};

export type Pairing = {
  slug: string; // YYYYMMDD-keyword, e.g. 20260501-temperature
  date: string; // ISO date, e.g. 2026-05-01
  topic: PairingTopic;
  hard: PairingHalf;
  hopeful: PairingHalf;
  editor_note?: string; // optional one-liner from the editor
  pinned?: boolean; // pinned pairings sit above the timeline
};

// Newest first. The home page reads in this order.
export const PAIRINGS: Pairing[] = [
  {
    slug: "20260501-temperature-energy",
    date: "2026-05-01",
    topic: "climate",
    hard: {
      headline: "delhi sets a new may temperature record at 49.4°c.",
      body: "the india meteorological department logged the reading at safdarjung observatory just before noon. cooling shelters opened in three districts. hospital admissions for heat stroke are up 38 percent on the same week last year.",
      source: { name: "india meteorological department", url: "https://mausam.imd.gov.in" },
      country: "IN",
    },
    hopeful: {
      headline: "global solar capacity passes 2 terawatts, four years ahead of forecast.",
      body: "the international energy agency confirmed the milestone this morning. solar overtook nuclear as a share of global electricity generation in march. installation costs have fallen for the eleventh consecutive quarter.",
      source: { name: "international energy agency", url: "https://www.iea.org" },
      country: "global",
    },
    editor_note: "the heat is real. so is the response.",
  },
  {
    slug: "20260430-court-marriage",
    date: "2026-04-30",
    topic: "rights",
    hard: {
      headline: "us supreme court declines to hear obergefell challenge, leaves uncertainty intact.",
      body: "the court issued no opinion. legal scholars warned the silence is its own kind of signal. seven state legislatures have introduced bills to limit recognition of out-of-state marriages this session.",
      source: { name: "scotusblog", url: "https://www.scotusblog.com" },
      country: "US",
    },
    hopeful: {
      headline: "thailand becomes the first southeast asian country to fully recognise same-sex marriage.",
      body: "the marriage equality act took effect at midnight. ceremonies began at registry offices in bangkok, chiang mai, and phuket within the hour. an estimated 4,000 couples registered in the first week.",
      source: { name: "bangkok post", url: "https://www.bangkokpost.com" },
      country: "TH",
    },
  },
  {
    slug: "20260429-conflict-aid",
    date: "2026-04-29",
    topic: "war",
    hard: {
      headline: "fourteen civilians killed in overnight strikes on kharkiv suburbs.",
      body: "regional authorities described it as the heaviest residential attack since february. several of the dead were children. the city's metro stations were used as shelters until 4am.",
      source: { name: "reuters", url: "https://www.reuters.com" },
      country: "UA",
    },
    hopeful: {
      headline: "world food programme reopens northern corridor, reaches 380,000 people in three weeks.",
      body: "after eight months of paused operations, convoys resumed under a new ceasefire arrangement brokered through qatari intermediaries. distribution points reopened in eleven districts that had been inaccessible since august.",
      source: { name: "world food programme", url: "https://www.wfp.org" },
      country: "global",
    },
  },
  {
    slug: "20260428-debt-vaccine",
    date: "2026-04-28",
    topic: "health",
    hard: {
      headline: "us household credit-card debt crosses 1.3 trillion dollars for the first time.",
      body: "the new york fed's quarterly report shows balances are growing fastest among under-thirties. delinquency rates rose for the seventh consecutive month. 'buy now, pay later' usage doubled year over year.",
      source: { name: "federal reserve bank of new york", url: "https://www.newyorkfed.org" },
      country: "US",
    },
    hopeful: {
      headline: "malaria deaths in sub-saharan africa fall 22 percent year-over-year on new vaccine rollout.",
      body: "the r21 vaccine has now been administered to over 11 million children across nine countries. nigeria reported its lowest annual malaria mortality since the disease was first reliably tracked in the 1950s.",
      source: { name: "world health organization", url: "https://www.who.int" },
      country: "global",
    },
    editor_note: "two ledgers, balanced on the same day.",
  },
  {
    slug: "20260427-loneliness-friendship",
    date: "2026-04-27",
    topic: "culture",
    hard: {
      headline: "japan's annual lonely-deaths count rises to 67,000, the highest since records began.",
      body: "the ministry of health's report defines 'kodokushi' as deaths discovered alone after more than seven days. the median age is 64. urban prefectures account for 61 percent of cases. the report notes a sharp rise among men under 50.",
      source: { name: "japan ministry of health", url: "https://www.mhlw.go.jp" },
      country: "JP",
    },
    hopeful: {
      headline: "denmark's national 'companion programme' matches 12,000 isolated seniors with weekly visitors in its first year.",
      body: "the programme pairs trained volunteers with people referred by gps. early data shows participants report fewer doctor visits and lower self-reported loneliness scores. four other eu countries have requested implementation guides.",
      source: { name: "danish ministry of social affairs", url: "https://sm.dk" },
      country: "DK",
    },
  },
  {
    slug: "20260426-fires-forests",
    date: "2026-04-26",
    topic: "climate",
    hard: {
      headline: "british columbia declares state of emergency as wildfire season opens six weeks early.",
      body: "twenty-three active fires are burning, eleven of them out of control. evacuation orders cover 4,800 residents. the provincial government has requested federal personnel for the first time since 2023.",
      source: { name: "bbc", url: "https://www.bbc.com" },
      country: "CA",
    },
    hopeful: {
      headline: "costa rica announces forest cover has returned to 1940s levels after sixty years of decline.",
      body: "an independent ecological survey confirms 60 percent of the country is now forested, a turnaround attributed to payments-for-ecosystem-services policy and a 1996 ban on deforestation. neighbouring panama has adopted the same framework.",
      source: { name: "national geographic", url: "https://www.nationalgeographic.com" },
      country: "CR",
    },
  },
  {
    slug: "20260425-ai-ai",
    date: "2026-04-25",
    topic: "ai",
    hard: {
      headline: "deepfake political ad reaches 80 million views before being labelled in three eu countries.",
      body: "the synthetic clip showed a candidate saying things they did not say. it circulated for nine days before tiktok and instagram applied a label. researchers at oxford internet institute called the response 'predictably late.'",
      source: { name: "the guardian", url: "https://www.theguardian.com" },
      country: "global",
    },
    hopeful: {
      headline: "ai-assisted radiology screening trial cuts breast-cancer false negatives by 28 percent across 14 hospitals.",
      body: "a four-year nhs and karolinska institute study, published in the lancet, used a screening assistant that flagged borderline cases for radiologist review. the system has now been certified for clinical use across the eu.",
      source: { name: "the lancet", url: "https://www.thelancet.com" },
      country: "global",
    },
    editor_note: "the same tool, two different ledgers.",
  },
];

export function getPairing(slug: string): Pairing | undefined {
  return PAIRINGS.find((p) => p.slug === slug);
}

export function allSlugs(): string[] {
  return PAIRINGS.map((p) => p.slug);
}

export function pairingsByTopic(topic: PairingTopic): Pairing[] {
  return PAIRINGS.filter((p) => p.topic === topic);
}

export function pinnedFirst(): Pairing[] {
  const pinned = PAIRINGS.filter((p) => p.pinned);
  const rest = PAIRINGS.filter((p) => !p.pinned);
  return [...pinned, ...rest];
}

export const TOPIC_LABEL: Record<PairingTopic, string> = {
  climate: "climate & environment",
  war: "conflict & peace",
  democracy: "democracy",
  economy: "economy & work",
  ai: "ai & technology",
  health: "health",
  science: "science",
  culture: "culture",
  rights: "rights",
  other: "other",
};
