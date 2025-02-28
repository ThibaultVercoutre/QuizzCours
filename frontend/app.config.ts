// app.config.ts
// La fonction defineAppConfig est injectée globalement par Nuxt
// TypeScript peut ne pas la reconnaître mais elle sera disponible à l'exécution

// @ts-ignore - defineAppConfig est disponible globalement dans Nuxt 3
export default defineAppConfig({
  ui: {
    icons: {
      // Utiliser les icônes en mode inline pour éviter les requêtes HTTP
      dynamic: false,
      // Utiliser le préfixe i- pour les icônes Boxicons
      aliases: {
        // Remplacement par des icônes Boxicons
        'arrow-left': 'i-bx-left-arrow-alt',
        'plus': 'i-bx-plus',
        'ellipsis-vertical': 'i-bx-dots-vertical',
        'trash': 'i-bx-trash',
        'check': 'i-bx-check',
        'x-mark': 'i-bx-x',
        'pencil': 'i-bx-edit',
        'eye': 'i-bx-show',
        'bell': 'i-bx-bell',
        'user': 'i-bx-user',
        'cog': 'i-bx-cog',
        'home': 'i-bx-home',
        // Icônes supplémentaires
        'academic-cap': 'i-bx-book-bookmark',
        'arrow-right-on-rectangle': 'i-bx-log-out',
        'book-open': 'i-bx-book-open',
        'information-circle': 'i-bx-info-circle',
        'check-circle': 'i-bx-check-circle',
        'envelope': 'i-bx-envelope'
      }
    },
    notifications: {
      position: 'top-right',
      duration: 3000
    }
  }
}) 