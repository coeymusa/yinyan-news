import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "yinyan.news — for every hard headline, an equal-weight one that is hopeful";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Split-screen OG card. Mirror the on-site treatment: hard / hopeful,
// big italic serif. Used as the default share card for the homepage
// and any page that doesn't override.
export default function OG() {
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
              fontSize: 18,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#c7321b",
            }}
          >
            ● hard
          </div>
          <div
            style={{
              fontSize: 70,
              fontStyle: "italic",
              lineHeight: 1.05,
              color: "#faf6ed",
            }}
          >
            the world is on fire.
          </div>
          <div
            style={{
              fontSize: 16,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(250,246,237,0.5)",
            }}
          >
            yinyan.news
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
              fontSize: 18,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#c89944",
            }}
          >
            ● hopeful
          </div>
          <div
            style={{
              fontSize: 70,
              fontStyle: "italic",
              lineHeight: 1.05,
            }}
          >
            it is also being put out.
          </div>
          <div
            style={{
              fontSize: 16,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(10,9,8,0.5)",
            }}
          >
            paired daily
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
