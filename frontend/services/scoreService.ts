import axios, { AxiosInstance } from 'axios'
import type { Score } from '../types/score'

class ScoreService {
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

  async getScoresByChapitreId(chapitreId: number): Promise<Score[]> {
    this.abortPreviousRequest()
    try {
      const { data } = await this.api.get(`/chapitres/${chapitreId}/scores`, {
        signal: this.controller.signal
      })
      return data
    } catch (error) {
      if (axios.isCancel(error)) {
        return []
      }
      throw new Error('Erreur lors du chargement des scores')
    }
  }

  async getAverageScore(chapitreId: number): Promise<number> {
    try {
      const { data } = await this.api.get(`/chapitres/${chapitreId}/scores/average`)
      return data.average
    } catch (error) {
      throw new Error('Erreur lors du calcul de la moyenne')
    }
  }

  async createScore(score: { pourcentage: number; chapitre_id: number }): Promise<Score> {
    try {
      const { data } = await this.api.post('/scores', score)
      return data
    } catch (error) {
      throw new Error('Erreur lors de la sauvegarde du score')
    }
  }
}

export const scoreService = new ScoreService() 