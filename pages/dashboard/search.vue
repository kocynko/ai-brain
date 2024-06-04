<script setup lang="ts">
import { api } from "@/convex/_generated/api";
import { File, NotebookPen } from "lucide-vue-next";
import { useUser } from "vue-clerk";
import Card from "~/components/ui/card/Card.vue";

const { isSignedIn } = useUser();
if (!isSignedIn.value) {
  navigateTo("/sign-in");
}
onMounted(() => {
  if (localStorage.getItem("searchResults")) {
    results.value = JSON.parse(localStorage.getItem("searchResults")!);
  }
});
const results = ref<typeof api.search.searchRecords._returnType>([]);
const setResults = (
  searchResults: typeof api.search.searchRecords._returnType,
) => {
  results.value = searchResults;
  localStorage.setItem("searchResults", JSON.stringify(searchResults));
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
        {{ result.score }}
        <NuxtLink
          v-if="result.type == 'notes'"
          :to="'/dashboard/notes/' + result.record._id">
          <Card
            class="h-[200px] w-[200px] rounded-xl bg-zinc-50 p-4 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 hover:dark:bg-zinc-600">
            <CardTitle class="flex items-center gap-2 pb-2"
              ><NotebookPen />Note</CardTitle
            >
            {{ result.record.text.substring(0, 125) + "..." }}</Card
          ></NuxtLink
        >
        <NuxtLink
          v-else-if="result.type == 'documents'"
          :to="'/dashboard/notes/' + result.record._id">
          <Card
            class="h-[200px] w-[200px] space-y-2 rounded-xl bg-zinc-100 p-4 transition-colors hover:bg-zinc-200 dark:bg-zinc-900 hover:dark:bg-zinc-600">
            <CardTitle class="flex items-center gap-2 pb-2"
              ><File :size="30" />{{ result.record.title }}</CardTitle
            >
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
