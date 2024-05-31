<script setup>
import { SignInButton, UserButton, useAuth } from "vue-clerk";

const { isSignedIn } = useAuth();
</script>

<template>
  <header>
    <h1>My App</h1>
    <UserButton v-if="isSignedIn" />
    <SignInButton v-else />
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 20;
}
</style>
