<script setup lang="ts">
import { useConvexQuery } from "@convex-vue/core";
import { Loader2 } from "lucide-vue-next";
import { useUser } from "vue-clerk";
import { api } from "~/convex/_generated/api";
import type { Id } from "~/convex/_generated/dataModel";

const { isSignedIn } = useUser();
if (!isSignedIn.value) {
  navigateTo("/sign-in");
}
const route = useRoute();
const {
  data: note,
  isLoading: noteIsLoading,
  error: noteError,
} = useConvexQuery(api.notes.getNote, {
  noteId: route.params.id as Id<"notes">,
});
</script>

<template>
  <div
    class="flex-1 rounded-xl bg-zinc-100 transition-colors dark:bg-zinc-900"
    v-if="note">
    <div class="max-h-[500px] overflow-y-auto whitespace-pre-line p-4 text-lg">
      {{ note.text }}
    </div>
  </div>
  <div
    v-else-if="noteIsLoading"
    class="flex flex-1 items-center justify-center rounded-xl bg-zinc-100 transition-colors dark:bg-zinc-900">
    <Loader2 v-if="noteIsLoading" class="h-16 w-16 animate-spin rounded-xl" />
  </div>
  <div v-else>
    <h2 class="text-2xl">
      This note does not exist or you do not have access.
    </h2>
  </div>
</template>
