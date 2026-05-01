import { ImageResponse } from "next/og";

export const runtime = "edge";
// Multiple of 48 so google's search results show our icon, not the
// generic globe.
export const size = { width: 96, height: 96 };
export const contentType = "image/png";

// A split disc — left half ink, right half paper. The yin-yan in
// abstract.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0908",
        }}
      >
        <div
          style={{
            position: "relative",
            width: 78,
            height: 78,
            borderRadius: 9999,
            overflow: "hidden",
            display: "flex",
          }}
        >
          {/* left half — ink */}
          <div
            style={{
              width: 39,
              height: 78,
              background: "#0a0908",
              borderRight: "1px solid rgba(245,234,205,0.5)",
            }}
          />
          {/* right half — paper */}
          <div
            style={{
              width: 39,
              height: 78,
              background: "#f5ead0",
            }}
          />
          {/* small dot on each side */}
          <div
            style={{
              position: "absolute",
              top: 18,
              left: 14,
              width: 12,
              height: 12,
              borderRadius: 9999,
              background: "#c7321b",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 18,
              right: 14,
              width: 12,
              height: 12,
              borderRadius: 9999,
              background: "#c89944",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
