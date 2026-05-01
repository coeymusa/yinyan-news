// Curated lede copy for each topic. Used on /topic/[topic] landing
// pages — turns what would otherwise be empty hub pages into pages
// that capture topic-intent search queries (e.g. "balanced climate
// news"). Voice rules from CLAUDE.md apply: lowercase, no em-dashes,
// editorial.

import type { PairingTopic } from "./pairings";

export type TopicContent = {
  lede: string;          // 1-2 sentences shown under the H1
  manifesto: string;     // longer paragraph, what the topic means here
};

export const TOPIC_CONTENT: Record<PairingTopic, TopicContent> = {
  climate: {
    lede: "the planet is warming. the response is also accelerating. neither story is allowed to stand alone here.",
    manifesto:
      "climate news has the longest gravity well in journalism. heat records, fires, floods. the same year that gives us those gives us the largest single-year jump in solar capacity in history, the smallest antarctic ozone hole since 1992, and the lowest amazon deforestation in over a decade. both ledgers, in the same week, on the same site.",
  },
  war: {
    lede: "war is happening. so are ceasefire offers, prisoner exchanges, and aid corridors reopening. we report both.",
    manifesto:
      "the hard side of war is loud. the hopeful side is patient and quiet: a corridor reopens, a swap is negotiated, a sunday morning passes without sirens. yinyan.news refuses to file the first without the second.",
  },
  democracy: {
    lede: "press freedom is at a 25-year low. it is also at a 36-place high in one country. yinyan.news files both, on the same day.",
    manifesto:
      "democracy stories travel in pairs by their nature. an institution erodes here, a long-shuttered newsroom reopens there. we publish the bilateral truth.",
  },
  economy: {
    lede: "the economy is two stories at once: who can no longer afford something, and who can suddenly access something. we file both.",
    manifesto:
      "every quarter the headline reading of the economy is reductive. yinyan.news pairs the macro hard-news (debt, inflation, layoffs) against the micro hopeful (a new community fund, a national living-wage threshold, a programme that worked).",
  },
  ai: {
    lede: "ai displaces a workforce here. it enters a clinical trial there. same week. same technology. yinyan.news files both.",
    manifesto:
      "the ai story is the clearest case for the editorial rule. one tool, two ledgers. the deepfake that reaches eighty million views and the ai-designed drug that reaches phase one, each with their own gravity.",
  },
  health: {
    lede: "a public-health setback meets a public-health gain. we publish them adjacent so neither stands alone.",
    manifesto:
      "health news in the news cycle skews to the dramatic — a new variant, a hospital under strain. we pair every dramatic hard story with the unglamorous, slow-build hopeful one: a vaccine rollout, a community clinic reopened, a maternal death rate at a record low.",
  },
  science: {
    lede: "two scientific stories every time: what the lab discovered that worries us, and what it discovered that we can do something about.",
    manifesto:
      "science gets covered as a contradiction. we treat it as a complementarity. a genetic risk identified pairs with a therapy approved. a ground-water depletion mapped pairs with a desalination breakthrough. always two halves.",
  },
  culture: {
    lede: "culture is a record of what people are losing and what people are making. we file both, with equal room.",
    manifesto:
      "the culture beat sees a language die in one country and a long-dead one revived in another. it watches a public square close and a new one open. yinyan.news refuses to file just the closing.",
  },
  rights: {
    lede: "a rights setback, a rights win — both will be in the same week. we will report both.",
    manifesto:
      "rights stories are how we measure the moral velocity of a society. they almost never move in one direction at the same time across the world. yinyan.news files both vectors.",
  },
  other: {
    lede: "everything else. the stories that don't fit a category but still need a counterweight.",
    manifesto:
      "the rule is the rule no matter the topic. if a story is heavy, we find its hopeful equivalent before publishing.",
  },
};
