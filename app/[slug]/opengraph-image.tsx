import { ImageResponse } from "next/og";
import { getPairing } from "../lib/pairings";

export const runtime = "edge";
export const alt = "yinyan.news pairing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Per-pairing OG card. Mirrors the on-site treatment: hard / hopeful
// split, the actual headlines from the pairing, source attribution.
// Each share carries the pairing's content into the timeline rather
// than the generic site card.
export default async function PairingOG({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPairing(slug);
  if (!p) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#0a0908",
            color: "#faf6ed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Georgia, serif",
            fontSize: 64,
            fontStyle: "italic",
          }}
        >
          yinyan.news
        </div>
      ),
      { ...size },
    );
  }

  // truncate long headlines so they fit the OG card; full text stays in the meta
  const trim = (s: string, n = 110) =>
    s.length <= n ? s : s.slice(0, n - 1).replace(/[,\s]+$/, "") + "…";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* hard side */}
        <div
          style={{
            width: "50%",
            height: "100%",
            background: "#0a0908",
            color: "#faf6ed",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 56,
          }}
        >
          <div
            style={{
              fontSize: 16,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#c7321b",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            ● hard
            {p.hard.country && (
              <span style={{ color: "rgba(250,246,237,0.45)", marginLeft: 12 }}>
                · {p.hard.country.toUpperCase()}
              </span>
            )}
          </div>
          <div
            style={{
              fontSize: trim(p.hard.headline).length > 70 ? 42 : 52,
              fontStyle: "italic",
              lineHeight: 1.06,
              color: "#faf6ed",
            }}
          >
            {trim(p.hard.headline)}
          </div>
          <div
            style={{
              fontSize: 14,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(250,246,237,0.5)",
            }}
          >
            via {p.hard.source.name}
          </div>
        </div>

        {/* hopeful side */}
        <div
          style={{
            width: "50%",
            height: "100%",
            background: "#f5ead0",
            color: "#0a0908",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 56,
          }}
        >
          <div
            style={{
              fontSize: 16,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#c89944",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            ● hopeful
            {p.hopeful.country && (
              <span style={{ color: "rgba(10,9,8,0.45)", marginLeft: 12 }}>
                · {p.hopeful.country.toUpperCase()}
              </span>
            )}
          </div>
          <div
            style={{
              fontSize: trim(p.hopeful.headline).length > 70 ? 42 : 52,
              fontStyle: "italic",
              lineHeight: 1.06,
            }}
          >
            {trim(p.hopeful.headline)}
          </div>
          <div
            style={{
              fontSize: 14,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(10,9,8,0.5)",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>via {p.hopeful.source.name}</span>
            <span>yinyan.news</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
