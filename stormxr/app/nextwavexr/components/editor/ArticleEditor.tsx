"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import type { Doc, Id } from "@/convex/_generated/dataModel"
import { createArticleExtensions } from "./extensions"
import { Toolbar } from "./Toolbar"
import { MetadataSidebar } from "./MetadataSidebar"
import { PublishBar } from "./PublishBar"
import { ArticleContent } from "../ArticleContent"
import { useAutosave } from "./hooks/useAutosave"
import { useWordCount } from "./hooks/useWordCount"
import { useFullscreen } from "./hooks/useFullscreen"
import { useMediaUpload } from "./hooks/useMediaUpload"
import { articleFormSchema, type ArticleFormValues, defaultArticleFormValues } from "./articleFormSchema"
import { cn } from "@/lib/utils"

export function ArticleEditor({
    mode,
    initialArticle
}: {
    mode: "create" | "edit"
    initialArticle?: Doc<"articles"> | null
}) {
    const router = useRouter()
    const createArticle = useMutation(api.articles.createArticle)
    const updateArticle = useMutation(api.articles.updateArticle)

    const [articleId, setArticleId] = useState<Id<"articles"> | null>(initialArticle?._id ?? null)
    const [saving, setSaving] = useState(false)
    const [previewMode, setPreviewMode] = useState(false)
    const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()
    const { uploadFile } = useMediaUpload()

    const allArticles = useQuery(api.articles.getArticles)
    const categorySuggestions = useMemo(() => {
        const set = new Set<string>()
        allArticles?.forEach((article) => article.category && set.add(article.category))
        return Array.from(set)
    }, [allArticles])

    const form = useForm<ArticleFormValues>({
        resolver: zodResolver(articleFormSchema),
        defaultValues: initialArticle
            ? {
                  title: initialArticle.title,
                  slug: initialArticle.slug ?? "",
                  author: initialArticle.author,
                  excerpt: initialArticle.excerpt ?? "",
                  category: initialArticle.category,
                  tags: initialArticle.tags ?? [],
                  featured: initialArticle.featured ?? false,
                  status: initialArticle.status ?? (initialArticle.published ? "published" : "draft"),
                  scheduledFor: initialArticle.scheduledFor,
                  date: initialArticle.date,
                  metaDescription: initialArticle.metaDescription ?? "",
                  canonicalUrl: initialArticle.canonicalUrl ?? "",
                  headerImage: initialArticle.headerImage ?? ""
              }
            : defaultArticleFormValues
    })

    const uploadAndInsertRef = useRef<(file: File) => void>(() => {})

    const editor = useEditor({
        immediatelyRender: false,
        extensions: createArticleExtensions({ editable: true }),
        content: (initialArticle?.content as object | undefined) ?? undefined,
        editorProps: {
            attributes: {
                class: "prose prose-neutral max-w-none focus:outline-none min-h-[60vh] px-4 py-6"
            },
            handleDrop: (_view, event, _slice, moved) => {
                if (moved) return false
                const files = Array.from(event.dataTransfer?.files ?? []).filter((file) =>
                    file.type.startsWith("image/")
                )
                if (!files.length) return false
                event.preventDefault()
                files.forEach((file) => uploadAndInsertRef.current(file))
                return true
            },
            handlePaste: (_view, event) => {
                const files = Array.from(event.clipboardData?.files ?? []).filter((file) =>
                    file.type.startsWith("image/")
                )
                if (!files.length) return false
                event.preventDefault()
                files.forEach((file) => uploadAndInsertRef.current(file))
                return true
            }
        }
    })

    uploadAndInsertRef.current = async (file: File) => {
        const asset = await uploadFile(file)
        if (asset?.url && editor) {
            editor
                .chain()
                .focus()
                .insertContent({ type: "resizableImage", attrs: { src: asset.url, width: 100, align: "center" } })
                .run()
        }
    }

    const localStorageKey = `article-draft-${articleId ?? "new"}`
    const { status: autosaveStatus, clearLocalDraft } = useAutosave({ editor, articleId, localStorageKey })
    const wordStats = useWordCount(editor)

    const status = form.watch("status")

    const handleSave = form.handleSubmit(async (values) => {
        if (!editor) return
        setSaving(true)
        try {
            const payload = {
                title: values.title,
                slug: values.slug,
                author: values.author,
                category: values.category,
                tags: values.tags,
                featured: values.featured,
                status: values.status,
                scheduledFor: values.status === "scheduled" ? values.scheduledFor : undefined,
                date: values.date,
                excerpt: values.excerpt || undefined,
                metaDescription: values.metaDescription || undefined,
                canonicalUrl: values.canonicalUrl || undefined,
                headerImage: values.headerImage || undefined,
                content: editor.getJSON()
            }

            if (articleId) {
                await updateArticle({ articleId, ...payload })
                clearLocalDraft()
                toast.success(values.status === "published" ? "Article updated" : "Draft saved")
            } else {
                const newId = await createArticle(payload)
                setArticleId(newId)
                clearLocalDraft()
                toast.success(values.status === "published" ? "Article published" : "Draft saved")
                router.replace(`/nextwavexr/admin/edit/${newId}`)
            }
        } catch (error) {
            console.error(error)
            toast.error(error instanceof Error ? error.message : "Failed to save article")
        } finally {
            setSaving(false)
        }
    })

    const [previewContent, setPreviewContent] = useState<object | null>(null)
    useEffect(() => {
        if (previewMode && editor) setPreviewContent(editor.getJSON())
    }, [previewMode, editor])

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            const meta = event.metaKey || event.ctrlKey
            if (!meta) return

            if (event.key.toLowerCase() === "s") {
                event.preventDefault()
                handleSave()
            } else if (event.shiftKey && event.key.toLowerCase() === "p") {
                event.preventDefault()
                setPreviewMode((prev) => !prev)
            } else if (event.shiftKey && event.key.toLowerCase() === "f") {
                event.preventDefault()
                toggleFullscreen()
            }
        }

        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [handleSave, toggleFullscreen])

    if (!editor) {
        return <div className="min-h-[60vh] animate-pulse rounded-lg bg-muted" />
    }

    return (
        <div className={cn("flex flex-col", isFullscreen && "fixed inset-0 z-50 overflow-y-auto bg-background")}>
            <PublishBar
                status={status}
                mode={mode}
                saving={saving}
                autosaveStatus={autosaveStatus}
                words={wordStats.words}
                readingTime={wordStats.readingTime}
                isFullscreen={isFullscreen}
                onToggleFullscreen={toggleFullscreen}
                previewMode={previewMode}
                onTogglePreview={() => setPreviewMode((prev) => !prev)}
                onSave={handleSave}
            />

            <div className={cn("grid flex-1 gap-6 p-4", !isFullscreen && "lg:grid-cols-[1fr_320px]")}>
                <div className="min-w-0 overflow-hidden rounded-lg border border-border bg-card">
                    {previewMode ? (
                        <div className="p-6">
                            <ArticleContent content={previewContent} />
                        </div>
                    ) : (
                        <>
                            <Toolbar editor={editor} />
                            <EditorContent editor={editor} />
                        </>
                    )}
                </div>

                {!previewMode && (
                    <aside className="h-fit rounded-lg border border-border bg-card lg:sticky lg:top-16">
                        <MetadataSidebar form={form} articleId={articleId} categorySuggestions={categorySuggestions} />
                    </aside>
                )}
            </div>
        </div>
    )
}
