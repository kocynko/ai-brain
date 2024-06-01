<script setup lang="ts">
import { useUser } from "vue-clerk";

const { isSignedIn } = useUser();
if (isSignedIn.value) {
  navigateTo("/dashboard");
}
</script>

<template>
  <div>Index</div>
</template>
