import { getAuthUserId } from "@convex-dev/auth/server";
import { query, mutation } from "./_generated/server";
import { v } from 'convex/values'

export const getUser = query({
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) return;
        const user = await ctx.db.get(userId);
        if (!user) return;
        return user;
    }
})

export const getUsers = query({
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) return;
        const user = await ctx.db.get(userId);
        if (!user) return;
        const users = await ctx.db
            .query("users")
            .order("desc")
            .collect();
        return users;
    }
})

export const deleteUser = mutation({
    args: {
        userId: v.id("users")
    },
    handler: async (ctx, { userId }) => {
        const requesterId = await getAuthUserId(ctx);
        if (!requesterId) throw new Error("Not authenticated");

        // Delete target user's sessions (signs them out)
        const sessions = await ctx.db
            .query("authSessions")
            .withIndex("userId", (q) => q.eq("userId", userId))
            .collect();
        await Promise.all(sessions.map((s) => ctx.db.delete(s._id)));

        // Delete target user's auth accounts
        const accounts = await ctx.db
            .query("authAccounts")
            .withIndex("userIdAndProvider", (q) => q.eq("userId", userId))
            .collect();
        await Promise.all(accounts.map((a) => ctx.db.delete(a._id)));

        // Delete the user record
        await ctx.db.delete(userId);

        return { success: true };
    }
});