import type { Matiere } from "./matiere"
import type { Question } from "./quiz"

export interface Chapitre {
  id: number
  titre: string
  description: string
  matiere_id: number
  matiere: Matiere
  questions: Question[]
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