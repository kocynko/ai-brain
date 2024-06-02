<template>
  <main class="space-y-8 p-24">
    <div class="flex items-center justify-between">
      <div v-if="isLoading">Loading document...</div>
      <div v-else>
        <div v-if="data">
          <h1 class="text-4xl font-bold">
            {{ data.title }}
          </h1>
        </div>
        <div v-else><h1>You dont have access</h1></div>
      </div>
    </div>
    <div class="flex gap-4">
      <div class="h-[300px] flex-1 rounded bg-[#121212] p-4">
        <iframe
          v-if="data?.documentUrl"
          :src="data?.documentUrl"
          class="h-full w-full"
        ></iframe>
      </div>
      <ChatPanel v-if="data" :documentId="data?._id" />
    </div>
  </main>
</template>
<script setup lang="ts">
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@convex-vue/core";
import type { Id } from "~/convex/_generated/dataModel";

const route = useRoute();
const { data, isLoading, error } = useConvexQuery(api.documents.getDocument, {
  documentId: route.params.id as Id<"documents">,
});
</script>
