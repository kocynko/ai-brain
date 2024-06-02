<template>
  <div class="flex h-[300px] w-[300px] flex-col gap-2 bg-[#121212] p-2">
    <div class="overflow-y-auto">
      <div class="bg-gray-800 p-4">Hello</div>
      <div class="bg-gray-800 p-4">World</div>
      <div class="bg-gray-800 p-4">World</div>
      <div class="bg-gray-800 p-4">World</div>
      <div class="bg-gray-800 p-4">World</div>
      <div class="bg-gray-800 p-4">World</div>
      <div class="bg-gray-800 p-4">World</div>
    </div>
    <div class="flex gap-1">
      <form
        @submit="
          (event) => {
            event.preventDefault();
            // call convex
          }
        "
      >
        <Input name="text"></Input> <Button>Submit</Button>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from "./ui/button/Button.vue";
import Input from "./ui/input/Input.vue";
</script>
