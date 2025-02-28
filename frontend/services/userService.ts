import { BaseService } from './baseService';
import { authService } from './authService';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Matiere {
  id: number;
  titre: string;
  description?: string;
}

interface Score {
  id: number;
  pourcentage: number;
  chapitre_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  chapitre?: {
    id: number;
    titre: string;
    matiere_id: number;
    matiere?: {
      id: number;
      titre: string;
    }
  };
}

interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
}

class UserService extends BaseService {
  constructor() {
    super();
    
    // Ajouter un intercepteur pour inclure le token d'authentification dans les requêtes
    this.api.interceptors.request.use(
      (config) => {
        const token = authService.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  /**
   * Récupère le profil de l'utilisateur actuel
   * @returns Une promesse avec les informations de l'utilisateur
   */
  async getCurrentUser(): Promise<User | null> {
    return await authService.fetchCurrentUser();
  }

  /**
   * Récupère les informations d'un utilisateur par son ID
   * @param id L'ID de l'utilisateur
   * @returns Une promesse avec les informations de l'utilisateur
   */
  async getUserById(id: number): Promise<User | null> {
    try {
      // Vérifier si les données sont en cache
      const cacheKey = `user_${id}`;
      const cachedData = this.getCacheItem(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      this.abortPreviousRequest();
      
      const response = await this.api.get(`/users/${id}`, {
        signal: this.controller?.signal
      });

      // Mettre en cache les données
      this.setCacheItem(cacheKey, response.data);
      
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'utilisateur ${id}:`, error);
      return null;
    }
  }

  /**
   * Met à jour les informations de l'utilisateur
   * @param id L'ID de l'utilisateur
   * @param data Les données à mettre à jour
   * @returns Une promesse avec les informations de l'utilisateur mises à jour
   */
  async updateUser(id: number, data: UpdateUserData): Promise<User | null> {
    try {
      this.abortPreviousRequest();
      
      const response = await this.api.put(`/users/${id}`, data, {
        signal: this.controller?.signal
      });

      // Mettre à jour le cache
      const cacheKey = `user_${id}`;
      this.setCacheItem(cacheKey, response.data);
      
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'utilisateur ${id}:`, error);
      return null;
    }
  }

  /**
   * Récupère les matières suivies par l'utilisateur
   * @param userId L'ID de l'utilisateur
   * @returns Une promesse avec la liste des matières
   */
  async getUserMatieres(userId: number): Promise<Matiere[]> {
    try {
      // Vérifier si les données sont en cache
      const cacheKey = `user_${userId}_matieres`;
      const cachedData = this.getCacheItem(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      this.abortPreviousRequest();
      
      const response = await this.api.get(`/users/${userId}/matieres`, {
        signal: this.controller?.signal
      });

      // Mettre en cache les données
      this.setCacheItem(cacheKey, response.data);
      
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des matières de l'utilisateur ${userId}:`, error);
      return [];
    }
  }

  /**
   * Ajoute une matière à l'utilisateur
   * @param userId L'ID de l'utilisateur
   * @param matiereId L'ID de la matière
   * @returns Une promesse avec le résultat de l'opération
   */
  async addMatiereToUser(userId: number, matiereId: number): Promise<boolean> {
    try {
      this.abortPreviousRequest();
      
      const response = await this.api.post(`/users/${userId}/matieres`, {
        matiereId
      }, {
        signal: this.controller?.signal
      });

      // Invalider le cache des matières
      this.cache.delete(`user_${userId}_matieres`);
      
      return response.data.success;
    } catch (error) {
      console.error(`Erreur lors de l'ajout de la matière ${matiereId} à l'utilisateur ${userId}:`, error);
      return false;
    }
  }

  /**
   * Supprime une matière de l'utilisateur
   * @param userId L'ID de l'utilisateur
   * @param matiereId L'ID de la matière
   * @returns Une promesse avec le résultat de l'opération
   */
  async removeMatiereFromUser(userId: number, matiereId: number): Promise<boolean> {
    try {
      this.abortPreviousRequest();
      
      const response = await this.api.delete(`/users/${userId}/matieres/${matiereId}`, {
        signal: this.controller?.signal
      });

      // Invalider le cache des matières
      this.cache.delete(`user_${userId}_matieres`);
      
      return response.status === 200 || response.status === 204;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la matière ${matiereId} de l'utilisateur ${userId}:`, error);
      return false;
    }
  }

  /**
   * Récupère les scores de l'utilisateur
   * @param userId L'ID de l'utilisateur
   * @returns Une promesse avec la liste des scores
   */
  async getUserScores(userId: number): Promise<Score[]> {
    try {
      // Vérifier si les données sont en cache
      const cacheKey = `user_${userId}_scores`;
      const cachedData = this.getCacheItem(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      this.abortPreviousRequest();
      
      const response = await this.api.get(`/users/${userId}/scores`, {
        signal: this.controller?.signal
      });

      // Mettre en cache les données
      this.setCacheItem(cacheKey, response.data);
      
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des scores de l'utilisateur ${userId}:`, error);
      return [];
    }
  }
}

export const userService = new UserService(); 