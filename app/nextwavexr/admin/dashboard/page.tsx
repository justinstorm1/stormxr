"use client"

import { useMutation, useQuery } from "convex/react"
import {
  ArrowUpRight,
  Eye,
  EyeOff,
  Loader,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

import { Input, Notice, Select, StatusBadge } from "@/components/admin/fields"
import { buttonVariants } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import type { Doc, Id } from "@/convex/_generated/dataModel"
import { articleHref, formatArticleDate } from "@/lib/articles"
import { cn } from "@/lib/utils"

type Row = Omit<Doc<"articles">, "content">

const statusOf = (a: Row) => a.status ?? (a.published ? "published" : "draft")
const isWritten = (a: Row) => a.source === "native"

export default function DashboardPage() {
  const articles = useQuery(api.articles.listAllArticles)
  const [query, setQuery] = React.useState("")
  const [source, setSource] = React.useState<"all" | "native" | "link">("all")
  const [status, setStatus] = React.useState("all")
  const [error, setError] = React.useState<string | null>(null)

  if (articles === undefined) {
    return (
      <div className="flex justify-center py-24">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const stats = [
    { label: "Total articles", value: articles.length },
    {
      label: "Published",
      value: articles.filter((a) => statusOf(a) === "published").length,
    },
    {
      label: "Written here",
      value: articles.filter(isWritten).length,
    },
    {
      label: "From UploadVR",
      value: articles.filter((a) => !isWritten(a)).length,
    },
  ]

  const q = query.trim().toLowerCase()
  const filtered = articles.filter(
    (a) =>
      (!q ||
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)) &&
      (source === "all" ||
        (source === "native" ? isWritten(a) : !isWritten(a))) &&
      (status === "all" || statusOf(a) === status)
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="display text-4xl sm:text-5xl">
          <em>Articles</em>
        </h1>
        <Link
          href="/nextwavexr/admin/create"
          className={buttonVariants({ size: "xl" })}
        >
          <Plus data-icon="inline-start" />
          New article
        </Link>
      </div>

      <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass flex flex-col-reverse gap-2 p-6">
            <dt className="text-sm text-muted-foreground">{s.label}</dt>
            <dd className="display text-gradient text-5xl tabular-nums">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search titles or categories"
            aria-label="Search articles"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-11"
          />
        </div>
        <Select
          aria-label="Filter by source"
          value={source}
          onChange={(e) => setSource(e.target.value as typeof source)}
        >
          <option value="all">All sources</option>
          <option value="native">Written here</option>
          <option value="link">UploadVR</option>
        </Select>
        <Select
          aria-label="Filter by status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="scheduled">Scheduled</option>
          <option value="draft">Draft</option>
        </Select>
      </div>

      {error && <Notice tone="error">{error}</Notice>}

      {filtered.length === 0 ? (
        <p className="glass p-10 text-center text-muted-foreground">
          {articles.length === 0
            ? "No articles yet — create your first one."
            : "No articles match these filters."}
        </p>
      ) : (
        <ul className="space-y-3">
          {filtered.map((a) => (
            <ArticleRow key={a._id} article={a} onError={setError} />
          ))}
        </ul>
      )}
    </div>
  )
}

function ArticleRow({
  article,
  onError,
}: {
  article: Row
  onError: (message: string | null) => void
}) {
  const publish = useMutation(api.articles.publishArticle)
  const unpublish = useMutation(api.articles.unpublishArticle)
  const remove = useMutation(api.articles.deleteArticle)
  const [confirming, setConfirming] = React.useState(false)
  const [busy, setBusy] = React.useState(false)

  const status = statusOf(article)
  const written = isWritten(article)

  async function run(action: () => Promise<unknown>, failure: string) {
    setBusy(true)
    onError(null)
    try {
      await action()
    } catch (e) {
      console.error(e)
      onError(failure)
    } finally {
      setBusy(false)
    }
  }

  const id = article._id as Id<"articles">
  const iconButton =
    "inline-flex size-10 items-center justify-center rounded-xl text-muted-foreground ring-1 ring-line transition hover:bg-white/8 hover:text-foreground disabled:opacity-50"

  return (
    <li className="glass flex flex-col gap-4 p-3 sm:flex-row sm:items-center sm:pr-4">
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-card sm:w-36">
        {article.headerImage ? (
          <Image
            src={article.headerImage}
            alt=""
            fill
            sizes="144px"
            className="object-cover"
          />
        ) : (
          <div className="bg-dots absolute inset-0 opacity-50" />
        )}
      </div>

      <div className="min-w-0 flex-1 px-1 sm:px-0">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={status} />
          <span className="label rounded-full bg-white/5 px-2.5 py-1 text-[0.6rem] text-muted-foreground ring-1 ring-line">
            {written ? "Written" : "UploadVR"}
          </span>
        </div>
        <p className="mt-2 line-clamp-2 font-medium">{article.title}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {article.category} · {article.author} ·{" "}
          {formatArticleDate(article.date)}
          {status === "scheduled" && article.scheduledFor && (
            <> · goes live {new Date(article.scheduledFor).toLocaleString()}</>
          )}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2 px-1 sm:px-0">
        {confirming ? (
          <>
            <span className="text-sm text-muted-foreground">Delete?</span>
            <button
              type="button"
              disabled={busy}
              onClick={() =>
                run(() => remove({ articleId: id }), "Couldn't delete article.")
              }
              className="inline-flex h-10 items-center rounded-xl bg-destructive/15 px-3.5 text-sm text-destructive ring-1 ring-destructive/40 transition hover:bg-destructive/25"
            >
              {busy ? <Loader className="size-4 animate-spin" /> : "Delete"}
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="inline-flex h-10 items-center rounded-xl px-3.5 text-sm text-muted-foreground ring-1 ring-line hover:bg-white/8"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            {status === "published" && (
              <a
                href={articleHref(article)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View live article"
                title="View live"
                className={iconButton}
              >
                <ArrowUpRight className="size-4" />
              </a>
            )}
            <button
              type="button"
              disabled={busy}
              aria-label={status === "published" ? "Unpublish" : "Publish now"}
              title={status === "published" ? "Unpublish" : "Publish now"}
              onClick={() =>
                status === "published"
                  ? run(
                      () => unpublish({ articleId: id }),
                      "Couldn't unpublish article."
                    )
                  : run(
                      () => publish({ articleId: id }),
                      "Couldn't publish article."
                    )
              }
              className={iconButton}
            >
              {status === "published" ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
            <Link
              href={`/nextwavexr/admin/edit/${article._id}`}
              aria-label="Edit"
              title="Edit"
              className={iconButton}
            >
              <Pencil className="size-4" />
            </Link>
            <button
              type="button"
              aria-label="Delete"
              title="Delete"
              onClick={() => setConfirming(true)}
              className={cn(iconButton, "hover:text-destructive")}
            >
              <Trash2 className="size-4" />
            </button>
          </>
        )}
      </div>
    </li>
  )
}
