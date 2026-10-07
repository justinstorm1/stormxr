"use client"

import type { JSONContent } from "@tiptap/react"
import { useMutation, useQuery } from "convex/react"
import {
  ExternalLink,
  ImagePlus,
  Loader,
  Save,
  Sparkles,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"
import * as React from "react"

import { DASHBOARD_PATH } from "@/components/admin/admin-shell"
import { RichTextEditor } from "@/components/admin/editor/rich-text-editor"
import {
  Field,
  Input,
  Notice,
  Select,
  Textarea,
} from "@/components/admin/fields"
import { useUpload } from "@/components/admin/use-upload"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import type { Doc } from "@/convex/_generated/dataModel"
import { reservedSlugs, slugify } from "@/lib/articles"
import { cn } from "@/lib/utils"

const DEFAULT_AUTHOR = "Craig Storm"

/** `YYYY-MM-DD` ↔ epoch ms, pinned to noon UTC so the day never shifts. */
const toDateInput = (ms: number) => new Date(ms).toISOString().slice(0, 10)
const fromDateInput = (value: string) => {
  const [y, m, d] = value.split("-").map(Number)
  return Date.UTC(y, m - 1, d, 12)
}
/** `datetime-local` value in the viewer's time zone. */
const toLocalDateTime = (ms: number) => {
  const d = new Date(ms - new Date(ms).getTimezoneOffset() * 60_000)
  return d.toISOString().slice(0, 16)
}

const errorMessage = (e: unknown, fallback: string) =>
  e instanceof Error
    ? // Convex wraps server errors; keep only the thrown message.
      (e.message.match(/Uncaught Error: (.*?)(?:\n|$)/)?.[1] ?? fallback)
    : fallback

function useCategories() {
  const articles = useQuery(api.articles.listAllArticles)
  return React.useMemo(
    () => [...new Set(articles?.map((a) => a.category))].sort(),
    [articles]
  )
}

/** Warns before leaving the page with unsaved changes. */
function useUnsavedGuard(dirty: boolean) {
  React.useEffect(() => {
    if (!dirty) return
    const onBeforeUnload = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener("beforeunload", onBeforeUnload)
    return () => window.removeEventListener("beforeunload", onBeforeUnload)
  }, [dirty])
}

function HeaderImageField({
  value,
  onChange,
  onError,
}: {
  value: string
  onChange: (url: string) => void
  onError: (message: string) => void
}) {
  const { upload, uploading } = useUpload()
  const input = React.useRef<HTMLInputElement>(null)
  return (
    <Field
      label="Header image"
      htmlFor="headerImage"
      hint="Upload or paste a URL"
    >
      {value && (
        <div className="relative mb-3 overflow-hidden rounded-xl ring-1 ring-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="aspect-video w-full object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Remove header image"
            className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-background/80 ring-1 ring-line backdrop-blur hover:bg-background"
          >
            <X className="size-4" />
          </button>
        </div>
      )}
      <div className="flex gap-2">
        <Input
          id="headerImage"
          type="url"
          placeholder="https://…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button
          type="button"
          variant="outline"
          size="pill"
          className="h-auto shrink-0 rounded-xl"
          disabled={uploading}
          onClick={() => input.current?.click()}
        >
          {uploading ? <Loader className="animate-spin" /> : <ImagePlus />}
          Upload
        </Button>
        <input
          ref={input}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0]
            e.target.value = ""
            if (!file) return
            try {
              onChange(await upload(file))
            } catch (err) {
              onError(errorMessage(err, "Upload failed"))
            }
          }}
        />
      </div>
    </Field>
  )
}

// ---------------------------------------------------------------------------
// Write an article
// ---------------------------------------------------------------------------

type Status = "draft" | "published" | "scheduled"

export function WriteArticleForm({ article }: { article?: Doc<"articles"> }) {
  const router = useRouter()
  const categories = useCategories()
  const createArticle = useMutation(api.articles.createArticle)
  const updateArticle = useMutation(api.articles.updateArticle)

  const [title, setTitle] = React.useState(article?.title ?? "")
  const [slug, setSlug] = React.useState(article?.slug ?? "")
  const [slugEdited, setSlugEdited] = React.useState(!!article?.slug)
  const [excerpt, setExcerpt] = React.useState(article?.excerpt ?? "")
  const [author, setAuthor] = React.useState(article?.author ?? DEFAULT_AUTHOR)
  const [category, setCategory] = React.useState(article?.category ?? "")
  const [tags, setTags] = React.useState(article?.tags?.join(", ") ?? "")
  const [date, setDate] = React.useState(() =>
    toDateInput(article?.date ?? Date.now())
  )
  const [headerImage, setHeaderImage] = React.useState(
    article?.headerImage ?? ""
  )
  const [status, setStatus] = React.useState<Status>(
    article?.status ?? (article?.published ? "published" : "draft")
  )
  const [scheduledFor, setScheduledFor] = React.useState(
    article?.scheduledFor ? toLocalDateTime(article.scheduledFor) : ""
  )
  const [metaDescription, setMetaDescription] = React.useState(
    article?.metaDescription ?? ""
  )
  const [featured, setFeatured] = React.useState(article?.featured ?? false)
  const [content, setContent] = React.useState<JSONContent | null>(
    (article?.content as JSONContent | undefined) ?? null
  )

  const [dirty, setDirty] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [saved, setSaved] = React.useState(false)
  useUnsavedGuard(dirty)

  // Mark the form dirty whenever any field changes.
  const touch =
    <T,>(set: (v: T) => void) =>
    (v: T) => {
      set(v)
      setDirty(true)
      setSaved(false)
    }

  const effectiveSlug = slugEdited ? slug : slugify(title)
  const slugError = reservedSlugs.includes(effectiveSlug)
    ? `"${effectiveSlug}" is reserved — pick another slug.`
    : undefined

  const missing = [
    !title.trim() && "a title",
    !effectiveSlug && "a slug",
    !category.trim() && "a category",
    !author.trim() && "an author",
    status === "scheduled" && !scheduledFor && "a publish time",
  ].filter(Boolean)

  async function save() {
    if (missing.length || slugError) return
    setSaving(true)
    setError(null)
    const fields = {
      title: title.trim(),
      slug: effectiveSlug,
      author: author.trim(),
      content: content ?? { type: "doc", content: [] },
      excerpt: excerpt.trim() || undefined,
      category: category.trim(),
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      featured,
      status,
      scheduledFor:
        status === "scheduled" ? new Date(scheduledFor).getTime() : undefined,
      date: fromDateInput(date),
      metaDescription: metaDescription.trim() || undefined,
      headerImage: headerImage.trim() || undefined,
      canonicalUrl: article?.canonicalUrl,
      ogImageId: article?.ogImageId,
    }
    try {
      if (article) {
        await updateArticle({ articleId: article._id, ...fields })
        setDirty(false)
        setSaved(true)
      } else {
        await createArticle(fields)
        setDirty(false)
        router.push(DASHBOARD_PATH)
      }
    } catch (e) {
      setError(errorMessage(e, "Couldn't save the article."))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
      <div className="min-w-0 space-y-5">
        <Textarea
          aria-label="Title"
          placeholder="Article title"
          rows={2}
          value={title}
          onChange={(e) => touch(setTitle)(e.target.value)}
          className="display resize-none border-0 bg-transparent px-1 text-3xl focus:ring-0 sm:text-4xl"
        />
        <Textarea
          aria-label="Excerpt"
          placeholder="A one or two sentence summary shown on the articles page"
          rows={2}
          value={excerpt}
          onChange={(e) => touch(setExcerpt)(e.target.value)}
        />
        <RichTextEditor
          content={content}
          onChange={touch(setContent)}
          onError={setError}
        />
      </div>

      <aside className="glass space-y-5 p-6 lg:sticky lg:top-24">
        {error && <Notice tone="error">{error}</Notice>}
        {saved && <Notice tone="success">Saved.</Notice>}

        <Field label="Status" htmlFor="status">
          <Select
            id="status"
            value={status}
            onChange={(e) => touch(setStatus)(e.target.value as Status)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
          </Select>
        </Field>
        {status === "scheduled" && (
          <Field label="Publish at" htmlFor="scheduledFor">
            <Input
              id="scheduledFor"
              type="datetime-local"
              value={scheduledFor}
              onChange={(e) => touch(setScheduledFor)(e.target.value)}
            />
          </Field>
        )}

        <Button
          type="button"
          size="xl"
          className="w-full"
          disabled={saving || missing.length > 0 || !!slugError}
          onClick={save}
        >
          {saving ? (
            <Loader className="animate-spin" data-icon="inline-start" />
          ) : (
            <Save data-icon="inline-start" />
          )}
          {article
            ? "Save changes"
            : status === "published"
              ? "Publish"
              : "Save"}
        </Button>
        {missing.length > 0 && (
          <p className="text-xs text-muted-foreground">
            Add {missing.join(", ")} to save.
          </p>
        )}

        <hr className="border-line" />

        <Field
          label="Slug"
          htmlFor="slug"
          hint={slugEdited ? undefined : "From title"}
          error={slugError}
        >
          <Input
            id="slug"
            value={effectiveSlug}
            onChange={(e) => {
              setSlugEdited(true)
              touch(setSlug)(slugify(e.target.value))
            }}
          />
          <p className="mt-1.5 truncate text-xs text-muted-foreground">
            /nextwavexr/articles/{effectiveSlug || "…"}
          </p>
        </Field>
        <Field label="Category" htmlFor="category">
          <Input
            id="category"
            list="category-options"
            value={category}
            onChange={(e) => touch(setCategory)(e.target.value)}
          />
          <datalist id="category-options">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Author" htmlFor="author">
            <Input
              id="author"
              value={author}
              onChange={(e) => touch(setAuthor)(e.target.value)}
            />
          </Field>
          <Field label="Date" htmlFor="date">
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => touch(setDate)(e.target.value)}
            />
          </Field>
        </div>
        <HeaderImageField
          value={headerImage}
          onChange={touch(setHeaderImage)}
          onError={setError}
        />
        <Field label="Tags" htmlFor="tags" hint="Comma separated">
          <Input
            id="tags"
            value={tags}
            onChange={(e) => touch(setTags)(e.target.value)}
          />
        </Field>
        <Field label="SEO description" htmlFor="metaDescription">
          <Textarea
            id="metaDescription"
            rows={3}
            value={metaDescription}
            onChange={(e) => touch(setMetaDescription)(e.target.value)}
          />
        </Field>
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => touch(setFeatured)(e.target.checked)}
            className="size-4 accent-[var(--primary)]"
          />
          Featured article
        </label>
      </aside>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Import from UploadVR
// ---------------------------------------------------------------------------

type Meta = {
  title?: string
  image?: string
  author?: string
  category?: string
  date?: string
  url?: string
  error?: string
}

export function ImportArticleForm({ article }: { article?: Doc<"articles"> }) {
  const router = useRouter()
  const categories = useCategories()
  const addArticle = useMutation(api.articles.addArticle)
  const editArticle = useMutation(api.articles.editArticle)

  const [link, setLink] = React.useState(article?.link ?? "")
  const [title, setTitle] = React.useState(article?.title ?? "")
  const [author, setAuthor] = React.useState(article?.author ?? "")
  const [category, setCategory] = React.useState(article?.category ?? "")
  const [date, setDate] = React.useState(() =>
    toDateInput(article?.date ?? Date.now())
  )
  const [headerImage, setHeaderImage] = React.useState(
    article?.headerImage ?? ""
  )
  const [published, setPublished] = React.useState(article?.published ?? true)

  const [fetching, setFetching] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [saved, setSaved] = React.useState(false)
  const [dirty, setDirty] = React.useState(false)
  useUnsavedGuard(dirty)

  const fetchMeta = React.useCallback(async (url: string) => {
    setFetching(true)
    setError(null)
    try {
      const res = await fetch(
        `/api/uploadvr-meta?url=${encodeURIComponent(url)}`
      )
      const data = (await res.json()) as Meta
      if (!res.ok) throw new Error(data.error ?? "Couldn't read that article")
      if (data.url) setLink(data.url)
      if (data.title) setTitle(data.title)
      if (data.author) setAuthor(data.author)
      if (data.category) setCategory(data.category)
      if (data.image) setHeaderImage(data.image)
      if (data.date) setDate(data.date)
      setDirty(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't read that article")
    } finally {
      setFetching(false)
    }
  }, [])

  // Auto-fill as soon as a full UploadVR link is pasted (new imports only).
  React.useEffect(() => {
    if (article) return
    let url: URL
    try {
      url = new URL(link)
    } catch {
      return
    }
    if (!url.hostname.endsWith("uploadvr.com") || url.pathname.length < 2) {
      return
    }
    const timeout = setTimeout(() => fetchMeta(link), 500)
    return () => clearTimeout(timeout)
    // Only refetch when the link itself changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link])

  const touch =
    <T,>(set: (v: T) => void) =>
    (v: T) => {
      set(v)
      setDirty(true)
      setSaved(false)
    }

  const ready =
    link && title.trim() && author.trim() && category.trim() && headerImage

  async function save() {
    if (!ready) return
    setSaving(true)
    setError(null)
    const fields = {
      link: link.trim(),
      title: title.trim(),
      author: author.trim(),
      category: category.trim(),
      headerImage: headerImage.trim(),
      date: fromDateInput(date),
      published,
    }
    try {
      if (article) {
        await editArticle({ articleId: article._id, ...fields })
        setDirty(false)
        setSaved(true)
      } else {
        await addArticle(fields)
        setDirty(false)
        router.push(DASHBOARD_PATH)
      }
    } catch (e) {
      setError(errorMessage(e, "Couldn't save the article."))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="glass space-y-5 p-6 sm:p-8">
        <Field
          label="UploadVR link"
          htmlFor="link"
          hint={
            fetching ? (
              <span className="inline-flex items-center gap-1.5">
                <Loader className="size-3 animate-spin" /> Reading article…
              </span>
            ) : (
              "Paste a link — details fill in automatically"
            )
          }
        >
          <div className="flex gap-2">
            <Input
              id="link"
              type="url"
              placeholder="https://www.uploadvr.com/…"
              value={link}
              onChange={(e) => touch(setLink)(e.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              size="pill"
              className="h-auto shrink-0 rounded-xl"
              disabled={!link || fetching}
              onClick={() => fetchMeta(link)}
              title="Fetch details again"
            >
              <Sparkles />
              Fetch
            </Button>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open link"
                className="flex w-12 shrink-0 items-center justify-center rounded-xl text-muted-foreground ring-1 ring-line hover:bg-white/8 hover:text-foreground"
              >
                <ExternalLink className="size-4" />
              </a>
            )}
          </div>
        </Field>

        {error && <Notice tone="error">{error}</Notice>}
        {saved && <Notice tone="success">Saved.</Notice>}

        <div className={cn("space-y-5", fetching && "opacity-60")}>
          <HeaderImageField
            value={headerImage}
            onChange={touch(setHeaderImage)}
            onError={setError}
          />
          <Field label="Title" htmlFor="title">
            <Textarea
              id="title"
              rows={2}
              value={title}
              onChange={(e) => touch(setTitle)(e.target.value)}
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Author" htmlFor="author">
              <Input
                id="author"
                value={author}
                onChange={(e) => touch(setAuthor)(e.target.value)}
              />
            </Field>
            <Field label="Date" htmlFor="date">
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => touch(setDate)(e.target.value)}
              />
            </Field>
          </div>
          <Field label="Category" htmlFor="category">
            <Input
              id="category"
              list="import-category-options"
              value={category}
              onChange={(e) => touch(setCategory)(e.target.value)}
            />
            <datalist id="import-category-options">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </Field>
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => touch(setPublished)(e.target.checked)}
              className="size-4 accent-[var(--primary)]"
            />
            Published (show on the NextWave XR page)
          </label>
        </div>
      </div>

      <Button
        type="button"
        size="xl"
        className="w-full"
        disabled={!ready || saving || fetching}
        onClick={save}
      >
        {saving ? (
          <Loader className="animate-spin" data-icon="inline-start" />
        ) : (
          <Save data-icon="inline-start" />
        )}
        {article ? "Save changes" : "Add article"}
      </Button>
    </div>
  )
}
