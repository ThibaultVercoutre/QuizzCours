import axios from 'axios'
import type { Score } from '@/types/score'
import { BaseService } from '@/services/baseService'

export class ScoreService extends BaseService {
  async getScoresByChapitreId(chapitreId: number, page = 1, limit = 20): Promise<{ scores: Score[]; total: number }> {
    const cacheKey = `scores_${chapitreId}_${page}_${limit}`
    const cached = this.getCacheItem(cacheKey)
    if (cached) return cached

    try {
      const { data } = await this.api.get(`/chapitres/${chapitreId}/scores`, {
        params: { page, limit }
      })
      this.setCacheItem(cacheKey, data)
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) throw new Error('Chapitre non trouvé')
        if (error.response?.status === 500) throw new Error('Erreur serveur')
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
      const cacheKey = `scores_${score.chapitre_id}`
      this.cache.delete(cacheKey)
      
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