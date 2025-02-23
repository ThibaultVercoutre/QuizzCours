import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  modules: ['@nuxt/ui'],

  app: {
    head: {
      title: 'QuizzCours'
    }
  },

  compatibilityDate: '2025-02-22'
})