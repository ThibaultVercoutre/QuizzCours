import axios, { AxiosInstance } from 'axios'
import type { Score } from '../types/score'

class ScoreService {
  private api: AxiosInstance
  private controller: AbortController | null = null
  private scoreCache = new Map<number, { data: Score[]; timestamp: number }>()
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

  async getScoresByChapitreId(chapitreId: number): Promise<Score[]> {
    try {
      // Vérifier le cache
      const cached = this.scoreCache.get(chapitreId)
      if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
        return cached.data
      }

      const { data } = await this.api.get(`/chapitres/${chapitreId}/scores`)
      
      // Mettre en cache
      this.scoreCache.set(chapitreId, {
        data,
        timestamp: Date.now()
      })
      
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('Chapitre non trouvé')
        }
        if (error.response?.status === 403) {
          throw new Error('Accès non autorisé')
        }
        if (error.response?.status === 500) {
          throw new Error('Erreur serveur, veuillez réessayer plus tard')
        }
      }
      throw new Error('Erreur lors du chargement des scores')
    }
  }

  async getAverageScore(chapitreId: number): Promise<number> {
    try {
      const { data } = await this.api.get(`/chapitres/${chapitreId}/scores/average`)
      return data.average
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('Chapitre non trouvé')
        }
        if (error.response?.status === 500) {
          throw new Error('Erreur serveur lors du calcul de la moyenne')
        }
      }
      throw new Error('Erreur lors du calcul de la moyenne')
    }
  }

  async createScore(score: { pourcentage: number; chapitre_id: number }): Promise<Score> {
    try {
      const { data } = await this.api.post('/scores', score)
      
      // Invalider le cache pour ce chapitre
      this.scoreCache.delete(score.chapitre_id)
      
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          throw new Error('Données de score invalides')
        }
        if (error.response?.status === 404) {
          throw new Error('Chapitre non trouvé')
        }
        if (error.response?.status === 500) {
          throw new Error('Erreur serveur lors de la sauvegarde du score')
        }
      }
      throw new Error('Erreur lors de la sauvegarde du score')
    }
  }
}

export const scoreService = new ScoreService() 