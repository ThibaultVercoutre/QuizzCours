export interface Chapitre {
  id: number
  titre: string
  description: string
  matiere_id: number
}

export interface CreateChapitreDto {
  titre: string
  description: string
  matiere_id: number
}

export interface UpdateChapitreDto {
  titre?: string
  description?: string
} 