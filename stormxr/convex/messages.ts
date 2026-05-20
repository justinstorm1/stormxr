import { v } from 'convex/values';
import { mutation, query } from './_generated/server' 
import { getAuthUserId } from '@convex-dev/auth/server';

export const sendMessage = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        phoneNumber: v.optional(v.string()),
        subject: v.string(),
        content: v.string()
    },
    handler: async (ctx, { name, email, phoneNumber, subject, content }) => {
        const newMessage = { name, email, phoneNumber, subject, content, completed: false };
        await ctx.db.insert("messages", newMessage);
        return { success: true };
    }
});

export const getMessages = query({
    handler: async (ctx) => {
        const messages = ctx.db
            .query("messages")
            .order("desc")
            .collect();

        return messages;
    }
})

export const toggleCompleteMessage = mutation({
    args: {
        messageId: v.id("messages")
    },
    handler: async (ctx, { messageId }) => {
        const message = await ctx.db.get(messageId);
        if (!message) return;
        await ctx.db.patch(message._id, {
            completed: !message.completed
        })
        return { success: true };
    }
})

export const deleteMessage = mutation({
    args: {
        messageId: v.id("messages")
    },
    handler: async (ctx, { messageId }) => {
        await ctx.db.delete(messageId);
        return { success: true };
    }
})