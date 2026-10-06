import { ImageResponse } from "next/og"

export const alt = "StormXR — Tracking the next wave of immersive technology"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background:
          "radial-gradient(circle at 15% 10%, rgba(80,210,240,0.35), transparent 45%), radial-gradient(circle at 90% 30%, rgba(150,100,255,0.35), transparent 45%), #0b0f1c",
        color: "#f2f5fb",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 36, fontWeight: 600 }}>
        Storm<span style={{ color: "#5fd6ef" }}>XR</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 80,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 950,
          }}
        >
          Tracking the next wave of immersive technology
        </div>
        <div style={{ marginTop: 28, fontSize: 28, color: "#a3aac2" }}>
          XR media · Development · Advisory
        </div>
      </div>
    </div>,
    size
  )
}
