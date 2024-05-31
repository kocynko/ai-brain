import { Clerk, provideClerkToApp } from "vue-clerk/plugin";
import { type Ref, computed, ref } from "vue";
import { type Resources } from "@clerk/types";
import { createConvexVue } from "@convex-vue/core";

export default defineNuxtPlugin(async (nuxtApp) => {
  const isClerkLoaded = ref(false);
  const publishableKey = useRuntimeConfig().public
    .clerkPublishableKey as string;

  const clerk = new Clerk(publishableKey);

  // Instead of using the `vue-clerk` plugin, we can use this internal function to create a Clerk instance.
  provideClerkToApp(nuxtApp.vueApp, clerk, {
    isClerkLoaded,
    shouldLoadClerk: false,
    clerkOptions: {}, // Optional since we run `clerk.load` manually
  });

  // This will make sure that the clerk library is loaded in the client first before moving on to the next middleware.
  await clerk.load({
    routerPush: (to) => {
      return navigateTo(to);
    },
    routerReplace: (to) => {
      return navigateTo(to, { replace: true });
    },
    // localization: frFR,
    // appearance: {}
  });

  isClerkLoaded.value = true;

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

  return {
    provide: {
      clerk,
    },
  };
});
