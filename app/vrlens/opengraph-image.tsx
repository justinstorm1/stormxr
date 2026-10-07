import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const alt = "VR Lens Podcast"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({
    eyebrow: "Podcast",
    title: "VR Lens",
    subtitle: "Interviews and analysis on VR and spatial computing",
  })
}
