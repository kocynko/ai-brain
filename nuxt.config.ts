// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
  ssr: false,
  modules: [
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
  ],
  plugins: ["~/plugins/convex.client.ts"],
  build: {
    transpile: ["vue-clerk", "@clerk/clerk-js"],
  },
  runtimeConfig: {
    public: {
      clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
      convexUrl: process.env.CONVEX_URL,
      apiKey: process.env.OPENAI_API_KEY,
    },
    clerkSecretKey: process.env.CLERK_SECRET_KEY,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  colorMode: {
    classSuffix: "",
  },
});
