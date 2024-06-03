<template>
  <div>
    <header class="container mx-auto flex items-center justify-between py-4">
      <div class="flex items-center justify-center gap-8">
        <NuxtLink
          href="/dashboard/documents"
          class="flex items-center justify-center gap-2">
          <NuxtImg
            src="logo.png"
            width="50"
            height="50"
            alt="Logo image"></NuxtImg>
        </NuxtLink>
        <h1 class="text-2xl">AiBrain</h1>

        <nav>
          <NuxtLink
            href="/dashboard"
            class="ml-4 text-2xl transition-colors hover:text-red-600"
            >Documents</NuxtLink
          >
        </nav>
      </div>
      <ClientOnly>
        <div class="flex items-center justify-between gap-4">
          <ModeToggle />
          <HeaderActions />
        </div>
      </ClientOnly>
    </header>
    <div class="container mx-auto">
      <slot />
    </div>
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import ModeToggle from "~/components/ModeToggle.vue";
import HeaderActions from "~/components/HeaderActions.vue";
</script>
