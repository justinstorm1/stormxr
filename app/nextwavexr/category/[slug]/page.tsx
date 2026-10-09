import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  getTopics,
  renderTopic,
  topicMetadata,
} from "@/components/articles/topic-page"

// Articles come from Convex; refresh the prerendered page every minute.
export const revalidate = 60

export async function generateStaticParams() {
  return [...(await getTopics("category")).keys()].map((slug) => ({ slug }))
}

export async function generateMetadata(
  props: PageProps<"/nextwavexr/category/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params
  return topicMetadata("category", slug)
}

export default async function Page(
  props: PageProps<"/nextwavexr/category/[slug]">
) {
  const { slug } = await props.params
  return (await renderTopic("category", slug)) ?? notFound()
}
