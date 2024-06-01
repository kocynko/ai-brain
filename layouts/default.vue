<template>
  <div class="flex flex-col items-center justify-center gap-5">
    <header class="container mx-auto flex items-center justify-between py-4">
      <h1 class="text-xl">AiBrain</h1>
      <div v-if="isSignedIn" class="flex items-center justify-center gap-4">
        <h2>{{ user?.fullName }}</h2>
        <ModeToggle />
        <UserButton />
      </div>
    </header>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useUser, UserButton } from "vue-clerk";
import ModeToggle from "~/components/ui/ModeToggle.vue";

const { isSignedIn, user } = useUser();
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 20;
}
</style>
