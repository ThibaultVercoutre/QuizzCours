import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { Question, CreateQuestionDto, UpdateQuestionDto, Reponse, CreateReponseDto, UpdateReponseDto } from '@/types/quiz'
import { BaseService } from '@/services/baseService'

export class QuizzService extends BaseService {
  protected declare api: AxiosInstance
  protected declare controller: AbortController | null
  private loading: boolean = false

  constructor() {
    super()
  }

  protected override abortPreviousRequest() {
    if (this.controller) {
      this.controller.abort()
    }
    this.controller = new AbortController()
  }

  isLoading(): boolean {
    return this.loading
  }

  private setLoading(value: boolean): void {
    this.loading = value
  }

  async getAllQuestions(): Promise<Question[]> {
    try {
      const { data } = await this.api.get('/questions')
      return data
    } catch (error) {
      throw new Error('Erreur lors du chargement des questions')
    }
  }

  async getQuestionsByChapitre(chapitreId: number): Promise<Question[]> {
    this.abortPreviousRequest()
    const cacheKey = `questions_chapitre_${chapitreId}`
    const cached = this.getCacheItem(cacheKey)
    if (cached) return cached

    try {
      const { data } = await this.api.get(`/chapitres/${chapitreId}/questions`, {
        signal: this.controller!.signal
      })
      this.setCacheItem(cacheKey, data)
      return data
    } catch (error) {
      if (axios.isCancel(error)) {
        return []
      }
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) throw new Error('Chapitre non trouvé')
        if (error.response?.status === 500) throw new Error('Erreur serveur')
      }
      throw new Error('Erreur lors du chargement des questions')
    }
  }

  async createQuestion(chapitreId: number, questionData: any): Promise<Question> {
    try {
      const { data } = await this.api.post(`/chapitres/${chapitreId}/questions`, questionData)
      // Invalider le cache des questions pour ce chapitre
      this.cache.delete(`questions_chapitre_${chapitreId}`)
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) throw new Error('Données invalides')
        if (error.response?.status === 500) throw new Error('Erreur serveur')
      }
      throw new Error('Erreur lors de la création de la question')
    }
  }

  async updateQuestion(id: number, question: UpdateQuestionDto): Promise<Question> {
    try {
      this.setLoading(true)
      const { data } = await this.api.put(`/questions/${id}`, question)
      return data
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour de la question')
    } finally {
      this.setLoading(false)
    }
  }

  async deleteQuestion(id: number): Promise<void> {
    try {
      this.setLoading(true)
      await this.api.delete(`/questions/${id}`)
    } catch (error) {
      throw new Error('Erreur lors de la suppression de la question')
    } finally {
      this.setLoading(false)
    }
  }

  async getReponsesByQuestion(questionId: number): Promise<Reponse[]> {
    try {
      this.setLoading(true)
      const { data } = await this.api.get(`/questions/${questionId}/reponses`)
      return data
    } catch (error) {
      throw new Error('Erreur lors du chargement des réponses')
    } finally {
      this.setLoading(false)
    }
  }

  async createReponse(reponse: CreateReponseDto): Promise<Reponse> {
    try {
      this.setLoading(true)
      const { data } = await this.api.post('/reponses', reponse)
      return data
    } catch (error) {
      throw new Error('Erreur lors de la création de la réponse')
    } finally {
      this.setLoading(false)
    }
  }

  async updateReponse(id: number, reponse: UpdateReponseDto): Promise<Reponse> {
    try {
      const { data } = await this.api.put(`/reponses/${id}`, reponse)
      return data
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour de la réponse')
    }
  }

  async deleteReponse(id: number): Promise<void> {
    try {
      await this.api.delete(`/reponses/${id}`)
    } catch (error) {
      throw new Error('Erreur lors de la suppression de la réponse')
    }
  }

  async getQuestionsByUserId(userId: number): Promise<Question[]> {
    try {
      const { data } = await this.api.get(`/users/${userId}/questions`)
      return data
    } catch (error) {
      throw new Error('Erreur lors du chargement des questions')
    }
  }
}

export const quizzService = new QuizzService() 