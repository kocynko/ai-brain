<template>
  <div>
    <header class="container mx-auto flex items-center justify-between py-4">
      <div class="flex items-center justify-center gap-4">
        <NuxtLink href="/dashboard">
          <NuxtImg
            src="logo.png"
            width="50"
            height="50"
            alt="Logo image"
          ></NuxtImg
        ></NuxtLink>

        <h1 class="text-xl">AiBrain</h1>
        <nav>
          <NuxtLink href="/dashboard" class="hover:text-zinc-800"
            >Documents</NuxtLink
          >
        </nav>
      </div>
      <div class="flex items-center justify-between gap-4">
        <ModeToggle />
        <HeaderActions />
      </div>
    </header>
    <div class="container mx-auto">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import ModeToggle from "~/components/ui/ModeToggle.vue";
import HeaderActions from "~/components/HeaderActions.vue";
</script>
