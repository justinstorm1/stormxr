import { authTables } from '@convex-dev/auth/server'
import { defineTable, defineSchema } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
    ...authTables,
    articles: defineTable({
        // legacy / shared fields (UploadVR link-import flow)
        headerImage: v.optional(v.string()),
        title: v.string(),
        author: v.string(),
        link: v.optional(v.string()),
        published: v.boolean(),
        date: v.number(),
        category: v.string(),

        // new fields for native, in-house authored articles
        source: v.optional(v.union(v.literal('link'), v.literal('native'))),
        status: v.optional(v.union(v.literal('draft'), v.literal('scheduled'), v.literal('published'))),
        slug: v.optional(v.string()),
        content: v.optional(v.any()),
        excerpt: v.optional(v.string()),
        tags: v.optional(v.array(v.string())),
        featured: v.optional(v.boolean()),
        scheduledFor: v.optional(v.number()),
        metaDescription: v.optional(v.string()),
        ogImageId: v.optional(v.id('media')),
        canonicalUrl: v.optional(v.string()),
        authorId: v.optional(v.id('users')),
        updatedAt: v.optional(v.number())
    })
        .index('by_slug', ['slug'])
        .index('by_status', ['status'])
        .index('by_category', ['category']),
    media: defineTable({
        storageId: v.id('_storage'),
        kind: v.union(v.literal('image'), v.literal('video')),
        filename: v.string(),
        contentType: v.string(),
        size: v.number(),
        articleId: v.optional(v.id('articles')),
        uploadedBy: v.id('users'),
        createdAt: v.number()
    })
        .index('by_articleId', ['articleId'])
        .index('by_uploadedBy', ['uploadedBy']),
    messages: defineTable({
        name: v.string(),
        email: v.string(),
        phoneNumber: v.optional(v.string()),
        subject: v.string(),
        content: v.string(),
        completed: v.boolean()
    })
})
