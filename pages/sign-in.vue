<script setup lang="ts">
import { dark } from "@clerk/themes";
import { SignIn } from "vue-clerk";

definePageMeta({
  middleware: ["public"],
  layout: false,
});

const choosedTheme = useColorMode().value;
</script>

<template>
  <div class="flex justify-center py-24">
    <ClientOnly>
      <SignIn
        fallback-redirect-url="/dashboard"
        :appearance="{
          baseTheme: choosedTheme === 'dark' ? dark : undefined,
        }" />
    </ClientOnly>
  </div>
</template>
