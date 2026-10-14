import { formatArticleDate } from "@/lib/articles"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"
import { getEpisode, getEpisodes } from "@/lib/podcast"

export const alt = "VR Lens episode"
export const size = ogSize
export const contentType = ogContentType
export const revalidate = 3600

export async function generateStaticParams() {
  return (await getEpisodes()).map((e) => ({ slug: e.slug }))
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const episode = await getEpisode(slug)
  if (!episode) {
    return renderOgImage({ eyebrow: "Podcast", title: "VR Lens" })
  }
  return renderOgImage({
    eyebrow: episode.episode
      ? `VR Lens · Episode ${episode.episode}`
      : "VR Lens Podcast",
    title: episode.title,
    subtitle: `With Craig Storm · ${formatArticleDate(Date.parse(episode.date))}`,
  })
}
