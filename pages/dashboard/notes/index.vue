<template>
  <div v-if="data?.length === 0">
    <div class="flex flex-col items-center justify-center gap-4 pt-24">
      <NuxtImg src="no_notes.svg" height="100" width="200" />
      <h2 class="text-2xl">You have zero notes saved</h2>
      <CreateNoteButton />
    </div>
  </div>
  <div class="flex flex-1 items-center justify-center" v-else>
    <h1 class="font-bol text-3xl">Please select note</h1>
  </div>
</template>
<script setup lang="ts">
import { useConvexQuery } from "@convex-vue/core";
import CreateNoteButton from "~/components/Notes/CreateNoteButton.vue";
import { api } from "~/convex/_generated/api";

const { data, isLoading, error } = useConvexQuery(api.notes.getNotes, {});
console.log(data);
</script>
