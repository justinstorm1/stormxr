import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const alt = "StormyCs VR"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({
    eyebrow: "Creator & community",
    title: "StormyCs VR",
    subtitle: "Gaming, fitness, and life inside the headset",
  })
}
