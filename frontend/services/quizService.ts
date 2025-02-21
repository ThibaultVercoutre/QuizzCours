import type { Question, CreateQuestionDto, UpdateQuestionDto, Reponse, CreateReponseDto, UpdateReponseDto } from '../types/quiz'

const API_BASE_URL = 'http://localhost:3001/api'

export const quizService = {
  async getQuestionsByChapitre(chapitreId: number) {
    const response = await fetch(`${API_BASE_URL}/chapitres/${chapitreId}/questions`)
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des questions')
    }
    return await response.json()
  }
}

export class QuizService {
  private static instance: QuizService
  
  private constructor() {}
  
  static getInstance(): QuizService {
    if (!QuizService.instance) {
      QuizService.instance = new QuizService()
    }
    return QuizService.instance
  }

  // Questions
  async createQuestion(question: CreateQuestionDto): Promise<Question> {
    const response = await fetch(`${API_BASE_URL}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question),
    })
    if (!response.ok) {
      throw new Error('Erreur lors de la création de la question')
    }
    return response.json()
  }

  async updateQuestion(id: number, question: UpdateQuestionDto): Promise<Question> {
    const response = await fetch(`${API_BASE_URL}/questions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question),
    })
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de la question')
    }
    return response.json()
  }

  async deleteQuestion(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/questions/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de la question')
    }
  }

  // Réponses
  async getReponsesByQuestion(questionId: number): Promise<Reponse[]> {
    const response = await fetch(`${API_BASE_URL}/questions/${questionId}/reponses`)
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des réponses')
    }
    return response.json()
  }

  async createReponse(reponse: CreateReponseDto): Promise<Reponse> {
    const response = await fetch(`${API_BASE_URL}/reponses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reponse),
    })
    if (!response.ok) {
      throw new Error('Erreur lors de la création de la réponse')
    }
    return response.json()
  }

  async updateReponse(id: number, reponse: UpdateReponseDto): Promise<Reponse> {
    const response = await fetch(`${API_BASE_URL}/reponses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reponse),
    })
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de la réponse')
    }
    return response.json()
  }

  async deleteReponse(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/reponses/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de la réponse')
    }
  }
}

export const quizServiceInstance = QuizService.getInstance() 