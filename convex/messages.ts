import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const send = mutation({
    args: { body: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        console.log("🚀 ~ handler:async ~ identity:", identity);
        if (!identity) {
            throw new ConvexError("Unauthenticated call to mutation");
        }

        await ctx.db.insert("messages", {
            body: args.body,
            author: identity.name ?? "Unknown",
        });
    },
});

export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("messages").collect();
    },
});
