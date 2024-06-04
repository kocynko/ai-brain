import { ConvexError, v } from "convex/values";
import {
  action,
  internalAction,
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";

import OpenAI from "openai";
import { api, internal } from "./_generated/api";
import { Doc } from "./_generated/dataModel";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const embed = async (text: string) => {
  const emmbedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    dimensions: 1536,
    input: text,
  });
  return emmbedding.data[0].embedding;
};
export const setNoteEmbedding = internalMutation({
  args: {
    noteId: v.id("notes"),
    embedding: v.array(v.float64()),
  },
  async handler(ctx, args) {
    const note = await ctx.db.patch(args.noteId, {
      embedding: args.embedding,
    });
    return note;
  },
});

export const createNoteEmbedding = internalAction({
  args: {
    noteId: v.id("notes"),
    text: v.string(),
  },
  async handler(ctx, args) {
    const embedding = await embed(args.text);
    await ctx.runMutation(internal.notes.setNoteEmbedding, {
      noteId: args.noteId,
      embedding,
    });
  },
});

export const createNote = mutation({
  args: {
    text: v.string(),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new ConvexError("Not authenticated");
    }

    const noteId = await ctx.db.insert("notes", {
      tokenIdentifier: userId,
      text: args.text,
    });

    await ctx.scheduler.runAfter(0, internal.notes.createNoteEmbedding, {
      noteId: noteId,
      text: args.text,
    });
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
