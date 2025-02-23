import axios, { AxiosInstance } from 'axios'
import type { Chapitre, CreateChapitreDto, UpdateChapitreDto } from '../types/chapitre'

class ChapitreService {
  private api: AxiosInstance
  private controller: AbortController | null = null
  private chapitreCache = new Map<number, { data: Chapitre; timestamp: number }>()
  private cacheDuration = 5 * 60 * 1000 // 5 minutes

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3001/api',
      timeout: 10000
    })
  }

  private abortPreviousRequest() {
    if (this.controller) {
      this.controller.abort()
    }
    this.controller = new AbortController()
  }

  async getChapitresByMatiereId(matiereId: number): Promise<Chapitre[]> {
    try {
      const { data } = await this.api.get(`/matieres/${matiereId}/chapitres`)
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('Matière non trouvée')
        }
        if (error.response?.status === 403) {
          throw new Error('Accès non autorisé')
        }
        if (error.response?.status === 500) {
          throw new Error('Erreur serveur, veuillez réessayer plus tard')
        }
      }
      throw new Error('Erreur lors du chargement des chapitres')
    }
  }

  async createChapitre(chapitre: CreateChapitreDto): Promise<Chapitre> {
    try {
      const { data } = await this.api.post('/chapitres', chapitre)
      return data
    } catch (error) {
      throw new Error('Erreur lors de la création du chapitre')
    }
  }

  async updateChapitre(id: number, chapitre: UpdateChapitreDto): Promise<Chapitre> {
    try {
      const { data } = await this.api.put(`/chapitres/${id}`, chapitre)
      return data
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour du chapitre')
    }
  }

  async deleteChapitre(id: number): Promise<void> {
    try {
      await this.api.delete(`/chapitres/${id}`)
    } catch (error) {
      throw new Error('Erreur lors de la suppression du chapitre')
    }
  }

  async getChapitre(id: number): Promise<Chapitre> {
    try {
      // Vérifier le cache
      const cached = this.chapitreCache.get(id)
      if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
        return cached.data
      }

      const { data } = await this.api.get(`/chapitres/${id}`)
      
      // Mettre en cache
      this.chapitreCache.set(id, {
        data,
        timestamp: Date.now()
      })
      
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('Chapitre non trouvé')
        }
        if (error.response?.status === 500) {
          throw new Error('Erreur serveur lors du chargement du chapitre')
        }
      }
      throw new Error('Erreur lors du chargement du chapitre')
    }
  }
}

export const chapitreService = new ChapitreService() 