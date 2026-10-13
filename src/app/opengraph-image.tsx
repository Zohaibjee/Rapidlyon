import { ImageResponse } from "next/og";

export const alt = "Rapidlyon — digital products, designed with purpose and built for impact";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "76px",
          background: "#171916",
          color: "#F5F5EF",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", color: "#B6E76A", fontSize: 28, letterSpacing: 5 }}>
          INDEPENDENT DIGITAL STUDIO
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 74, fontWeight: 700, letterSpacing: -3 }}>
            Rapidlyon
          </div>
          <div style={{ display: "flex", maxWidth: 940, color: "#D7D9D2", fontSize: 38, lineHeight: 1.25 }}>
            Digital products, designed with purpose. Built for impact.
          </div>
        </div>
        <div style={{ display: "flex", color: "#B6E76A", fontSize: 24 }}>
          rapidlyon.com
        </div>
      </div>
    ),
    size,
  );
}
