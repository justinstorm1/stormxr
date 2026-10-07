import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const alt = "StormXR press releases"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({
    eyebrow: "Press",
    title: "Press releases & announcements",
  })
}
