"use client"

import { ArrowDown } from "lucide-react"
import * as React from "react"

import { ArticleCard } from "@/components/articles/article-card"
import { buttonVariants } from "@/components/ui/button"
import type { ArticleSummary } from "@/lib/articles"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 18

/** Featured latest article, category filter chips, and a paged grid. */
export function ArticlesBrowser({ articles }: { articles: ArticleSummary[] }) {
  const [category, setCategory] = React.useState<string | null>(null)
  const [visible, setVisible] = React.useState(PAGE_SIZE)

  const categories = React.useMemo(() => {
    const counts = new Map<string, number>()
    for (const a of articles) {
      counts.set(a.category, (counts.get(a.category) ?? 0) + 1)
    }
    return [...counts].sort((a, b) => b[1] - a[1]).map(([name]) => name)
  }, [articles])

  if (articles.length === 0) {
    return (
      <p className="glass p-8 text-center text-muted-foreground">
        New articles are on the way — check back soon.
      </p>
    )
  }

  const filtered = category
    ? articles.filter((a) => a.category === category)
    : articles
  const [featured, ...rest] = filtered
  const shown = rest.slice(0, visible)

  const chip = (active: boolean) =>
    cn(
      "shrink-0 rounded-full px-4 py-2 text-sm whitespace-nowrap ring-1 transition",
      active
        ? "bg-primary text-primary-foreground ring-primary"
        : "bg-white/4 text-muted-foreground ring-line hover:bg-white/8 hover:text-foreground"
    )

  return (
    <div>
      <div
        role="toolbar"
        aria-label="Filter by category"
        className="-mx-4 flex [scrollbar-width:none] gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        <button
          type="button"
          aria-pressed={category === null}
          onClick={() => {
            setCategory(null)
            setVisible(PAGE_SIZE)
          }}
          className={chip(category === null)}
        >
          All <span className="opacity-60">{articles.length}</span>
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => {
              setCategory(c)
              setVisible(PAGE_SIZE)
            }}
            className={chip(category === c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4">
        {featured && <ArticleCard article={featured} featured />}
        {shown.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((a) => (
              <ArticleCard key={a._id} article={a} />
            ))}
          </div>
        )}
      </div>

      {rest.length > visible && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className={buttonVariants({ size: "xl", variant: "outline" })}
          >
            Load more articles
            <ArrowDown data-icon="inline-end" />
          </button>
        </div>
      )}
    </div>
  )
}
