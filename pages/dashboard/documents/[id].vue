<template>
  <main class="container w-full space-y-8">
    <div class="flex items-center justify-between">
      <div v-if="isLoading" class="flex w-full flex-col gap-4">
        <Skeleton class="h-[50px] w-[200px]" />
        <Skeleton class="h-[50px] w-[150px]" />
        <Skeleton class="h-[500px]" />
      </div>
      <div v-else-if="!isLoading && data" class="flex w-full flex-col gap-4">
        <h1 class="text-4xl font-bold">
          {{ data.title }}
        </h1>
        <Tabs default-value="document"
          ><div class="flex justify-between">
            <TabsList>
              <TabsTrigger value="document"> Document </TabsTrigger>
              <TabsTrigger value="chat"> Chat </TabsTrigger>
            </TabsList>
            <DeleteDocumentButton :documentId="data._id" />
          </div>
          <TabsContent value="document">
            <div class="flex gap-4">
              <div class="h-[500px] flex-1 rounded-xl bg-[#121212] p-4">
                <iframe
                  v-if="data?.documentUrl"
                  :src="data?.documentUrl"
                  class="h-full w-full"></iframe>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="chat">
            <ChatPanel v-if="data" :documentId="data?._id" />
          </TabsContent>
        </Tabs>
      </div>
      <div v-else><h1>You dont have access</h1></div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@convex-vue/core";
import type { Id } from "~/convex/_generated/dataModel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "~/components/ui/skeleton";

const route = useRoute();
const { data, isLoading, error } = useConvexQuery(api.documents.getDocument, {
  documentId: route.params.id as Id<"documents">,
});
</script>
