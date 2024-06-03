<script setup lang="ts">
import { useUser } from "vue-clerk";

const { isSignedIn } = useUser();
if (!isSignedIn.value) {
  navigateTo("/sign-in");
}
</script>

<template>
  <NuxtLayout name="notes-layout"> <NuxtPage /></NuxtLayout>
</template>
