<script setup lang="ts">
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "vue-clerk";
import { ConvexQuery, useConvexMutation } from "@convex-vue/core";

const { isLoaded, isSignedIn, user } = useUser();
const createDocument = useConvexMutation(api.documents.createDocument);
if (!isSignedIn.value) {
  navigateTo("/sign-in");
}
</script>

<template>
  <header>
    <h1>Hello, {{ user?.firstName }}</h1>
    <UserButton v-if="isSignedIn" />
  </header>
  <main v-if="isSignedIn">
    <button @click="() => createDocument.mutate({ title: 'Hello World' })">
      Click
    </button>
    <div>
      <ConvexQuery :query="api.documents.getDocuments" :args="{}">
        <template #loading>Loading documents</template>

        <template #error="{ error }">{{ error }}</template>

        <template #empty>No documents</template>

        <template #default="{ data: documents }">
          <ul>
            <li v-for="document in documents" :key="document._id" class="py-2">
              {{ document.title }}
            </li>
          </ul>
        </template>
      </ConvexQuery>
    </div>
  </main>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 20;
}
</style>
