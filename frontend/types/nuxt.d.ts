import { NavigationGuard } from 'vue-router';

// Déclarations globales
declare global {
  // Déclaration pour definePageMeta
  function definePageMeta(meta: {
    middleware?: string | string[] | NavigationGuard | NavigationGuard[];
    layout?: string;
    [key: string]: any;
  }): void;
}

declare module '#app' {
  interface PageMeta {
    middleware?: string | string[] | NavigationGuard | NavigationGuard[];
    layout?: string;
  }

  interface NuxtApp {
    $colorMode: {
      preference: string;
      value: string;
      unknown: boolean;
      forced: boolean;
    }
  }
}

declare module 'nuxt/schema' {
  interface PageMeta {
    middleware?: string | string[] | NavigationGuard | NavigationGuard[];
    layout?: string;
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    middleware?: string | string[] | NavigationGuard | NavigationGuard[];
  }
}

declare function useColorMode(): {
  preference: string;
  value: string;
  unknown: boolean;
  forced: boolean;
};

declare function computed<T>(getter: () => T): { value: T };

export {}; 