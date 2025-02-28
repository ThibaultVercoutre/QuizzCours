// app.config.ts
// La fonction defineAppConfig est injectée globalement par Nuxt
// TypeScript peut ne pas la reconnaître mais elle sera disponible à l'exécution

// @ts-ignore - defineAppConfig est disponible globalement dans Nuxt 3
export default defineAppConfig({
  ui: {
    icons: {
      dynamic: true,
      collections: {
        heroicons: {
          prefix: 'heroicons',
          icons: {
            outline: true,
            solid: true,
            mini: true
          }
        }
      }
    },
    notifications: {
      position: 'top-right',
      duration: 3000
    }
  }
}) 