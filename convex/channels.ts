import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const get = query({
    args: {
        workspaceId: v.id("workspaces"),
    },
    handler: async (ctx, { workspaceId }) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        const member = await ctx.db
            .query("members")
            .withIndex("by_user_id_workspace_id", (q) =>
                q.eq("userId", userId).eq("workspaceId", workspaceId),
            )
            .unique();

        if (!member) {
            return [];
        }

        const channels = await ctx.db
            .query("channels")
            .withIndex("by_workspace_id", (q) =>
                q.eq("workspaceId", workspaceId),
            )
            .collect();

        return channels;
    },
});

export const create = mutation({
    args: {
        name: v.string(),
        workspaceId: v.id("workspaces"),
    },
    handler: async (ctx, { name, workspaceId }) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        const member = await ctx.db
            .query("members")
            .withIndex("by_user_id_workspace_id", (q) =>
                q.eq("userId", userId).eq("workspaceId", workspaceId),
            )
            .unique();

        if (!member || member.role !== "admin") {
            throw new ConvexError("Unauthorized");
        }

        const parsedName = name.replace(/\s+/g, "-").toLowerCase();

        const channelId = await ctx.db.insert("channels", {
            name: parsedName,
            workspaceId,
        });

        return channelId;
    },
});
