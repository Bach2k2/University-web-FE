// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  experimental: {
    appManifest: false,
  },

  runtimeConfig: {
    public: {
      // apiBase: "http://localhost:80/api/",
      apiBase: "https://glowworm-endless-gull.ngrok-free.app/api/",
    },
  },
  css: ["~/assets/scss/element/index.scss", "~/assets/css/main.css"],

  
  modules: [
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@primevue/nuxt-module",
    "@element-plus/nuxt",
    "nuxt-svgo",
    "nuxt-lodash",
    "dayjs-nuxt",
  ],

  pinia: {
    storesDirs: ["./stores/**", "./stores/oauth/**"],
  },

  piniaPersistedstate: {
    storage: "localStorage",
  },

  build: {
    transpile: ["pinia-plugin-persistedstate"],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  colorMode: {
    preference: "light",
  },

  primevue: {
    options: {
      unstyled: true,
    },
    components: {
      include: ["*"],
    },
  },

  elementPlus: {
    importStyle: "scss",
  },

  i18n: {
    vueI18n: "./localization/i18n.config.ts",
  },

  svgo: {
    defaultImport: "component",
    global: false,
  },
  lodash: {
    prefix: "_",
    prefixSkip: false,
    upperAfterPrefix: false,
  },

  dayjs: {
    plugins: ['customParseFormat', 'relativeTime', 'utc'],
  },

  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          api: "modern",
        },
      },
    },
    build: {
      manifest: "Frontend.manifest.json",
    },
    optimizeDeps: {
      include: ['dayjs', 'dayjs/plugin/*']
    },
  },

});