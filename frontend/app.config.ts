import { defineAppConfig } from "nuxt/app";

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