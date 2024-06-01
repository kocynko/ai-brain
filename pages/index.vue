<script setup lang="ts">
import { useUser } from "vue-clerk";

const { isSignedIn } = useUser();
if (isSignedIn.value) {
  navigateTo("/dashboard");
}
</script>

<template>
  <div>
    <h1>Home</h1>
    <NuxtLink to="/sign-in">Sign in</NuxtLink>
  </div>
</template>
