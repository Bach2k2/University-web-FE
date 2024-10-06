// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000/api/v1',
      defaultHost: 'http://localhost:8000'
    }
  },

  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
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

})
