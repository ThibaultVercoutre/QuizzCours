import { defineNuxtConfig } from 'nuxt/config';
import { fileURLToPath } from 'url';

export default defineNuxtConfig({
  modules: ['@nuxt/ui'],

  // Commenté temporairement
  // colorMode: {
  //   preference: 'system',
  //   fallback: 'light',
  //   classSuffix: '-mode'
  // },

  app: {
    head: {
      title: 'QuizzCours'
    }
  },

  alias: {
    '@': fileURLToPath(new URL('.', import.meta.url)),
    '~': fileURLToPath(new URL('.', import.meta.url))
  },

  srcDir: '.',
  
  // Spécifier le dossier des layouts
  dir: {
    layouts: 'layout'
  },

  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
        '~': fileURLToPath(new URL('.', import.meta.url))
      }
    }
  },

  compatibilityDate: '2025-02-22'
})