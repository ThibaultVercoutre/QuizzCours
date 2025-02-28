import { NavigationGuard } from 'vue-router';

declare module '#app' {
  interface PageMeta {
    middleware?: string | string[] | NavigationGuard | NavigationGuard[];
  }
} 