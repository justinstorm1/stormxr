"use client"

import { useMutation, useQuery } from "convex/react"
import { ConvexError } from "convex/values"
import { Check, ExternalLink, Loader, Pencil, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import * as React from "react"

import { Input, Notice } from "@/components/admin/fields"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import type { CategoryEntry } from "@/convex/categories"
import { categoryHref } from "@/lib/articles"
import { cn } from "@/lib/utils"

const button =
  "inline-flex h-10 items-center gap-2 rounded-xl px-3.5 text-sm text-muted-foreground ring-1 ring-line transition hover:bg-white/8 hover:text-foreground disabled:opacity-50"

function errorMessage(e: unknown, fallback: string) {
  if (e instanceof ConvexError && typeof e.data === "string") return e.data
  console.error(e)
  return fallback
}

export default function CategoriesPage() {
  const categories = useQuery(api.categories.list)
  const create = useMutation(api.categories.create)
  const [name, setName] = React.useState("")
  const [adding, setAdding] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function add(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setAdding(true)
    setError(null)
    try {
      await create({ name })
      setName("")
    } catch (err) {
      setError(errorMessage(err, "Couldn't add the category."))
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="display text-4xl sm:text-5xl">
          <em>Categories</em>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Categories you add here are offered when writing or importing an
          article. Renaming one updates every article in it.
        </p>
      </div>

      <form
        onSubmit={add}
        className="glass flex flex-col gap-3 p-4 sm:flex-row"
      >
        <Input
          aria-label="New category name"
          placeholder="New category, e.g. Hardware"
          value={name}
          maxLength={60}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          type="submit"
          size="pill"
          className="h-auto min-h-11 shrink-0 rounded-xl"
          disabled={!name.trim() || adding}
        >
          {adding ? <Loader className="animate-spin" /> : <Plus />}
          Add category
        </Button>
      </form>

      {error && <Notice tone="error">{error}</Notice>}

      {categories === undefined ? (
        <div className="flex justify-center py-16">
          <Loader className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : categories.length === 0 ? (
        <p className="glass p-10 text-center text-muted-foreground">
          No categories yet — add your first one above.
        </p>
      ) : (
        <ul className="glass divide-y divide-line">
          {categories.map((c) => (
            <CategoryRow key={c.name} category={c} onError={setError} />
          ))}
        </ul>
      )}
    </div>
  )
}

function CategoryRow({
  category: c,
  onError,
}: {
  category: CategoryEntry
  onError: (message: string | null) => void
}) {
  const rename = useMutation(api.categories.rename)
  const remove = useMutation(api.categories.remove)
  const [mode, setMode] = React.useState<"view" | "edit" | "delete">("view")
  const [draft, setDraft] = React.useState(c.name)
  const [busy, setBusy] = React.useState(false)

  async function run(action: () => Promise<unknown>, failure: string) {
    setBusy(true)
    onError(null)
    try {
      await action()
      setMode("view")
    } catch (e) {
      onError(errorMessage(e, failure))
    } finally {
      setBusy(false)
    }
  }

  const count = `${c.articleCount} article${c.articleCount === 1 ? "" : "s"}`

  if (mode === "edit") {
    return (
      <li className="p-4">
        <form
          className="flex flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault()
            run(
              () => rename({ from: c.name, to: draft }),
              "Couldn't rename the category."
            )
          }}
        >
          <Input
            aria-label={`Rename ${c.name}`}
            value={draft}
            maxLength={60}
            autoFocus
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && setMode("view")}
          />
          <div className="flex shrink-0 gap-2">
            <button
              type="submit"
              disabled={busy || !draft.trim()}
              className={cn(button, "text-foreground")}
            >
              {busy ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                <Check className="size-4" />
              )}
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setDraft(c.name)
                setMode("view")
              }}
              className={button}
            >
              Cancel
            </button>
          </div>
        </form>
        {c.articleCount > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            Saving moves all {count} to the new name. Use an existing category&apos;s
            name to merge them.
          </p>
        )}
      </li>
    )
  }

  return (
    <li className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{c.name}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {count}
          {!c.categoryId && " · added from an article"}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {mode === "delete" ? (
          <>
            <span className="text-sm text-muted-foreground">
              Delete “{c.name}”?
            </span>
            <button
              type="button"
              disabled={busy}
              onClick={() =>
                run(
                  () => remove({ name: c.name }),
                  "Couldn't delete the category."
                )
              }
              className="inline-flex h-10 items-center rounded-xl bg-destructive/15 px-3.5 text-sm text-destructive ring-1 ring-destructive/40 transition hover:bg-destructive/25"
            >
              {busy ? <Loader className="size-4 animate-spin" /> : "Delete"}
            </button>
            <button
              type="button"
              onClick={() => setMode("view")}
              className={button}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            {c.articleCount > 0 && (
              <Link
                href={categoryHref(c.name)}
                target="_blank"
                className={button}
                aria-label={`View ${c.name} on the site`}
                title="View on site"
              >
                <ExternalLink className="size-4" />
              </Link>
            )}
            <button
              type="button"
              onClick={() => {
                setDraft(c.name)
                setMode("edit")
              }}
              className={button}
            >
              <Pencil className="size-4" />
              Rename
            </button>
            <button
              type="button"
              disabled={c.articleCount > 0}
              title={
                c.articleCount > 0
                  ? "Rename or move its articles before deleting"
                  : undefined
              }
              onClick={() => setMode("delete")}
              className={cn(button, "hover:text-destructive")}
            >
              <Trash2 className="size-4" />
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  )
}
