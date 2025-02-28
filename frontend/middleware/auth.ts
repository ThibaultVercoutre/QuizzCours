import { authService } from '@/services/authService';
import { defineNuxtRouteMiddleware, navigateTo, useNuxtApp } from 'nuxt/app';

export default defineNuxtRouteMiddleware((to, from) => {
  // S'assurer que ce code ne s'exécute que côté client
  if (process.server) {
    return;
  }
  
  const nuxtApp = useNuxtApp();
  
  // Vérifier si l'utilisateur est connecté
  if (!authService.isAuthenticated()) {
    // Afficher un message d'erreur
    if (process.client) {
      const toast = nuxtApp.$toast as any;
      toast.add({
        title: 'Accès refusé',
        description: 'Vous devez être connecté pour accéder à cette page',
        color: 'red'
      });
    }
    
    // Rediriger vers la page de connexion
    return navigateTo('/');
  }
}); 