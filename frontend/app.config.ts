// app.config.ts
// La fonction defineAppConfig est injectée globalement par Nuxt
// TypeScript peut ne pas la reconnaître mais elle sera disponible à l'exécution

// @ts-ignore - defineAppConfig est disponible globalement dans Nuxt 3
export default defineAppConfig({
  ui: {
    icons: {
      // Utiliser les icônes en mode inline pour éviter les requêtes HTTP
      dynamic: false,
      // Utiliser le préfixe i- pour les icônes
      aliases: {
        'arrow-left': 'i-heroicons-arrow-left-20-solid',
        'plus': 'i-heroicons-plus-20-solid',
        'ellipsis-vertical': 'i-heroicons-ellipsis-vertical-20-solid',
        'trash': 'i-heroicons-trash-20-solid',
        'check': 'i-heroicons-check-20-solid',
        'x-mark': 'i-heroicons-x-mark-20-solid',
        'pencil': 'i-heroicons-pencil-20-solid',
        'eye': 'i-heroicons-eye-20-solid',
        'bell': 'i-heroicons-bell-20-solid',
        'user': 'i-heroicons-user-20-solid',
        'cog': 'i-heroicons-cog-6-tooth-20-solid',
        'home': 'i-heroicons-home-20-solid'
      }
    },
    notifications: {
      position: 'top-right',
      duration: 3000
    }
  }
}) 