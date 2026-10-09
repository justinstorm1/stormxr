import { ConvexError, v } from "convex/values"

import { mutation, query } from "./_generated/server"
import { logActivity } from "./activity"
import { requireAuth } from "./authHelpers"

/**
 * Saves a contact form submission. Called only by the site's server action
 * (app/contact/actions.ts) after it has validated the form and checked the
 * reCAPTCHA; the shared secret keeps anyone else from writing here directly.
 */
export const submit = mutation({
  args: {
    secret: v.string(),
    name: v.string(),
    email: v.string(),
    phoneNumber: v.optional(v.string()),
    subject: v.string(),
    content: v.string(),
  },
  handler: async (ctx, { secret, ...message }) => {
    const expected = process.env.CONTACT_FORM_SECRET
    if (!expected || secret !== expected) throw new ConvexError("Forbidden")
    await ctx.db.insert("messages", { ...message, completed: false })
  },
})

export const list = query({
  args: {},
  handler: async (ctx) => {
    await requireAuth(ctx)
    return await ctx.db.query("messages").order("desc").collect()
  },
})

/** Unhandled messages, for the admin nav badge. */
export const openCount = query({
  args: {},
  handler: async (ctx) => {
    await requireAuth(ctx)
    const messages = await ctx.db.query("messages").collect()
    return messages.filter((m) => !m.completed).length
  },
})

export const setCompleted = mutation({
  args: { messageId: v.id("messages"), completed: v.boolean() },
  handler: async (ctx, { messageId, completed }) => {
    await requireAuth(ctx)
    await ctx.db.patch(messageId, { completed })
  },
})

export const remove = mutation({
  args: { messageId: v.id("messages") },
  handler: async (ctx, { messageId }) => {
    const userId = await requireAuth(ctx)
    const message = await ctx.db.get(messageId)
    if (!message) return
    await ctx.db.delete(messageId)
    await logActivity(ctx, {
      action: "message.delete",
      actorId: userId,
      targetTitle: `${message.name} <${message.email}>`,
      detail: message.subject,
    })
  },
})
