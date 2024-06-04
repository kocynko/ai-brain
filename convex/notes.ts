import { ConvexError, v } from "convex/values";
import { internalQuery, mutation, query } from "./_generated/server";

export const createNote = mutation({
  args: {
    text: v.string(),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new ConvexError("Not authenticated");
    }
    const note = await ctx.db.insert("notes", {
      tokenIdentifier: userId,
      text: args.text,
    });
    return note;
  },
});

export const getNotes = query({
  async handler(ctx) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) throw new ConvexError("Not authenticated");

    const notes = await ctx.db
      .query("notes")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
      .collect();
    return notes;
  },
});

export const getNote = query({
  args: {
    noteId: v.id("notes"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      return null;
    }
    const note = await ctx.db.get(args.noteId);

    if (!note) {
      return null;
    }

    if (note.tokenIdentifier !== userId) {
      return null;
    }
    return note;
  },
});

export const deleteNote = mutation({
  args: {
    noteId: v.id("notes"),
  },
  async handler(ctx, args) {
    const note = await ctx.db.get(args.noteId);
    if (!note) {
      throw new ConvexError("Note not found");
    }
    await ctx.db.delete(args.noteId);
  },
});
