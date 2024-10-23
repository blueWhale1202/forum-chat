import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

import { getCurrentUserOrThrow } from "./users";

import { generateJoinCode } from "../src/lib/utils";

export const get = query({
    args: {},
    handler: async (ctx) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        const members = await ctx.db
            .query("members")
            .withIndex("by_user_id", (q) => q.eq("userId", userId))
            .collect();

        const workspaces = await Promise.all(
            members.map((member) => ctx.db.get(member.workspaceId)),
        );
        return workspaces;
    },
});

export const getById = query({
    args: {
        id: v.id("workspaces"),
    },
    handler: async (ctx, { id }) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        const member = await ctx.db
            .query("members")
            .withIndex("by_user_id_workspace_id", (q) =>
                q.eq("userId", userId).eq("workspaceId", id),
            )
            .unique();

        if (!member) {
            return null;
        }

        return await ctx.db.get(id);
    },
});

export const create = mutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx, { name }) => {
        const { userId } = await getCurrentUserOrThrow(ctx);
        const joinCode = generateJoinCode();

        const workspaceId = await ctx.db.insert("workspaces", {
            name,
            userId,
            joinCode,
        });

        await Promise.all([
            ctx.db.insert("members", {
                userId,
                workspaceId,
                role: "admin",
            }),
            ctx.db.insert("channels", {
                name: "general",
                workspaceId: workspaceId,
            }),
        ]);

        return workspaceId;
    },
});

export const update = mutation({
    args: {
        id: v.id("workspaces"),
        name: v.string(),
    },
    handler: async (ctx, { id, name }) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        const member = await ctx.db
            .query("members")
            .withIndex("by_user_id_workspace_id", (q) =>
                q.eq("userId", userId).eq("workspaceId", id),
            )
            .unique();

        if (!member || member.role !== "admin") {
            throw new ConvexError("Unauthorized");
        }

        await ctx.db.patch(id, { name });

        return id;
    },
});

export const remove = mutation({
    args: {
        id: v.id("workspaces"),
    },
    handler: async (ctx, { id }) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        const member = await ctx.db
            .query("members")
            .withIndex("by_user_id_workspace_id", (q) =>
                q.eq("userId", userId).eq("workspaceId", id),
            )
            .unique();

        if (!member || member.role !== "admin") {
            throw new ConvexError("Unauthorized");
        }

        const [members, channels, conversations, messages, reactions] =
            await Promise.all([
                ctx.db
                    .query("members")
                    .withIndex("by_workspace_id", (q) =>
                        q.eq("workspaceId", id),
                    )
                    .collect(),
                ctx.db
                    .query("channels")
                    .withIndex("by_workspace_id", (q) =>
                        q.eq("workspaceId", id),
                    )
                    .collect(),
                ctx.db
                    .query("conversations")
                    .withIndex("by_workspace_id", (q) =>
                        q.eq("workspaceId", id),
                    )
                    .collect(),
                ctx.db
                    .query("conversations")
                    .withIndex("by_workspace_id", (q) =>
                        q.eq("workspaceId", id),
                    )
                    .collect(),
                ctx.db
                    .query("messages")
                    .withIndex("by_workspace_id", (q) =>
                        q.eq("workspaceId", id),
                    )
                    .collect(),
                ctx.db
                    .query("reactions")
                    .withIndex("by_workspace_id", (q) =>
                        q.eq("workspaceId", id),
                    )
                    .collect(),
            ]);

        await Promise.all([
            ...members.map((member) => ctx.db.delete(member._id)),
            ...channels.map((channel) => ctx.db.delete(channel._id)),
            ...conversations.map((conversation) =>
                ctx.db.delete(conversation._id),
            ),
            ...messages.map((message) => ctx.db.delete(message._id)),
            ...reactions.map((reaction) => ctx.db.delete(reaction._id)),
        ]);

        await ctx.db.delete(id);

        return id;
    },
});
