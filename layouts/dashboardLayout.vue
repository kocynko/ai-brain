<template>
  <div class="container mx-auto flex gap-12 pt-12">
    <nav>
      <ul class="space-y-4">
        <li>
          <NuxtLink
            to="/dashboard/documents"
            class="text-l flex items-center gap-2 transition-colors hover:text-red-600"
            active-class="text-red-800">
            <Files :size="20" />Documents</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            to="/dashboard/notes"
            class="text-l flex items-center gap-2 transition-colors hover:text-red-600"
            active-class="text-red-800">
            <NotebookPen :size="20" /> Notes</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            to="/dashboard/settings"
            class="text-l flex items-center gap-2 transition-colors hover:text-red-600"
            active-class="text-red-800">
            <Settings :size="20" />Settings</NuxtLink
          >
        </li>
      </ul>
    </nav>

    <slot />
  </div>
</template>
<script setup lang="ts">
import { Files, NotebookPen, Settings } from "lucide-vue-next";
</script>
