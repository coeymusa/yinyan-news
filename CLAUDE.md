# yinyan.news

Editorial-paired news. For every hard headline in the world, an
equal-weight one that's hopeful. Curated, slow, deliberately small.

This is part of Corey Musa's `coreyscodecave.com` family — sister
sites: `whatisyourconcern.com`, `getmooncake.com`. Voice and visual
language should feel related (italic serif, lowercase headlines,
editorial-dystopia restraint) but distinct. yinyan.news is **not**
about anonymity or community — it's about *curation*. The editor
voice is present. The site speaks.

## Stack

- Next.js 16, App Router, React 19, TypeScript
- Tailwind v4 (CSS-first `@theme` config in `app/globals.css`)
- Motion (Framer Motion) for restrained transitions
- Pairings live as TS data in `app/lib/pairings.ts` for now (single-file
  editorial workflow). Migrate to a CMS or Supabase only when there
  are >100 pairings or >1 editor.
- Newsletter ("the dispatch") collects to Supabase if env is set,
  otherwise no-ops gracefully.
- Hosted on Vercel.

## Conventions

- Lowercase prose throughout the UI. Headlines included.
- Two halves of every pairing must be **equally weighted** — same
  word count band (within ~30%), same emotional intensity, same
  visual room. The editorial rule is the product. Don't give the
  hopeful side smaller cards or a footnote treatment.
- Hard side = ink palette (deep blacks, blood accent).
- Hopeful side = paper palette (cream / amber accent).
- Mono caption labels use § numbering (§ 01 — the ledger, etc.) to
  echo the WIYC family.
- No em-dashes in editorial copy. Use commas, en-dashes, or rewrite.
- Dates display as "DD month YYYY" (e.g., "01 may 2026"), lowercase.
- Permalinks use `/[slug]` where slug is YYYYMMDD-keyword.

## Don't

- Don't add an "all hopeful" or "all hard" view. The pairing IS the
  product. Filtering breaks it.
- Don't allow user comments. The site speaks. Readers listen, share,
  subscribe.
- Don't add ads, sponsorships, or affiliate links. The dispatch is
  the only commercial surface eventually allowed.
