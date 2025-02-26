import type { Chapitre } from "./chapitre"

export interface Score {
  id: number
  pourcentage: number
  chapitre_id: number
  created_at: string
  chapitre: Chapitre
}