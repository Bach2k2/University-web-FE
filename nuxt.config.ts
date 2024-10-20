// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr:false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000/api/v1',
      defaultHost: 'http://localhost:8000'
    }
  },
  css: [
    '~/assets/scss/element/index.scss',
    '~/assets/css/main.css',
  ],

  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@primevue/nuxt-module',
    '@element-plus/nuxt',
  ],

  pinia: {
    storesDirs: ['./stores/**', './stores/oauth/**'],
  },

  piniaPersistedstate: {
    storage: 'localStorage'
  },

  build: {
    transpile: ['pinia-plugin-persistedstate'],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  colorMode: {
    preference: 'light',
  },

  primevue: {
    options: {
      unstyled: true
    }
  },

  elementPlus:{
    importStyle:"scss"
  }

})