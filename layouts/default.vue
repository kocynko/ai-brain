<template>
  <div class="flex flex-col items-center justify-center gap-5">
    <header class="container mx-auto flex items-center justify-between py-4">
      <div class="flex items-center justify-center gap-4">
        <NuxtImg
          src="logo.svg"
          width="50"
          height="50"
          alt="Logo image"
        ></NuxtImg>
        <h1 class="text-xl">AiBrain</h1>
      </div>
      <div class="flex items-center justify-between gap-4">
        <ModeToggle />
        <HeaderActions />
      </div>
    </header>
    <slot />
  </div>
</template>

<script setup lang="ts">
import ModeToggle from "~/components/ui/ModeToggle.vue";
import HeaderActions from "~/components/HeaderActions.client.vue";
</script>
