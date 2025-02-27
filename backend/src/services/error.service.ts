import { ResponseToolkit } from '@hapi/hapi';

export class ErrorService {
  /**
   * Gère les erreurs de validation
   */
  static handleValidationError(h: ResponseToolkit, message: string) {
    return h.response({
      error: 'Validation Error',
      message
    }).code(400);
  }

  /**
   * Gère les erreurs de ressource non trouvée
   */
  static handleNotFoundError(h: ResponseToolkit, resource: string) {
    return h.response({
      error: 'Not Found',
      message: `${resource} not found`
    }).code(404);
  }

  /**
   * Gère les erreurs de serveur internes
   */
  static handleServerError(h: ResponseToolkit, error: unknown) {
    console.error('Server Error:', error);
    
    return h.response({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Une erreur inconnue est survenue'
    }).code(500);
  }

  /**
   * Gère les erreurs d'autorisation
   */
  static handleUnauthorizedError(h: ResponseToolkit, message = 'Non autorisé') {
    return h.response({
      error: 'Unauthorized',
      message
    }).code(401);
  }

  /**
   * Gère les erreurs de conflit (par exemple, ressource déjà existante)
   */
  static handleConflictError(h: ResponseToolkit, message: string) {
    return h.response({
      error: 'Conflict',
      message
    }).code(409);
  }

  /**
   * Journalise l'erreur avec des informations contextuelles
   */
  static logError(context: string, error: unknown, additionalInfo?: Record<string, any>) {
    console.error(`[${new Date().toISOString()}] Error in ${context}:`, error);
    
    if (additionalInfo) {
      console.error('Additional information:', additionalInfo);
    }
  }
} 