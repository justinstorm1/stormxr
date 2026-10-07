"use client"

import { useQuery } from "convex/react"
import { ArrowLeft, Loader } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

import { DASHBOARD_PATH } from "@/components/admin/admin-shell"
import {
  ImportArticleForm,
  WriteArticleForm,
} from "@/components/admin/article-forms"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"

export default function EditArticlePage() {
  const { id } = useParams<{ id: string }>()
  const article = useQuery(api.articles.getArticleForEdit, {
    articleId: id as Id<"articles">,
  })

  return (
    <div className="space-y-8">
      <div>
        <Link
          href={DASHBOARD_PATH}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All articles
        </Link>
        <h1 className="display mt-4 text-4xl sm:text-5xl">
          Edit <em>article</em>
        </h1>
      </div>

      {article === undefined ? (
        <div className="flex justify-center py-24">
          <Loader className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : article === null ? (
        <p className="glass p-10 text-center text-muted-foreground">
          This article no longer exists.
        </p>
      ) : article.source === "native" ? (
        // key resets local form state if a different article loads.
        <WriteArticleForm key={article._id} article={article} />
      ) : (
        <ImportArticleForm key={article._id} article={article} />
      )}
    </div>
  )
}
