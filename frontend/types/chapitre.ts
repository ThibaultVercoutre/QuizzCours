export interface Chapitre {
  id: number
  titre: string
  description: string
  matiereId: number
}

export interface CreateChapitreDto {
  titre: string
  description: string
  matiereId: number
}

export interface UpdateChapitreDto {
  titre?: string
  description?: string
} 