"use client"

import { useEffect, useState } from "react"
import { Controller, type UseFormReturn } from "react-hook-form"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { type ArticleFormValues, slugifyTitle } from "./articleFormSchema"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import DatePicker from "../DatePicker"
import { MediaLibraryDialog } from "./MediaLibraryDialog"
import Image from "next/image"
import { AlertCircle, ImageIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function MetadataSidebar({
    form,
    articleId,
    categorySuggestions
}: {
    form: UseFormReturn<ArticleFormValues>
    articleId: Id<"articles"> | null
    categorySuggestions: string[]
}) {
    const {
        register,
        control,
        watch,
        setValue,
        formState: { errors }
    } = form

    const [slugTouched, setSlugTouched] = useState(false)
    const [tagInput, setTagInput] = useState("")
    const [mediaOpen, setMediaOpen] = useState(false)
    const [debouncedSlug, setDebouncedSlug] = useState("")

    const title = watch("title")
    const slug = watch("slug")
    const tags = watch("tags")
    const status = watch("status")
    const headerImage = watch("headerImage")
    const metaDescription = watch("metaDescription")

    useEffect(() => {
        if (!slugTouched) setValue("slug", slugifyTitle(title || ""))
    }, [title, slugTouched, setValue])

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedSlug(slug), 400)
        return () => clearTimeout(timeout)
    }, [slug])

    const slugAvailable = useQuery(
        api.articles.checkSlugAvailable,
        debouncedSlug ? { slug: debouncedSlug, excludeArticleId: articleId ?? undefined } : "skip"
    )

    const addTag = () => {
        const value = tagInput.trim()
        if (value && !tags.includes(value)) setValue("tags", [...tags, value])
        setTagInput("")
    }

    return (
        <FieldGroup className="p-4">
            <Field>
                <FieldLabel htmlFor="meta-title">Title</FieldLabel>
                <Textarea id="meta-title" rows={2} placeholder="Article title" {...register("title")} />
                <FieldError errors={[errors.title]} />
            </Field>

            <Field>
                <FieldLabel htmlFor="meta-slug">Slug</FieldLabel>
                <Input
                    id="meta-slug"
                    placeholder="article-slug"
                    {...register("slug", {
                        onChange: (e) => {
                            setSlugTouched(true)
                            setValue("slug", slugifyTitle(e.target.value))
                        }
                    })}
                />
                <FieldDescription>/nextwavexr/articles/{slug || "…"}</FieldDescription>
                {debouncedSlug && slugAvailable === false && (
                    <FieldError>
                        <span className="flex items-center gap-1">
                            <AlertCircle className="size-3.5" /> That slug is already in use
                        </span>
                    </FieldError>
                )}
                <FieldError errors={[errors.slug]} />
            </Field>

            <Field>
                <FieldLabel htmlFor="meta-author">Author</FieldLabel>
                <Input id="meta-author" placeholder="Author name" {...register("author")} />
                <FieldError errors={[errors.author]} />
            </Field>

            <Controller
                control={control}
                name="date"
                render={({ field }) => (
                    <DatePicker value={new Date(field.value)} onChange={(d) => d && field.onChange(d.getTime())} />
                )}
            />

            <Field>
                <FieldLabel htmlFor="meta-excerpt">Excerpt</FieldLabel>
                <Textarea
                    id="meta-excerpt"
                    rows={3}
                    placeholder="A short summary shown in article lists"
                    {...register("excerpt")}
                />
                <FieldError errors={[errors.excerpt]} />
            </Field>

            <Field>
                <FieldLabel htmlFor="meta-category">Category</FieldLabel>
                <Input id="meta-category" list="category-suggestions" placeholder="e.g. Reviews" {...register("category")} />
                <datalist id="category-suggestions">
                    {categorySuggestions.map((category) => (
                        <option key={category} value={category} />
                    ))}
                </datalist>
                <FieldError errors={[errors.category]} />
            </Field>

            <Field>
                <FieldLabel htmlFor="meta-tags">Tags</FieldLabel>
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setValue(
                                            "tags",
                                            tags.filter((t) => t !== tag)
                                        )
                                    }
                                    aria-label={`Remove ${tag}`}
                                >
                                    <X className="size-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                )}
                <Input
                    id="meta-tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === ",") {
                            e.preventDefault()
                            addTag()
                        }
                    }}
                    placeholder="Add a tag and press Enter"
                />
            </Field>

            <Field orientation="horizontal">
                <FieldContent>
                    <FieldLabel htmlFor="meta-featured">Featured article</FieldLabel>
                    <FieldDescription>Highlight this article at the top of the articles page</FieldDescription>
                </FieldContent>
                <Controller
                    control={control}
                    name="featured"
                    render={({ field }) => (
                        <Switch id="meta-featured" checked={field.value} onCheckedChange={field.onChange} />
                    )}
                />
            </Field>

            <FieldSeparator>Featured image</FieldSeparator>

            <Field>
                {headerImage ? (
                    <div className="relative">
                        <Image
                            src={headerImage}
                            alt="Featured"
                            width={400}
                            height={225}
                            className="w-full rounded-lg object-cover"
                        />
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            className="absolute right-2 bottom-2"
                            onClick={() => setMediaOpen(true)}
                        >
                            Change
                        </Button>
                    </div>
                ) : (
                    <Button type="button" variant="outline" onClick={() => setMediaOpen(true)}>
                        <ImageIcon />
                        Choose featured image
                    </Button>
                )}
            </Field>

            <FieldSeparator>Publishing</FieldSeparator>

            <Controller
                control={control}
                name="status"
                render={({ field }) => (
                    <Field>
                        <FieldLabel>Status</FieldLabel>
                        <div className="flex gap-1 rounded-lg bg-muted p-1">
                            {(["draft", "scheduled", "published"] as const).map((value) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => field.onChange(value)}
                                    className={cn(
                                        "flex-1 rounded-md px-2 py-1 text-sm capitalize transition-colors",
                                        field.value === value && "bg-background shadow-sm"
                                    )}
                                >
                                    {value}
                                </button>
                            ))}
                        </div>
                    </Field>
                )}
            />

            {status === "scheduled" && (
                <Controller
                    control={control}
                    name="scheduledFor"
                    render={({ field }) => (
                        <DatePicker
                            id="scheduled-for"
                            label="Scheduled for"
                            value={field.value ? new Date(field.value) : undefined}
                            onChange={(d) => field.onChange(d?.getTime())}
                        />
                    )}
                />
            )}

            <FieldSeparator>SEO</FieldSeparator>

            <Field>
                <FieldLabel htmlFor="meta-description">Meta description</FieldLabel>
                <Textarea
                    id="meta-description"
                    rows={3}
                    placeholder="Shown in search engine results"
                    {...register("metaDescription")}
                />
                <FieldDescription>{(metaDescription ?? "").length}/160 characters</FieldDescription>
                <FieldError errors={[errors.metaDescription]} />
            </Field>

            <Field>
                <FieldLabel htmlFor="meta-canonical">Canonical URL</FieldLabel>
                <Input id="meta-canonical" placeholder="https://…" {...register("canonicalUrl")} />
            </Field>

            <Field>
                <FieldLabel>Social share preview</FieldLabel>
                <div className="overflow-hidden rounded-lg border border-border">
                    {headerImage && (
                        <Image
                            src={headerImage}
                            alt=""
                            width={400}
                            height={210}
                            className="h-32 w-full object-cover"
                        />
                    )}
                    <div className="p-2.5">
                        <p className="truncate text-xs text-muted-foreground">nextwavexr.com</p>
                        <p className="truncate text-sm font-semibold">{title || "Article title"}</p>
                        <p className="line-clamp-2 text-xs text-muted-foreground">
                            {metaDescription || "Meta description preview…"}
                        </p>
                    </div>
                </div>
            </Field>

            <MediaLibraryDialog
                open={mediaOpen}
                onOpenChange={setMediaOpen}
                kind="image"
                onSelect={(asset) => {
                    if (asset.url) setValue("headerImage", asset.url)
                    setMediaOpen(false)
                }}
            />
        </FieldGroup>
    )
}
