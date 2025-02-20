// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  colorMode: {
    preference: 'light'
  },
  ui: {
    global: true,
  }
})