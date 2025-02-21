import type { Matiere, CreateMatiereDto, UpdateMatiereDto } from '../types/matiere'

const API_BASE_URL = 'http://localhost:3001/api'

export class MatiereService {
  private static instance: MatiereService
  
  private constructor() {}
  
  static getInstance(): MatiereService {
    if (!MatiereService.instance) {
      MatiereService.instance = new MatiereService()
    }
    return MatiereService.instance
  }

  async getAllMatieres(): Promise<Matiere[]> {
    const response = await fetch(`${API_BASE_URL}/matieres`)
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des matières')
    }
    return response.json()
  }

  async getMatiere(id: number): Promise<Matiere> {
    const response = await fetch(`${API_BASE_URL}/matieres/${id}`)
    if (!response.ok) {
      throw new Error('Erreur lors du chargement de la matière')
    }
    return response.json()
  }

  async createMatiere(matiere: CreateMatiereDto): Promise<Matiere> {
    const response = await fetch(`${API_BASE_URL}/matieres`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(matiere),
    })
    if (!response.ok) {
      throw new Error('Erreur lors de la création de la matière')
    }
    return response.json()
  }

  async updateMatiere(id: number, matiere: UpdateMatiereDto): Promise<Matiere> {
    const response = await fetch(`${API_BASE_URL}/matieres/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(matiere),
    })
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de la matière')
    }
    return response.json()
  }

  async deleteMatiere(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/matieres/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de la matière')
    }
  }
}

export const matiereService = MatiereService.getInstance() 