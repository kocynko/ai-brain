<template>
  <div class="flex flex-col items-center justify-center gap-5">
    <header class="flex h-4 w-1/2 items-center justify-between py-5">
      <h1 class="text-xl">Hello</h1>
      <div v-if="isSignedIn" class="flex items-center justify-center gap-2">
        <h2>{{ user?.fullName }}</h2>
        <UserButton />
      </div>
    </header>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useUser, UserButton } from "vue-clerk";

const { isSignedIn, user } = useUser();
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 20;
}
</style>
