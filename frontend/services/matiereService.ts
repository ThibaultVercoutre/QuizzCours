import axios from 'axios'
import type { Matiere, CreateMatiereDto, UpdateMatiereDto } from '@/types/matiere'
import { BaseService } from '@/services/baseService'
import { handleApiError } from '../utils/errorHandler'

export class MatiereService extends BaseService {
  private matiereCache = new Map<number, { data: Matiere; timestamp: number }>()

  constructor() {
    super()
    
    // Ajouter un intercepteur pour inclure le token d'authentification dans les requêtes
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  /**
   * Récupère le token d'authentification
   * @returns Le token d'authentification ou null
   */
  private getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  protected override abortPreviousRequest() {
    if (this.controller) {
      this.controller.abort()
    }
    this.controller = new AbortController()
  }

  async getAllMatieres(): Promise<Matiere[]> {
    const cacheKey = 'all_matieres'
    const cached = this.getCacheItem(cacheKey)
    if (cached) return cached

    try {
      const { data } = await this.api.get('/matieres')
      this.setCacheItem(cacheKey, data)
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) throw new Error('Vous devez être connecté pour accéder à vos matières')
        if (error.response?.status === 403) throw new Error('Vous n\'avez pas accès à ces matières')
        if (error.response?.status === 500) throw new Error('Erreur serveur')
      }
      throw new Error(handleApiError(error, 'Erreur lors du chargement des matières'))
    }
  }

  async getMatieresByUserId(userId: number): Promise<Matiere[]> {
    try {
      const { data } = await this.api.get(`/users/${userId}/matieres`)
      return data
    } catch (error) {
      throw new Error(handleApiError(error, 'Erreur lors du chargement des matières'))
    }
  }

  async getMatiere(id: number): Promise<Matiere> {
    const cacheKey = `matiere_${id}`
    const cached = this.getCacheItem(cacheKey)
    if (cached) return cached

    try {
      const { data } = await this.api.get(`/matieres/${id}`)
      this.setCacheItem(cacheKey, data)
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) throw new Error('Vous devez être connecté pour accéder à cette matière')
        if (error.response?.status === 403) throw new Error('Vous n\'avez pas accès à cette matière')
        if (error.response?.status === 404) throw new Error('Matière non trouvée')
        if (error.response?.status === 500) throw new Error('Erreur serveur')
      }
      throw new Error(handleApiError(error, 'Erreur lors du chargement de la matière'))
    }
  }


  async createMatiere(matiere: CreateMatiereDto): Promise<Matiere> {
    try {
      const { data } = await this.api.post('/matieres', matiere)
      // Invalider le cache des matières
      this.cache.delete('all_matieres')
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) throw new Error('Vous devez être connecté pour créer une matière')
        if (error.response?.status === 403) throw new Error('Vous n\'avez pas les droits pour créer une matière')
      }
      throw new Error('Erreur lors de la création de la matière')
    }
  }

  async updateMatiere(id: number, matiere: UpdateMatiereDto): Promise<Matiere> {
    try {
      const { data } = await this.api.put(`/matieres/${id}`, matiere)
      // Invalider le cache
      this.cache.delete(`matiere_${id}`)
      this.cache.delete('all_matieres')
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) throw new Error('Vous devez être connecté pour modifier une matière')
        if (error.response?.status === 403) throw new Error('Vous n\'avez pas les droits pour modifier cette matière')
        if (error.response?.status === 404) throw new Error('Matière non trouvée')
      }
      throw new Error('Erreur lors de la mise à jour de la matière')
    }
  }

  async deleteMatiere(id: number): Promise<void> {
    try {
      await this.api.delete(`/matieres/${id}`)
      // Invalider le cache
      this.cache.delete(`matiere_${id}`)
      this.cache.delete('all_matieres')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) throw new Error('Vous devez être connecté pour supprimer une matière')
        if (error.response?.status === 403) throw new Error('Vous n\'avez pas les droits pour supprimer cette matière')
        if (error.response?.status === 404) throw new Error('Matière non trouvée')
      }
      throw new Error('Erreur lors de la suppression de la matière')
    }
  }
}

export const matiereService = new MatiereService() 