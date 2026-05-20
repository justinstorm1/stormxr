import { v } from 'convex/values';
import { mutation, query } from './_generated/server' 

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
        const newArticle = await ctx.db.insert("articles", {
            headerImage,
            title,
            author,
            link,
            published,
            date,
            category
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
        const article = await ctx.db.get(articleId);
        if (!article) return;

        await ctx.db.patch(article?._id, {
            headerImage,
            title,
            author,
            link,
            published,
            date,
            category
        });
        return { success: true };
    }
});

export const deleteArticle = mutation({
    args: {
        articleId: v.id("articles")
    },
    handler: async (ctx, { articleId }) => {
        await ctx.db.delete(articleId);
        return { success: true };
    }
})