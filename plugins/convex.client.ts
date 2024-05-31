import { defineNuxtPlugin } from "nuxt/app";
import { createConvexVue } from "@convex-vue/core";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    createConvexVue({
      convexUrl: useRuntimeConfig().public.convexUrl as string,
    }),
  );
});
