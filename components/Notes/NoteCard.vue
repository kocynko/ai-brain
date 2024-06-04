<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import type { Doc } from "~/convex/_generated/dataModel";

defineProps<{
  note: Doc<"notes">;
}>();
const noteId = computed(() => useRoute().params.id as string);
</script>

<template>
  <NuxtLink :href="'/dashboard/notes/' + note._id"
    ><Card
      class="transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
      :class="[noteId == note._id ? 'bg-zinc-300 dark:bg-zinc-700' : '']">
      <CardContent class="p-6"
        >{{ note.text.substring(0, 50) + (note.text.length > 50 ? "..." : "") }}
      </CardContent>
    </Card>
  </NuxtLink>
</template>
