<template>
  <div v-if="data?.length === 0">You have zero notes</div>
  <div class="flex flex-1 items-center justify-center" v-else>
    <h1 class="font-bol text-3xl">Please select note</h1>
  </div>
</template>
<script setup lang="ts">
import { useConvexQuery } from "@convex-vue/core";
import { api } from "~/convex/_generated/api";

const { data, isLoading, error } = useConvexQuery(api.notes.getNotes, {});
console.log(data);
</script>
