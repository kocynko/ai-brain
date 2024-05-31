<script setup lang="ts">
import { api } from "@/convex/_generated/api";
import { SignInButton, UserButton, useAuth } from "vue-clerk";
import { useConvexMutation } from "@convex-vue/core";

const { isSignedIn } = useAuth();
const createDocument = useConvexMutation(api.documents.createDocument);
</script>

<template>
  <header>
    <h1>Hello from dashboard</h1>
    <UserButton v-if="isSignedIn" />
    <SignInButton v-else />
  </header>
  <main>
    <div v-if="isSignedIn">
      <button @click="() => createDocument.mutate({ title: 'Hello World' })">
        Click
      </button>
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
