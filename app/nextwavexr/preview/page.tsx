import type { Metadata } from "next"

import { ArticlePreview } from "@/components/admin/article-preview"

export const metadata: Metadata = {
  title: "Article preview",
  robots: { index: false, follow: false },
}

export default function ArticlePreviewPage() {
  return <ArticlePreview />
}
