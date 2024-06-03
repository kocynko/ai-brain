<template>
  <main class="container w-full space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-4xl font-bold">Notes</h1>
      <CreateNoteButton />
    </div>
    <div class="flex gap-12">
      <div class="flex h-[500px] w-[200px] flex-col gap-4 overflow-y-auto px-4">
        <Card
          v-if="notesIsLoading"
          v-for="i in 3"
          class="flex h-[250px] w-full flex-col justify-evenly gap-2 p-4">
          <Skeleton class="h-[20px]" v-for="i in 7" />
        </Card>
        <NoteCard v-for="note in notes" :key="note._id" :note="note" v-else />
      </div>
      <div class="flex-1 rounded-xl bg-zinc-900">
        <slot />
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { useConvexQuery } from "@convex-vue/core";
import CreateNoteButton from "~/components/Notes/CreateNoteButton.vue";
import NoteCard from "~/components/Notes/NoteCard.vue";
import { api } from "~/convex/_generated/api";

const {
  data: notes,
  isLoading: notesIsLoading,
  error: notesEror,
} = useConvexQuery(api.notes.getNotes, {});
</script>
