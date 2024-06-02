<script setup lang="ts">
import { api } from "@/convex/_generated/api";
import { useUser } from "vue-clerk";
import { ConvexQuery } from "@convex-vue/core";
import { Skeleton } from "~/components/ui/skeleton";

const { isSignedIn } = useUser();
if (!isSignedIn.value) {
  navigateTo("/sign-in");
}
</script>

<template>
  <ClientOnly>
    <main v-if="isSignedIn" class="space-y-8 p-24">
      <div class="flex items-center justify-between">
        <h1 class="text-4xl font-bold">My documents</h1>
        <UploadDocumentButton />
      </div>

      <ConvexQuery :query="api.documents.getDocuments" :args="{}">
        <template #loading
          ><div class="grid grid-cols-3 gap-8">
            <Card
              class="flex flex-col justify-between gap-2 p-6"
              v-for="i in 7"
              :key="i"
              ><Skeleton class="h-[40px] rounded" /><Skeleton
                class="h-[30px] rounded" /><Skeleton
                class="h-[40px] w-[80px] rounded"
            /></Card>
          </div>
        </template>

        <template #error="{ error }">{{ error }}</template>

        <template #empty
          ><div class="flex flex-col items-center justify-center gap-4 pt-24">
            <NuxtImg src="no_documents.svg" height="100" width="200" />
            <h2 class="text-2xl">You have no documents</h2>
            <UploadDocumentButton />
          </div>
        </template>

        <template #default="{ data: documents }">
          <div class="grid grid-cols-3 gap-8">
            <DocumentCard v-for="document in documents" :document="document" />
          </div>
        </template>
      </ConvexQuery></main
  ></ClientOnly>
</template>
