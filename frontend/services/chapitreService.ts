import type { Chapitre, CreateChapitreDto, UpdateChapitreDto } from '../types/chapitre'

const API_BASE_URL = 'http://localhost:3001/api'

export class ChapitreService {
  private static instance: ChapitreService
  
  private constructor() {}
  
  static getInstance(): ChapitreService {
    if (!ChapitreService.instance) {
      ChapitreService.instance = new ChapitreService()
    }
    return ChapitreService.instance
  }

  async getChapitresByMatiereId(matiereId: number): Promise<Chapitre[]> {
    const response = await fetch(`${API_BASE_URL}/matieres/${matiereId}/chapitres`)
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des chapitres')
    }
    return response.json()
  }

  async createChapitre(chapitre: CreateChapitreDto): Promise<Chapitre> {
    const response = await fetch(`${API_BASE_URL}/chapitres`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chapitre),
    })
    if (!response.ok) {
      throw new Error('Erreur lors de la création du chapitre')
    }
    return response.json()
  }

  async updateChapitre(id: number, chapitre: UpdateChapitreDto): Promise<Chapitre> {
    const response = await fetch(`${API_BASE_URL}/chapitres/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chapitre),
    })
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du chapitre')
    }
    return response.json()
  }

  async deleteChapitre(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/chapitres/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du chapitre')
    }
  }

  async getChapitre(id: number): Promise<Chapitre> {
    const response = await fetch(`${API_BASE_URL}/chapitres/${id}`)
    if (!response.ok) {
      throw new Error('Erreur lors du chargement du chapitre')
    }
    return response.json()
  }
}

export const chapitreService = ChapitreService.getInstance() 