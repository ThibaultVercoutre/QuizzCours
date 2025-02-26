import axios from 'axios'
import type { Matiere, CreateMatiereDto, UpdateMatiereDto } from '@/types/matiere'
import { BaseService } from '@/services/baseService'
import { handleApiError } from '../utils/errorHandler'

export class MatiereService extends BaseService {
  private matiereCache = new Map<number, { data: Matiere; timestamp: number }>()

  constructor() {
    super()
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
        if (error.response?.status === 500) throw new Error('Erreur serveur')
      }
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
        if (error.response?.status === 404) throw new Error('Matière non trouvée')
        if (error.response?.status === 500) throw new Error('Erreur serveur')
      }
      throw new Error(handleApiError(error, 'Erreur lors du chargement de la matière'))
    }
  }

  async createMatiere(matiere: CreateMatiereDto): Promise<Matiere> {
    try {
      const { data } = await this.api.post('/matieres', matiere)
      return data
    } catch (error) {
      throw new Error('Erreur lors de la création de la matière')
    }
  }

  async updateMatiere(id: number, matiere: UpdateMatiereDto): Promise<Matiere> {
    try {
      const { data } = await this.api.put(`/matieres/${id}`, matiere)
      return data
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour de la matière')
    }
  }

  async deleteMatiere(id: number): Promise<void> {
    try {
      await this.api.delete(`/matieres/${id}`)
    } catch (error) {
      throw new Error('Erreur lors de la suppression de la matière')
    }
  }
}

export const matiereService = new MatiereService() 