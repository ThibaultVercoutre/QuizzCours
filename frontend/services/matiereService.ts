import axios, { AxiosInstance } from 'axios'
import type { Matiere, CreateMatiereDto, UpdateMatiereDto } from '../types/matiere'

class MatiereService {
  private api: AxiosInstance
  private controller: AbortController | null = null
  private matiereCache = new Map<number, { data: Matiere; timestamp: number }>()
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

  async getAllMatieres(): Promise<Matiere[]> {
    try {
      const { data } = await this.api.get('/matieres')
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          throw new Error('Accès non autorisé')
        }
        if (error.response?.status === 500) {
          throw new Error('Erreur serveur, veuillez réessayer plus tard')
        }
      }
      throw new Error('Erreur lors du chargement des matières')
    }
  }

  async getMatiere(id: number): Promise<Matiere> {
    try {
      // Vérifier le cache
      const cached = this.matiereCache.get(id)
      if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
        return cached.data
      }

      const { data } = await this.api.get(`/matieres/${id}`)
      
      // Mettre en cache
      this.matiereCache.set(id, {
        data,
        timestamp: Date.now()
      })
      
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('Matière non trouvée')
        }
        if (error.response?.status === 500) {
          throw new Error('Erreur serveur lors du chargement de la matière')
        }
      }
      throw new Error('Erreur lors du chargement de la matière')
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