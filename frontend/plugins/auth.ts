import { authService } from '@/services/authService';
import { defineNuxtPlugin } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
  // Vérifier si nous sommes côté client
  if (process.client) {
    // Vérifier la validité du token au chargement de l'application
    authService.validateToken().catch(() => {
      // Si le token n'est pas valide, déconnecter l'utilisateur
      authService.logout();
    });
  }

  // Ajouter le service d'authentification à l'application
  nuxtApp.provide('auth', authService);
  
  // Ajouter une fonction pour vérifier si l'utilisateur est connecté
  nuxtApp.provide('isAuthenticated', () => {
    // Côté serveur, toujours retourner false pour éviter les problèmes d'hydratation
    if (process.server) {
      return false;
    }
    return authService.isAuthenticated();
  });
  
  // Ajouter une fonction pour récupérer l'utilisateur connecté
  nuxtApp.provide('getUser', () => {
    // Côté serveur, toujours retourner null pour éviter les problèmes d'hydratation
    if (process.server) {
      return null;
    }
    return authService.getUser();
  });
  
  // Ajouter une fonction pour récupérer le token d'authentification
  nuxtApp.provide('getToken', () => {
    // Côté serveur, toujours retourner null pour éviter les problèmes d'hydratation
    if (process.server) {
      return null;
    }
    return authService.getToken();
  });
  
  // Ajouter une fonction pour se déconnecter
  nuxtApp.provide('logout', () => {
    authService.logout();
  });
}); 