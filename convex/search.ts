import { ConvexError, v } from "convex/values";
import { action } from "./_generated/server";
import { embed } from "./notes";
import { Doc } from "./_generated/dataModel";
import { api } from "./_generated/api";

export const searchRecords = action({
  args: {
    searchText: v.string(),
  },
  async handler(ctx, args) {
    const embedding = await embed(args.searchText);
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new ConvexError("Not authenticated");
    }
    const noteResults = await ctx.vectorSearch("notes", "by_embedding", {
      vector: embedding,
      limit: 5,
      filter: (q) => q.eq("tokenIdentifier", userId),
    });
    const documentResults = await ctx.vectorSearch(
      "documents",
      "by_embedding",
      {
        vector: embedding,
        limit: 5,
        filter: (q) => q.eq("tokenIdentifier", userId),
      },
    );
    const records: (
      | {
          type: "notes";
          record: Doc<"notes">;
          score: number;
        }
      | { type: "documents"; record: Doc<"documents">; score: number }
    )[] = [];

    await Promise.all(
      noteResults.map(async (result) => {
        const note: Doc<"notes"> | null = await ctx.runQuery(
          api.notes.getNote,
          {
            noteId: result._id,
          },
        );
        if (!note) return;
        records.push({ record: note, type: "notes", score: result._score });
      }),
    );

    await Promise.all(
      documentResults.map(async (result) => {
        const document: Doc<"documents"> | null = await ctx.runQuery(
          api.documents.getDocument,
          {
            documentId: result._id,
          },
        );
        if (!document) return;
        records.push({
          record: document,
          type: "documents",
          score: result._score,
        });
      }),
    );
    records.sort((a, b) => b.score - a.score);
    return records;
  },
});
