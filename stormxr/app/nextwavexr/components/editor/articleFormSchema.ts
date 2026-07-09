import { z } from "zod"
import slugify from "slugify"

export const articleFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z
        .string()
        .min(1, "Slug is required")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
    author: z.string().min(1, "Author is required"),
    excerpt: z.string().max(300, "Keep excerpts under 300 characters").optional(),
    category: z.string().min(1, "Category is required"),
    tags: z.array(z.string()),
    featured: z.boolean(),
    status: z.enum(["draft", "scheduled", "published"]),
    scheduledFor: z.number().optional(),
    date: z.number(),
    metaDescription: z.string().max(160, "Keep meta descriptions under 160 characters").optional(),
    canonicalUrl: z.string().optional(),
    headerImage: z.string().optional()
})

export type ArticleFormValues = z.infer<typeof articleFormSchema>

export const defaultArticleFormValues: ArticleFormValues = {
    title: "",
    slug: "",
    author: "",
    excerpt: "",
    category: "",
    tags: [],
    featured: false,
    status: "draft",
    scheduledFor: undefined,
    date: Date.now(),
    metaDescription: "",
    canonicalUrl: "",
    headerImage: ""
}

export function slugifyTitle(title: string) {
    return slugify(title, { lower: true, strict: true, trim: true })
}
