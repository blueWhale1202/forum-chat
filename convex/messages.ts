import { Id } from "./_generated/dataModel";
import { mutation, QueryCtx } from "./_generated/server";

import { ConvexError, v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

type Thread = {
    count: number;
    image: string | undefined;
    timestamp: number;
    name: string;
};

export const getMember = async (
    ctx: QueryCtx,
    workspaceId: Id<"workspaces">,
    userId: Id<"users">,
) => {
    return await ctx.db
        .query("members")
        .withIndex("by_user_id_workspace_id", (q) =>
            q.eq("userId", userId).eq("workspaceId", workspaceId),
        )
        .unique();
};

export const create = mutation({
    args: {
        body: v.string(),
        image: v.optional(v.id("_storage")),
        workspaceId: v.id("workspaces"),
        channelId: v.optional(v.id("channels")),
        conversationId: v.optional(v.id("conversations")),
        parentMessageId: v.optional(v.id("messages")),
    },
    handler: async (
        ctx,
        {
            body,
            image,
            workspaceId,
            channelId,
            conversationId,
            parentMessageId,
        },
    ) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        const member = await getMember(ctx, workspaceId, userId);

        if (!member) {
            throw new ConvexError("Unauthorized");
        }

        let _conversationId = conversationId;

        // Only possible if we are replying in a thread in 1:1 conversation
        if (!conversationId && !channelId && parentMessageId) {
            const parentMessage = await ctx.db.get(parentMessageId);

            if (!parentMessage) {
                throw new ConvexError("Parent message not found");
            }

            _conversationId = parentMessage.conversationId;
        }

        const messageId = await ctx.db.insert("messages", {
            body,
            image,
            channelId,
            workspaceId,
            parentMessageId,
            memberId: member._id,
            conversationId: _conversationId,
        });

        return messageId;
    },
});
