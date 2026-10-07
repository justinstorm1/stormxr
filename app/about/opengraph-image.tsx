import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const alt = "About StormXR"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({
    eyebrow: "About",
    title: "Bridging immersive technology, media, and real-world adoption",
  })
}
