// AI Gateway call for the daily auto-pair. Uses the Vercel AI Gateway
// REST shape directly — no SDK dependency — so this stays a single
// file and works the same in local dev (with AI_GATEWAY_API_KEY) and
// on Vercel (with the platform-injected OIDC token).
//
// Returns a structured Pairing object or throws. The cron handles the
// throw by skipping today rather than publishing junk.

import type { Pairing, PairingTopic } from "./pairings";
import type { Item } from "./rss";

type Candidate = Pick<Item, "title" | "link" | "description" | "publication">;

const TOPIC_VALUES: PairingTopic[] = [
  "climate", "war", "democracy", "economy", "ai",
  "health", "science", "culture", "rights", "other",
];

const SYSTEM = `You are the editor of yinyan.news, a news site that pairs every hard headline with an equal-weight hopeful one.

Voice rules — non-negotiable:
- Lowercase prose throughout. Lowercase headlines. Lowercase body. Even proper nouns at sentence start.
- No em-dashes (—) anywhere. Use commas, en-dashes, or rewrite.
- Each half is 2 to 4 sentences. Both halves within 30% of each other in word count.
- Same emotional intensity on both sides. The hopeful side is not a footnote.
- Every claim grounded in the source provided. Do not invent numbers, dates, names.
- Headlines end with a period.
- Body uses concrete numbers and named places when the source supports it.

Output strictly valid JSON matching the schema. No prose outside the JSON. No markdown fences.`;

function buildUserPrompt(hard: Candidate[], hopeful: Candidate[]): string {
  const today = new Date().toISOString().slice(0, 10);
  const fmt = (c: Candidate) =>
    `- [${c.publication}] ${c.title}\n  url: ${c.link}\n  ${c.description.slice(0, 280)}`;

  return `today is ${today}.

choose ONE hard headline and ONE hopeful headline from the candidates below. they do not need to be on the same topic, but they should be the two stories you most want sitting beside each other today. preserve the publication and url exactly from the candidate you choose.

HARD CANDIDATES:
${hard.slice(0, 25).map(fmt).join("\n")}

HOPEFUL CANDIDATES:
${hopeful.slice(0, 25).map(fmt).join("\n")}

return JSON with this exact shape:
{
  "slug": "${today.replace(/-/g, "")}-<one-word-keyword>",
  "date": "${today}",
  "topic": "<one of: ${TOPIC_VALUES.join(", ")}>",
  "hard": {
    "headline": "<lowercase, ends with period>",
    "body": "<2-4 sentences, lowercase, grounded in the source>",
    "source": { "name": "<publication>", "url": "<exact url from candidate>" },
    "country": "<ISO-2 like US, GB, IN, or 'global'>"
  },
  "hopeful": {
    "headline": "<lowercase, ends with period>",
    "body": "<2-4 sentences, lowercase, grounded in the source>",
    "source": { "name": "<publication>", "url": "<exact url from candidate>" },
    "country": "<ISO-2 or 'global'>"
  },
  "editor_note": "<optional one-line, lowercase, the editorial framing>"
}`;
}

type GatewayResp = {
  choices?: Array<{ message?: { content?: string } }>;
  error?: { message?: string };
};

async function callGateway(systemMsg: string, userMsg: string): Promise<string> {
  const key = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;
  if (!key) throw new Error("AI_GATEWAY_API_KEY (or VERCEL_OIDC_TOKEN on Vercel) is required");

  // OpenAI-compatible chat completions endpoint on the AI Gateway.
  // Model is configurable via AI_MODEL; default to a capable model.
  const model = process.env.AI_MODEL || "anthropic/claude-sonnet-4-6";
  const r = await fetch("https://ai-gateway.vercel.sh/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemMsg },
        { role: "user", content: userMsg },
      ],
    }),
    signal: AbortSignal.timeout(60_000),
  });

  if (!r.ok) {
    const text = await r.text().catch(() => "");
    throw new Error(`gateway ${r.status}: ${text.slice(0, 300)}`);
  }
  const data = (await r.json()) as GatewayResp;
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error(`gateway returned empty content: ${JSON.stringify(data).slice(0, 300)}`);
  return content;
}

function validate(raw: unknown): Pairing {
  if (!raw || typeof raw !== "object") throw new Error("not an object");
  const p = raw as Record<string, unknown>;
  const reqStr = (k: string): string => {
    const v = p[k];
    if (typeof v !== "string" || !v) throw new Error(`missing ${k}`);
    return v;
  };
  const reqHalf = (k: "hard" | "hopeful") => {
    const v = p[k];
    if (!v || typeof v !== "object") throw new Error(`missing ${k}`);
    const h = v as Record<string, unknown>;
    const src = h.source as Record<string, unknown> | undefined;
    if (!src || typeof src.name !== "string" || typeof src.url !== "string") {
      throw new Error(`missing ${k}.source`);
    }
    if (typeof h.headline !== "string" || typeof h.body !== "string") {
      throw new Error(`missing ${k}.headline or body`);
    }
    if (h.headline.includes("—") || h.body.includes("—")) {
      throw new Error(`em-dash in ${k}`);
    }
    return {
      headline: h.headline,
      body: h.body,
      source: { name: src.name, url: src.url },
      country: typeof h.country === "string" ? h.country : undefined,
    };
  };
  const slug = reqStr("slug");
  const date = reqStr("date");
  const topic = reqStr("topic") as PairingTopic;
  if (!TOPIC_VALUES.includes(topic)) throw new Error(`bad topic ${topic}`);
  const hard = reqHalf("hard");
  const hopeful = reqHalf("hopeful");
  // crude word-balance check (within 50% to stay forgiving)
  const wHard = hard.body.split(/\s+/).length;
  const wHope = hopeful.body.split(/\s+/).length;
  const ratio = Math.max(wHard, wHope) / Math.max(1, Math.min(wHard, wHope));
  if (ratio > 1.6) throw new Error(`word imbalance ${wHard}:${wHope}`);

  return {
    slug,
    date,
    topic,
    hard,
    hopeful,
    editor_note: typeof p.editor_note === "string" ? p.editor_note : undefined,
  };
}

export async function generatePairing(
  hard: Candidate[],
  hopeful: Candidate[],
): Promise<Pairing> {
  if (hard.length === 0 || hopeful.length === 0) {
    throw new Error("no candidates");
  }
  const content = await callGateway(SYSTEM, buildUserPrompt(hard, hopeful));
  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    // try to find a JSON object inside the content
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) throw new Error(`non-JSON gateway output: ${content.slice(0, 200)}`);
    parsed = JSON.parse(match[0]);
  }
  return validate(parsed);
}
