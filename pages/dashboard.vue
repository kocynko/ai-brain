<script setup lang="ts">
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "vue-clerk";
import { ConvexQuery, useConvexMutation } from "@convex-vue/core";
import { Button } from "~/components/ui/button";

const { isLoaded, isSignedIn, user } = useUser();
const createDocument = useConvexMutation(api.documents.createDocument);
if (!isSignedIn.value) {
  navigateTo("/sign-in");
}
</script>

<template>
  <ClientOnly>
    <main v-if="isSignedIn">
      <Button @click="() => createDocument.mutate({ title: 'Hello World' })">
        Click on me
      </Button>
      <div class="text-center">
        <ConvexQuery :query="api.documents.getDocuments" :args="{}">
          <template #loading>Loading documents</template>

          <template #error="{ error }">{{ error }}</template>

          <template #empty>No documents</template>

          <template #default="{ data: documents }">
            <ul>
              <li
                v-for="document in documents"
                :key="document._id"
                class="py-2"
              >
                {{ document.title }}
              </li>
            </ul>
          </template>
        </ConvexQuery>
      </div>
    </main></ClientOnly
  >
</template>
