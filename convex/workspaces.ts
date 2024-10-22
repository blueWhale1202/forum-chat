import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

import { getCurrentUserOrThrow } from "./users";

import { generateJoinCode } from "../src/lib/utils";

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("workspaces").order("desc").collect();
    },
});

export const create = mutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx, { name }) => {
        const { _id: userId } = await getCurrentUserOrThrow(ctx);
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
