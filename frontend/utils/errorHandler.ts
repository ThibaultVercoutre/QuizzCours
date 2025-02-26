import axios from 'axios';

/**
 * Gère les erreurs d'API de manière cohérente
 * @param error L'erreur capturée
 * @param defaultMessage Message par défaut à afficher
 * @returns Un message d'erreur approprié
 */
export function handleApiError(error: any, defaultMessage: string = 'Une erreur est survenue') {
  if (axios.isAxiosError(error)) {
    // Erreurs HTTP spécifiques
    if (error.response) {
      switch (error.response.status) {
        case 400:
          return error.response.data?.message || 'Requête invalide';
        case 401:
          return 'Non autorisé - Veuillez vous connecter';
        case 403:
          return 'Accès interdit';
        case 404:
          return 'Ressource non trouvée';
        case 500:
          return 'Erreur serveur';
        default:
          return error.response.data?.message || defaultMessage;
      }
    }
    
    // Erreurs de réseau
    if (error.request) {
      return 'Impossible de contacter le serveur';
    }
  }
  
  // Erreurs génériques
  return error.message || defaultMessage;
} 