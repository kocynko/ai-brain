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
    <Tabs default-value="document" class="w-full">
      <TabsList>
        <TabsTrigger value="document"> Document </TabsTrigger>
        <TabsTrigger value="chat"> Chat </TabsTrigger>
      </TabsList>
      <TabsContent value="document">
        <div class="flex gap-4">
          <div class="h-[500px] flex-1 rounded-xl bg-[#121212] p-4">
            <iframe
              v-if="data?.documentUrl"
              :src="data?.documentUrl"
              class="h-full w-full"
            ></iframe>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="chat">
        <ChatPanel v-if="data" :documentId="data?._id" />
      </TabsContent>
    </Tabs>
  </main>
</template>
<script setup lang="ts">
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@convex-vue/core";
import type { Id } from "~/convex/_generated/dataModel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const route = useRoute();
const { data, isLoading, error } = useConvexQuery(api.documents.getDocument, {
  documentId: route.params.id as Id<"documents">,
});
</script>
