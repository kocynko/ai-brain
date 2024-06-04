<template>
  <div class="container mx-auto flex gap-12 pt-12">
    <nav>
      <ul class="space-y-4">
        <li>
          <NuxtLink
            to="/dashboard/search"
            class="text-l flex items-center gap-2 transition-colors hover:text-cyan-300"
            active-class="text-cyan-400">
            <Search :size="20" />Search</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            to="/dashboard/documents"
            class="text-l flex items-center gap-2 transition-colors hover:text-cyan-300"
            active-class="text-cyan-400">
            <Files :size="20" />Documents</NuxtLink
          >
        </li>

        <li>
          <NuxtLink
            to="/dashboard/notes"
            class="text-l flex items-center gap-2 transition-colors hover:text-cyan-300"
            active-class="text-cyan-400">
            <NotebookPen :size="20" /> Notes</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            to="/dashboard/settings"
            class="text-l flex items-center gap-2 transition-colors hover:text-cyan-300"
            active-class="text-cyan-400">
            <Settings :size="20" />Settings</NuxtLink
          >
        </li>
      </ul>
    </nav>

    <slot />
  </div>
</template>
<script setup lang="ts">
import { Files, NotebookPen, Search, Settings } from "lucide-vue-next";
</script>
