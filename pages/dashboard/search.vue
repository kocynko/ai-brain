<script setup lang="ts">
import { api } from "@/convex/_generated/api";
import { useUser } from "vue-clerk";
import Card from "~/components/ui/card/Card.vue";

const { isSignedIn } = useUser();
if (!isSignedIn.value) {
  navigateTo("/sign-in");
}
const results = ref<typeof api.search.searchRecords._returnType>([]);
const setResults = (data: typeof api.search.searchRecords._returnType) => {
  results.value = data;
};
</script>

<template>
  <main class="container w-full space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-4xl font-bold">Search</h1>
    </div>
    <SearchForm :set-results="setResults" />
    <ul class="grid grid-cols-4">
      <li v-for="result in results">
        <NuxtLink
          v-if="result.type == 'notes'"
          :to="'/dashboard/notes/' + result.record._id">
          <Card
            class="h-[200px] w-[200px] rounded p-4 transition-colors dark:bg-zinc-800 hover:dark:bg-zinc-600">
            {{ result.record.text.substring(0, 125) + "..." }}</Card
          ></NuxtLink
        >
        <NuxtLink
          v-else-if="result.type == 'documents'"
          :to="'/dashboard/notes/' + result.record._id">
          <Card
            class="h-[200px] w-[200px] space-y-2 rounded p-4 transition-colors dark:bg-zinc-900 hover:dark:bg-zinc-600">
            <CardTitle>{{ result.record.title }}</CardTitle>
            <CardDescription>{{
              result.record.description.length < 100
                ? result.record.description
                : result.record.description.substring(0, 100) + "..."
            }}</CardDescription></Card
          ></NuxtLink
        >
      </li>
    </ul>
  </main>
</template>
