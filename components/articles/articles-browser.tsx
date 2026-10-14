"use client"

import { ArrowDown, Search, X } from "lucide-react"
import * as React from "react"

import { ArticleCard } from "@/components/articles/article-card"
import { buttonVariants } from "@/components/ui/button"
import type { ArticleSummary } from "@/lib/articles"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 18

/** Every word of the query appears somewhere in the article's text. */
function matches(article: ArticleSummary, words: string[]) {
  const haystack = [
    article.title,
    article.excerpt,
    article.category,
    article.author,
    ...(article.tags ?? []),
  ]
    .join(" ")
    .toLowerCase()
  return words.every((w) => haystack.includes(w))
}

/**
 * Featured latest article, search, category filter chips, and a paged grid.
 * Press "/" anywhere on the page to jump to search.
 */
export function ArticlesBrowser({
  articles,
  filters = true,
}: {
  articles: ArticleSummary[]
  /** Show the category filter chips. */
  filters?: boolean
}) {
  const [category, setCategory] = React.useState<string | null>(null)
  const [visible, setVisible] = React.useState(PAGE_SIZE)
  const [query, setQuery] = React.useState("")
  const searchRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (!filters) return
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (
        e.key !== "/" ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey ||
        target.isContentEditable ||
        /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)
      ) {
        return
      }
      e.preventDefault()
      searchRef.current?.focus()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [filters])

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

  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const searching = words.length > 0
  const filtered = articles.filter(
    (a) =>
      (!category || a.category === category) &&
      (!searching || matches(a, words))
  )
  // While searching, every result gets the same weight: no featured card.
  const featured = searching ? undefined : filtered[0]
  const rest = searching ? filtered : filtered.slice(1)
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
      {filters && (
        <div className="relative mb-4 max-w-md">
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setVisible(PAGE_SIZE)
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setQuery("")
                e.currentTarget.blur()
              }
            }}
            placeholder="Search articles"
            aria-label="Search articles"
            className="w-full rounded-full bg-white/4 py-2.5 pr-20 pl-11 text-sm ring-1 ring-line transition outline-none placeholder:text-muted-foreground focus:bg-white/6 focus:ring-primary [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("")
                searchRef.current?.focus()
              }}
              className="absolute top-1/2 right-3 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition hover:bg-white/8 hover:text-foreground"
            >
              <X className="size-4" />
              <span className="sr-only">Clear search</span>
            </button>
          ) : (
            <kbd
              aria-hidden
              className="absolute top-1/2 right-4 hidden -translate-y-1/2 rounded-md px-1.5 font-mono text-xs text-muted-foreground ring-1 ring-line sm:block"
            >
              /
            </kbd>
          )}
        </div>
      )}
      {filters && (
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
      )}

      <p
        aria-live="polite"
        className={cn("text-sm text-muted-foreground", searching && "mt-6")}
      >
        {searching &&
          (filtered.length === 0
            ? `No articles match “${query.trim()}”${category ? ` in ${category}` : ""}.`
            : `${filtered.length} ${filtered.length === 1 ? "article" : "articles"} found`)}
      </p>

      <div className={cn("grid gap-4", filters && "mt-8")}>
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
