<script setup lang="ts">
import { useConvexQuery } from "@convex-vue/core";
import { useUser } from "vue-clerk";
import { api } from "~/convex/_generated/api";
import type { Id } from "~/convex/_generated/dataModel";
import Skeleton from "~/components/ui/skeleton/Skeleton.vue";

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
  <div>
    <Skeleton v-if="!note" class="h-[500px] w-full rounded-xl" />
    <div
      class="max-h-[500px] overflow-y-auto whitespace-pre-line p-4 text-lg"
      v-else>
      {{ note.text }}
    </div>
  </div>
</template>
