import axios, { AxiosInstance } from 'axios'
import type { Chapitre, CreateChapitreDto, UpdateChapitreDto } from '../types/chapitre'

class ChapitreService {
  private api: AxiosInstance
  private controller: AbortController | null = null

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
    this.abortPreviousRequest()
    try {
      const { data } = await this.api.get(`/matieres/${matiereId}/chapitres`, {
        signal: this.controller.signal
      })
      return data
    } catch (error) {
      if (axios.isCancel(error)) {
        return []
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
      const { data } = await this.api.get(`/chapitres/${id}`)
      return data
    } catch (error) {
      throw new Error('Erreur lors du chargement du chapitre')
    }
  }
}

export const chapitreService = new ChapitreService() 