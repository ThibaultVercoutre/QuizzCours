import { authService } from '@/services/authService';
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';

export default defineNuxtRouteMiddleware((to, from) => {
  // Si l'utilisateur est déjà connecté, rediriger vers le dashboard
  if (authService.isAuthenticated()) {
    return navigateTo('/dashboard');
  }
}); 