import { type Ref, computed, ref } from "vue";
import { type Resources } from "@clerk/types";
import { clerkPlugin } from "vue-clerk/plugin";
import { createConvexVue } from "@convex-vue/core";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(clerkPlugin, {
    publishableKey: useRuntimeConfig().public.clerkPublishableKey as string,
  });

  const authState: {
    isLoading: Ref<boolean>;
    session: Ref<Resources["session"]>;
  } = {
    isLoading: ref(true),
    session: ref(undefined),
  };

  nuxtApp.vueApp.config.globalProperties.$clerk.addListener((arg) => {
    authState.isLoading.value = false;
    authState.session.value = arg.session;
  });

  nuxtApp.vueApp.use(
    createConvexVue({
      convexUrl: useRuntimeConfig().public.convexUrl as string,
      auth: {
        isAuthenticated: computed(() => !!authState.session.value),
        isLoading: authState.isLoading,
        getToken: async ({
          forceRefreshToken,
        }: {
          forceRefreshToken: boolean;
        }) => {
          try {
            return await authState.session.value?.getToken({
              template: "convex",
              skipCache: forceRefreshToken,
            });
          } catch (error) {
            return null;
          }
        },
      },
    }),
  );
});
