<template>
  <ClientOnly>
    <div v-if="!isSignedIn"><NuxtLink to="/sign-in">Sign in</NuxtLink></div>
    <div v-else><UserButton /></div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useUser, UserButton } from "vue-clerk";

const { isSignedIn } = useUser();
</script>
