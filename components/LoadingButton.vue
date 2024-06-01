<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";
import Button from "./ui/button/Button.vue";
const props = defineProps<{
  isLoading: boolean;
  loadingText: string;
}>();
</script>

<template>
  <Button type="submit" :disabled="isLoading" class="flex items-center gap-1">
    <Loader2 class="animate-spin" v-if="isLoading" />
    <span v-if="isLoading">{{ loadingText }}</span>
    <slot v-else />
  </Button>
</template>
