<template>
  <ClientOnly fallbackTag="span">
    <div v-if="!isSignedIn"><NuxtLink to="/sign-in">Sign in</NuxtLink></div>
    <div v-else>
      <UserButton
        :appearance="{
          baseTheme: choosedTheme === 'dark' ? dark : undefined,
        }" />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { dark } from "@clerk/themes";
import { useUser, UserButton } from "vue-clerk";

const { isSignedIn } = useUser();
const choosedTheme = computed(() => useColorMode().value);
</script>
