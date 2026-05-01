# yinyan.news

> for every hard headline in the world, an equal-weight one that's hopeful.

A slow, paired ledger of the world. Curated by hand, one pairing a day,
sometimes none. Part of the
[coreyscodecave.com](https://coreyscodecave.com) family of small,
quiet sites — sister to
[whatisyourconcern.com](https://whatisyourconcern.com) and
[getmooncake.com](https://getmooncake.com).

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind v4 (CSS-first `@theme` config)
- Static rendering for all pairing pages — content lives as TS data in
  `app/lib/pairings.ts`. No CMS until there's a real reason for one.
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
