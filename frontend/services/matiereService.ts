import axios, { AxiosInstance } from 'axios'
import type { Matiere, CreateMatiereDto, UpdateMatiereDto } from '../types/matiere'

class MatiereService {
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

  async getAllMatieres(): Promise<Matiere[]> {
    this.abortPreviousRequest()
    try {
      const { data } = await this.api.get('/matieres', {
        signal: this.controller.signal
      })
      return data
    } catch (error) {
      if (axios.isCancel(error)) {
        return []
      }
      throw new Error('Erreur lors du chargement des matières')
    }
  }

  async getMatiere(id: number): Promise<Matiere> {
    try {
      const { data } = await this.api.get(`/matieres/${id}`)
      return data
    } catch (error) {
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