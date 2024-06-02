<script setup lang="ts">
import { api } from "@/convex/_generated/api";
import { useUser } from "vue-clerk";
import { ConvexQuery } from "@convex-vue/core";

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

      <div class="grid grid-cols-4 gap-8">
        <ConvexQuery :query="api.documents.getDocuments" :args="{}">
          <template #loading>Loading documents</template>

          <template #error="{ error }">{{ error }}</template>

          <template #empty>No documents</template>

          <template #default="{ data: documents }">
            <DocumentCard v-for="document in documents" :document="document" />
          </template>
        </ConvexQuery>
      </div></main
  ></ClientOnly>
</template>
