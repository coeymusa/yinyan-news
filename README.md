# yinyan.news

> for every hard headline in the world, an equal-weight one that's hopeful.

A slow, paired ledger of the world. One pairing a day, sometimes none.
Part of the [coreyscodecave.com](https://coreyscodecave.com) family of
small, quiet sites — sister to
[getmooncake.com](https://getmooncake.com).

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind v4 (CSS-first `@theme` config)
- Static rendering for all pairing pages. Content merges from two
  sources: hand-curated TS data in `app/lib/pairings.ts` and an
  auto-generated JSON archive in `app/lib/generated-pairings.json`.
- Daily auto-pair cron pulls real RSS, drafts a pairing via Vercel AI
  Gateway, commits to GitHub, Vercel rebuilds. No CMS, no DB.
- Optional Supabase persistence for the dispatch newsletter; falls back
  to a no-op when env is unset, so dev and previews don't break.
- Hosted on Vercel.

## Editorial workflow

To add a pairing:

1. Open `app/lib/pairings.ts`.
2. Paste a new object at the **top** of `PAIRINGS`.
3. Slug format: `YYYYMMDD-keyword`.
4. Both halves should be roughly the same word count (within 30%) and
   the same emotional intensity.
5. No em-dashes anywhere in the editorial copy.
6. Push. Vercel rebuilds in ~30s.

The rule (see `app/manifesto/page.tsx`):

> for every hard headline we publish, we publish an equal-weight one
> that is hopeful. the same word count. the same prominence. the same
> gravity. always.

If you can't find a hopeful equal-weight pairing for a hard story, **do
not publish that day**. The rule is the product.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run type         # tsc --noEmit
```

## Deploying

Push `main`. Vercel autodeploys.

Optional env (for dispatch persistence):

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
IP_HASH_SALT=<some long random string>
```

Without these set, `/api/dispatch` returns ok without persisting — the
form works in dev but doesn't store emails. Add the env on Vercel to
turn on real subscriber capture, then run `supabase/dispatch.sql` in
your Supabase SQL editor.

## Auto-pair (the site grows itself)

A daily cron at `/api/cron/auto-pair` pulls RSS from reputable hard
and hopeful sources, asks the AI Gateway for one structured pairing in
the editorial voice, and commits it to `app/lib/generated-pairings.json`
via the GitHub API. The commit triggers a Vercel rebuild, which
republishes the site with the new pairing on top.

The cron is idempotent: if today already has a pairing in either
archive, it skips. If candidates are thin, it skips. If the AI output
fails voice/word-balance validation, it skips. Better a quiet day than
a junk pairing.

Required env on Vercel for auto-pair:

```
CRON_SECRET=<long random string>
AI_GATEWAY_API_KEY=<from Vercel AI Gateway, or auto-injected on Vercel>
GITHUB_TOKEN=<fine-grained PAT, contents:write on this repo>
GITHUB_REPO=coeymusa/yinyan-news
GITHUB_BRANCH=main
AI_MODEL=anthropic/claude-sonnet-4-6  # optional override
```

Manual probe (replace `<secret>`):

```
curl "https://yinyan.news/api/cron/auto-pair?force=<secret>&dry=1"
```

`dry=1` runs the full pipeline but does not commit — useful for
sanity-checking model output without burning a slot for the day.

To pause auto-pair, remove the `auto-pair` entry from `vercel.json`
crons and redeploy. The curated `CURATED` archive in
`app/lib/pairings.ts` is untouched; the editor can always step in.

## What's in the box

- `/` — masthead, today's hero pairing, timeline of recent pairings,
  dispatch + manifesto teaser
- `/[slug]` — full-page pairing with ed. note, prev/next nav, dispatch
  prompt
- `/manifesto` — the rule
- `/about` — who, how, corrections policy
- `/archive` — every pairing, grouped by month
- `/api/pairings` — JSON feed
- `/rss.xml` — RSS feed (per-pairing)
- `/sitemap.xml`, `/robots.txt` — built by Next.js metadata routes
- Default OG image (split hard/hopeful) at `/opengraph-image`

## Future, when it's earned

- Per-pairing OG images
- Topic landing pages (`/topic/climate` etc.)
- Reader corrections inbox
- Sponsorship... no, never. The rule is the product.
