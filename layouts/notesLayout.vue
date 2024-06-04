<template>
  <main class="container w-full space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-4xl font-bold">Notes</h1>
      <div class="flex items-center gap-4">
        <DeleteNoteButton :note-id="currentNoteId" v-if="currentNoteId" />
        <CreateNoteButton />
      </div>
    </div>
    <div class="flex gap-12">
      <div class="flex h-[500px] w-[250px] flex-col gap-4 overflow-y-auto px-4">
        <Card
          v-if="notesIsLoading"
          v-for="i in 3"
          class="flex h-[150px] w-full flex-col justify-evenly gap-2 p-4">
          <Skeleton class="h-[20px]" v-for="i in 7" />
        </Card>
        <NoteCard v-for="note in notes" :key="note._id" :note="note" v-else />
      </div>

      <slot />
    </div>
  </main>
</template>
<script setup lang="ts">
import { useConvexQuery } from "@convex-vue/core";
import CreateNoteButton from "~/components/Notes/CreateNoteButton.vue";
import NoteCard from "~/components/Notes/NoteCard.vue";
import { api } from "~/convex/_generated/api";
import DeleteNoteButton from "~/components/Notes/DeleteNoteButton.vue";
import type { Id } from "~/convex/_generated/dataModel";

const {
  data: notes,
  isLoading: notesIsLoading,
  error: notesEror,
} = useConvexQuery(api.notes.getNotes, {});
const currentNoteId = computed(() => useRoute().params.id as Id<"notes">);
</script>
