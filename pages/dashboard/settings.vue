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
  <main class="container w-full space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-4xl font-bold">Settings</h1>
    </div>
  </main>
</template>
