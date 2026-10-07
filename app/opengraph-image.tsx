import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const alt = "StormXR — Tracking the next wave of immersive technology"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({
    eyebrow: "XR media · Development · Advisory",
    title: "Tracking the next wave of immersive technology",
  })
}
