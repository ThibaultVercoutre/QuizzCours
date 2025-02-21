export interface Matiere {
  id: number
  nom: string
  description: string
}

export interface CreateMatiereDto {
  nom: string
  description: string
}

export interface UpdateMatiereDto {
  nom?: string
  description?: string
} 