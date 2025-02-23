import axios, { AxiosInstance } from 'axios'
import type { Question, CreateQuestionDto, UpdateQuestionDto, Reponse, CreateReponseDto, UpdateReponseDto } from '../types/quiz'

class QuizService {
  private api: AxiosInstance
  private controller: AbortController | null = null
  private loading: boolean = false

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

  isLoading(): boolean {
    return this.loading
  }

  private setLoading(value: boolean): void {
    this.loading = value
  }

  async getQuestionsByChapitre(chapitreId: number): Promise<Question[]> {
    this.abortPreviousRequest()
    try {
      const { data } = await this.api.get(`/chapitres/${chapitreId}/questions`, {
        signal: this.controller.signal
      })
      return data
    } catch (error) {
      if (axios.isCancel(error)) {
        return []
      }
      throw new Error('Erreur lors du chargement des questions')
    }
  }

  async createQuestion(question: CreateQuestionDto): Promise<Question> {
    try {
      this.setLoading(true)
      const { data } = await this.api.post('/questions', question)
      return data
    } catch (error) {
      throw new Error('Erreur lors de la création de la question')
    } finally {
      this.setLoading(false)
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
}

export const quizService = new QuizService() 