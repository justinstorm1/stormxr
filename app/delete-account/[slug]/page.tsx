import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { PolicyDocument } from "@/components/policy-document"
import { accountDeletionPages } from "@/lib/account-deletion"
import { pageMetadata } from "@/lib/metadata"

export const dynamicParams = false

export function generateStaticParams() {
  return accountDeletionPages.map((p) => ({ slug: p.slug }))
}

function getPage(slug: string) {
  return accountDeletionPages.find((p) => p.slug === slug)
}

export async function generateMetadata(
  props: PageProps<"/delete-account/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params
  const page = getPage(slug)
  if (!page) return {}
  return pageMetadata({
    title: `Delete Your ${page.name} Account`,
    description: `How to delete your ${page.name} account and data, by StormXR, LLC.`,
    path: `/delete-account/${page.slug}`,
  })
}

export default async function DeleteAccountPage(
  props: PageProps<"/delete-account/[slug]">
) {
  const { slug } = await props.params
  const page = getPage(slug)
  if (!page) notFound()

  return (
    <PolicyDocument
      policy={page}
      eyebrow="Delete your account"
      back={{
        href: `/privacy-policy/${page.slug}`,
        label: `${page.name} privacy policy`,
      }}
    />
  )
}
