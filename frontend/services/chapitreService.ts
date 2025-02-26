import axios from 'axios'
import type { Chapitre, CreateChapitreDto, UpdateChapitreDto } from '@/types/chapitre'
import { BaseService } from '@/services/baseService'
import { handleApiError } from '../utils/errorHandler'

export class ChapitreService extends BaseService {
  private chapitreCache = new Map<number, { data: Chapitre; timestamp: number }>()

  constructor() {
    super()
  }

  protected override abortPreviousRequest() {
    if (this.controller) {
      this.controller.abort()
    }
    this.controller = new AbortController()
  }

  async getChapitresByMatiereId(matiereId: number): Promise<Chapitre[]> {
    const cacheKey = `chapitres_matiere_${matiereId}`
    const cached = this.getCacheItem(cacheKey)
    if (cached) return cached

    try {
      const { data } = await this.api.get(`/matieres/${matiereId}/chapitres`)
      this.setCacheItem(cacheKey, data)
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) throw new Error('Matière non trouvée')
        if (error.response?.status === 500) throw new Error('Erreur serveur')
      }
      throw new Error(handleApiError(error, 'Erreur lors du chargement des chapitres'))
    }
  }

  async createChapitre(chapitre: CreateChapitreDto): Promise<Chapitre> {
    try {
      const { data } = await this.api.post('/chapitres', chapitre)
      return data
    } catch (error) {
      throw new Error(handleApiError(error, 'Erreur lors de la création du chapitre'))
    }
  }

  async updateChapitre(id: number, chapitre: UpdateChapitreDto): Promise<Chapitre> {
    try {
      const { data } = await this.api.put(`/chapitres/${id}`, chapitre)
      return data
    } catch (error) {
      throw new Error(handleApiError(error, 'Erreur lors de la mise à jour du chapitre'))
    }
  }

  async deleteChapitre(id: number): Promise<void> {
    try {
      await this.api.delete(`/chapitres/${id}`)
    } catch (error) {
      throw new Error(handleApiError(error, 'Erreur lors de la suppression du chapitre'))
    }
  }

  async getChapitre(id: number): Promise<Chapitre> {
    const cacheKey = `chapitre_${id}`
    const cached = this.getCacheItem(cacheKey)
    if (cached) return cached

    try {
      const { data } = await this.api.get(`/chapitres/${id}`)
      this.setCacheItem(cacheKey, data)
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) throw new Error('Chapitre non trouvé')
        if (error.response?.status === 500) throw new Error('Erreur serveur')
      }
      throw new Error(handleApiError(error, 'Erreur lors du chargement du chapitre'))
    }
  }

  async getAllChapitres(): Promise<Chapitre[]> {
    try {
      const { data } = await this.api.get('/chapitres')
      return data
    } catch (error) {
      throw new Error(handleApiError(error, 'Erreur lors du chargement des chapitres'))
    }
  }
}

export const chapitreService = new ChapitreService() 