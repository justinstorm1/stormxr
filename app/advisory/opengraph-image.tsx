import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const alt = "StormXR advisory"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({
    eyebrow: "Strategic advisory",
    title: "Bridging immersive technology with real-world experience",
  })
}
