import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { query, QueryCtx } from "./_generated/server";

import { getCurrentUserOrThrow } from "./users";

const populateUser = async (ctx: QueryCtx, id: Id<"users">) => {
    return ctx.db.get(id);
};

export const current = query({
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

        return member;
    },
});

export const get = query({
    args: {
        workspaceId: v.id("workspaces"),
    },
    handler: async (ctx, { workspaceId }) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        if (!userId) {
            return [];
        }

        const members = await ctx.db
            .query("members")
            .withIndex("by_workspace_id", (q) =>
                q.eq("workspaceId", workspaceId),
            )
            .collect();

        const users = await Promise.all(
            members.map((member) => populateUser(ctx, member.userId)),
        );

        const data = members.map((member, index) => ({
            ...member,
            user: users[index]!,
        }));

        return data;
    },
});
