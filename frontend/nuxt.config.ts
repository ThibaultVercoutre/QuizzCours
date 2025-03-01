import { defineNuxtConfig } from 'nuxt/config';
import { fileURLToPath } from 'url';

export default defineNuxtConfig({
  modules: ['@nuxt/ui'],

  // @ts-ignore - La propriété ui est fournie par @nuxt/ui
  ui: {
    icons: 'all'
  },

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

  // Exposer les variables d'environnement au runtime
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL
    }
  },

  compatibilityDate: '2025-02-22'
})