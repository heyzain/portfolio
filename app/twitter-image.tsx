import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Zain Ali - Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f6f3ec",
          color: "#171411",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: "64px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "28px", width: "100%" }}>
          <div
            style={{
              color: "#b85036",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Full-Stack Developer
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 800, lineHeight: 0.95 }}>
            <span>Zain Ali</span>
            <span style={{ color: "#b85036" }}>Portfolio</span>
          </div>
          <div style={{ color: "#4f4942", fontSize: 34, lineHeight: 1.35, maxWidth: 900 }}>
            Next.js, React, TypeScript, Node.js, and MongoDB web apps.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
