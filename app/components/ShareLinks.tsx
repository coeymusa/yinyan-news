"use client";

import { useState } from "react";

type Tone = "dark" | "light";

// Per-pairing share buttons. The pairing's headlines come in as props
// so the share text is *about this specific pairing*, not generic
// site copy. That's what makes shares actually convert.
export default function ShareLinks({
  url,
  hardHeadline,
  hopefulHeadline,
  tone = "light",
}: {
  url: string;
  hardHeadline: string;
  hopefulHeadline: string;
  tone?: Tone;
}) {
  const [copied, setCopied] = useState(false);

  const shareText = `${hardHeadline} / ${hopefulHeadline}`;
  const TWEET_URL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
  const REDDIT_URL = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(shareText)}`;
  const WHATSAPP_URL = `https://wa.me/?text=${encodeURIComponent(shareText + " " + url)}`;
  const TELEGRAM_URL = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`;
  const FACEBOOK_URL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const LINKEDIN_URL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const BLUESKY_URL = `https://bsky.app/intent/compose?text=${encodeURIComponent(shareText + " " + url)}`;

  const isDark = tone === "dark";
  const tile =
    "flex items-center justify-center px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] transition border " +
    (isDark
      ? "border-bone/20 bg-ink-soft/60 text-bone/85 hover:border-blood hover:text-blood"
      : "border-ink/20 bg-bone text-ink/85 hover:border-blood hover:text-blood");

  function copyLink() {
    if (typeof navigator === "undefined") return;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  }

  function nativeShare() {
    if (typeof navigator === "undefined" || !navigator.share) {
      copyLink();
      return;
    }
    navigator
      .share({ title: "yinyan.news", text: shareText, url })
      .catch(() => {});
  }

  return (
    <div className="space-y-3">
      <div
        className={`font-mono text-[10px] uppercase tracking-[0.3em] ${
          isDark ? "text-bone/55" : "text-ink/55"
        }`}
      >
        share this pairing
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <a className={tile} href={TWEET_URL} target="_blank" rel="noopener noreferrer">x →</a>
        <a className={tile} href={BLUESKY_URL} target="_blank" rel="noopener noreferrer">bsky →</a>
        <a className={tile} href={REDDIT_URL} target="_blank" rel="noopener noreferrer">reddit →</a>
        <a className={tile} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">whatsapp →</a>
        <a className={tile} href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">telegram →</a>
        <a className={tile} href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">facebook →</a>
        <a className={tile} href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">linkedin →</a>
        <button className={tile} onClick={nativeShare} type="button">
          share…
        </button>
      </div>
      <button
        type="button"
        onClick={copyLink}
        className={
          "flex w-full items-center justify-between border px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] transition " +
          (isDark
            ? "border-bone/30 bg-ink/40 text-bone hover:border-blood"
            : "border-ink/30 bg-bone text-ink hover:border-blood")
        }
      >
        <span>{copied ? "✓ copied to clipboard" : "or copy the permalink"}</span>
        <span className={isDark ? "text-bone/55" : "text-ink/55"}>{copied ? "✓" : "↗"}</span>
      </button>
    </div>
  );
}
