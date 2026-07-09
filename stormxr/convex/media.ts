import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { requireAuth } from './authHelpers';

export const generateUploadUrl = mutation({
    args: {},
    handler: async (ctx) => {
        await requireAuth(ctx);
        return await ctx.storage.generateUploadUrl();
    }
});

export const saveMedia = mutation({
    args: {
        storageId: v.id("_storage"),
        kind: v.union(v.literal("image"), v.literal("video")),
        filename: v.string(),
        contentType: v.string(),
        size: v.number(),
        articleId: v.optional(v.id("articles"))
    },
    handler: async (ctx, args) => {
        const userId = await requireAuth(ctx);
        const mediaId = await ctx.db.insert("media", {
            ...args,
            uploadedBy: userId,
            createdAt: Date.now()
        });
        const url = await ctx.storage.getUrl(args.storageId);
        return { mediaId, url };
    }
});

export const getMediaUrl = query({
    args: { storageId: v.id("_storage") },
    handler: async (ctx, { storageId }) => {
        return await ctx.storage.getUrl(storageId);
    }
});

export const listMedia = query({
    args: { articleId: v.optional(v.id("articles")) },
    handler: async (ctx, { articleId }) => {
        const assets = articleId
            ? await ctx.db
                  .query("media")
                  .withIndex("by_articleId", (q) => q.eq("articleId", articleId))
                  .order("desc")
                  .collect()
            : await ctx.db.query("media").order("desc").collect();

        return await Promise.all(
            assets.map(async (asset) => ({
                ...asset,
                url: await ctx.storage.getUrl(asset.storageId)
            }))
        );
    }
});

export const deleteMedia = mutation({
    args: { mediaId: v.id("media") },
    handler: async (ctx, { mediaId }) => {
        await requireAuth(ctx);
        const asset = await ctx.db.get(mediaId);
        if (!asset) return { success: false };

        await ctx.storage.delete(asset.storageId);
        await ctx.db.delete(mediaId);
        return { success: true };
    }
});
