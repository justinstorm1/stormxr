import { v } from 'convex/values';
import { internalMutation, mutation, query } from './_generated/server'
import { requireAuth } from './authHelpers';

export const getArticles = query({
    handler: async (ctx) => {
        const articles = ctx.db
            .query("articles")
            .order("desc")
            .collect();

        if (!articles) {
            return [];
        }

        return articles;
    }
})

export const getArticle = query({
    args: { articleId: v.id("articles") },
    handler: async (ctx, args) => {
        const article = ctx.db.get(args.articleId);

        if (!article) return;

        return article;
    }
});

// Resolves either a real articles _id or a slug, so legacy id-based links and
// new slug-based links both work from the same public route.
export const getArticleByIdOrSlug = query({
    args: { idOrSlug: v.string() },
    handler: async (ctx, { idOrSlug }) => {
        const normalizedId = ctx.db.normalizeId("articles", idOrSlug);
        if (normalizedId) {
            const article = await ctx.db.get(normalizedId);
            if (article) return article;
        }

        return await ctx.db
            .query("articles")
            .withIndex("by_slug", (q) => q.eq("slug", idOrSlug))
            .first();
    }
});

export const checkSlugAvailable = query({
    args: { slug: v.string(), excludeArticleId: v.optional(v.id("articles")) },
    handler: async (ctx, { slug, excludeArticleId }) => {
        const existing = await ctx.db
            .query("articles")
            .withIndex("by_slug", (q) => q.eq("slug", slug))
            .first();

        if (!existing) return true;
        return existing._id === excludeArticleId;
    }
});

// --- Legacy UploadVR "link import" flow — args/behavior unchanged, auth added ---

export const addArticle = mutation({
    args: {
        headerImage: v.string(),
        title: v.string(),
        author: v.string(),
        link: v.string(),
        published: v.boolean(),
        date: v.number(),
        category: v.string()
    },
    handler: async (ctx, { headerImage, title, author, link, published, date, category }) => {
        await requireAuth(ctx);
        const newArticle = await ctx.db.insert("articles", {
            headerImage,
            title,
            author,
            link,
            published,
            date,
            category,
            source: "link",
            status: published ? "published" : "draft",
            updatedAt: Date.now()
        });
        return newArticle;
    }
});

export const editArticle = mutation({
    args: {
        articleId: v.id("articles"),
        headerImage: v.string(),
        title: v.string(),
        author: v.string(),
        link: v.string(),
        published: v.boolean(),
        date: v.number(),
        category: v.string()
    },
    handler: async (ctx, { articleId, headerImage, title, author, link, published, date, category }) => {
        await requireAuth(ctx);
        const article = await ctx.db.get(articleId);
        if (!article) return;

        await ctx.db.patch(article._id, {
            headerImage,
            title,
            author,
            link,
            published,
            date,
            category,
            source: "link",
            status: published ? "published" : "draft",
            updatedAt: Date.now()
        });
        return { success: true };
    }
});

export const deleteArticle = mutation({
    args: {
        articleId: v.id("articles")
    },
    handler: async (ctx, { articleId }) => {
        await requireAuth(ctx);

        const relatedMedia = await ctx.db
            .query("media")
            .withIndex("by_articleId", (q) => q.eq("articleId", articleId))
            .collect();
        for (const asset of relatedMedia) {
            await ctx.storage.delete(asset.storageId);
            await ctx.db.delete(asset._id);
        }

        await ctx.db.delete(articleId);
        return { success: true };
    }
})

// --- Native, in-house authored articles ---

const nativeArticleFields = {
    title: v.string(),
    slug: v.string(),
    author: v.string(),
    content: v.any(),
    excerpt: v.optional(v.string()),
    category: v.string(),
    tags: v.optional(v.array(v.string())),
    featured: v.optional(v.boolean()),
    status: v.union(v.literal("draft"), v.literal("scheduled"), v.literal("published")),
    scheduledFor: v.optional(v.number()),
    date: v.optional(v.number()),
    metaDescription: v.optional(v.string()),
    ogImageId: v.optional(v.id("media")),
    canonicalUrl: v.optional(v.string()),
    headerImage: v.optional(v.string())
};

export const createArticle = mutation({
    args: nativeArticleFields,
    handler: async (ctx, args) => {
        const userId = await requireAuth(ctx);

        const slug = args.slug.trim();
        if (!slug) throw new Error("Slug is required");
        const existing = await ctx.db
            .query("articles")
            .withIndex("by_slug", (q) => q.eq("slug", slug))
            .first();
        if (existing) throw new Error("That slug is already in use");

        const now = Date.now();
        const articleId = await ctx.db.insert("articles", {
            title: args.title,
            author: args.author,
            category: args.category,
            slug,
            content: args.content,
            excerpt: args.excerpt,
            tags: args.tags,
            featured: args.featured ?? false,
            status: args.status,
            scheduledFor: args.status === "scheduled" ? args.scheduledFor : undefined,
            metaDescription: args.metaDescription,
            ogImageId: args.ogImageId,
            canonicalUrl: args.canonicalUrl,
            headerImage: args.headerImage,
            published: args.status === "published",
            date: args.date ?? now,
            updatedAt: now,
            source: "native",
            authorId: userId
        });
        return articleId;
    }
});

export const updateArticle = mutation({
    args: { articleId: v.id("articles"), ...nativeArticleFields },
    handler: async (ctx, args) => {
        await requireAuth(ctx);
        const article = await ctx.db.get(args.articleId);
        if (!article) throw new Error("Article not found");

        const slug = args.slug.trim();
        if (!slug) throw new Error("Slug is required");
        const existing = await ctx.db
            .query("articles")
            .withIndex("by_slug", (q) => q.eq("slug", slug))
            .first();
        if (existing && existing._id !== args.articleId) throw new Error("That slug is already in use");

        await ctx.db.patch(args.articleId, {
            title: args.title,
            author: args.author,
            category: args.category,
            slug,
            content: args.content,
            excerpt: args.excerpt,
            tags: args.tags,
            featured: args.featured ?? false,
            status: args.status,
            scheduledFor: args.status === "scheduled" ? args.scheduledFor : undefined,
            metaDescription: args.metaDescription,
            ogImageId: args.ogImageId,
            canonicalUrl: args.canonicalUrl,
            headerImage: args.headerImage,
            published: args.status === "published",
            date: args.date ?? article.date,
            updatedAt: Date.now()
        });
        return { success: true };
    }
});

export const autosaveArticle = mutation({
    args: { articleId: v.id("articles"), content: v.any() },
    handler: async (ctx, { articleId, content }) => {
        await requireAuth(ctx);
        const article = await ctx.db.get(articleId);
        if (!article) return { success: false };

        await ctx.db.patch(articleId, { content, updatedAt: Date.now() });
        return { success: true };
    }
});

export const publishArticle = mutation({
    args: { articleId: v.id("articles") },
    handler: async (ctx, { articleId }) => {
        await requireAuth(ctx);
        const article = await ctx.db.get(articleId);
        if (!article) throw new Error("Article not found");

        await ctx.db.patch(articleId, {
            status: "published",
            published: true,
            scheduledFor: undefined,
            updatedAt: Date.now()
        });
        return { success: true };
    }
});

export const unpublishArticle = mutation({
    args: { articleId: v.id("articles") },
    handler: async (ctx, { articleId }) => {
        await requireAuth(ctx);
        const article = await ctx.db.get(articleId);
        if (!article) throw new Error("Article not found");

        await ctx.db.patch(articleId, {
            status: "draft",
            published: false,
            updatedAt: Date.now()
        });
        return { success: true };
    }
});

// Called on a cron (see convex/crons.ts) to flip due scheduled articles live.
export const publishScheduledArticles = internalMutation({
    args: {},
    handler: async (ctx) => {
        const now = Date.now();
        const scheduled = await ctx.db
            .query("articles")
            .withIndex("by_status", (q) => q.eq("status", "scheduled"))
            .collect();

        for (const article of scheduled) {
            if (article.scheduledFor !== undefined && article.scheduledFor <= now) {
                await ctx.db.patch(article._id, {
                    status: "published",
                    published: true,
                    updatedAt: now
                });
            }
        }
    }
});
