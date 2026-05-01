# draft a new pairing

This is the prompt to paste into Claude (or the agent of your choice)
each morning to generate a candidate pairing for yinyan.news.

The site lives or dies on cadence — one pairing a day keeps the news
sitemap fresh, the dispatch full, and Google News interested. Skipping
a day is fine (the manifesto allows it); skipping a week is not.

---

## Use this prompt

> You are doing editorial research for yinyan.news. Today is
> **{TODAY'S_DATE}**. Read `app/lib/pairings.ts` to see existing slugs
> and voice, then find me **one new pairing** sourced from real news
> within the last 7 days.
>
> The rule: for every hard headline, an equal-weight one that's
> hopeful. Same word count band (40-60 words on each side). Same
> emotional intensity. Same gravity. Lowercase prose, no em-dashes,
> no first person.
>
> Pick a topic from the enum: climate, war, democracy, economy, ai,
> health, science, culture, rights, other. Don't repeat the topic of
> yesterday's pairing.
>
> Use credible sources only: Reuters, AP, BBC, Guardian, NYT, AFP,
> WaPo, Bloomberg, FT, Al Jazeera, Kyiv Independent, ministerial
> press releases, WHO/UN/IEA/etc. Verify both source URLs resolve via
> WebFetch.
>
> Output a single TS object ready to paste at the **top** of the
> `PAIRINGS` array in `app/lib/pairings.ts`. Format exactly like the
> existing entries. Slug format: `YYYYMMDD-keyword`. Date format:
> `YYYY-MM-DD`.
>
> Reject yourself if: the hopeful side is weaker than the hard side;
> a body is &lt;35 or &gt;70 words; a headline ends with anything other
> than a period; a URL doesn't actually open.

---

## After it gives you the object

1. Paste at top of `PAIRINGS` array in `app/lib/pairings.ts`.
2. `npm run type` — quick typecheck.
3. `git add -A && git commit -m "content: $(slug from today)"`
4. `git push` — Vercel autodeploys in ~60s.
5. Check it live at `https://yinyan.news/<slug>`.

The site's news-sitemap.xml automatically picks up anything &lt;48h
old. Bing IndexNow ping (when wired) fires automatically. Google
News crawls the news-sitemap on its own cadence.

---

## When you skip a day

That's fine. The manifesto promises:

> "we will never run a day of only hard. we will never run a day of
> only hopeful. if we cannot find a hopeful equal in weight to the
> day's hard, we publish nothing."

A skipped day is *the rule being kept*, not a failure.
