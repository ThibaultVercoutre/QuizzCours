export interface Score {
  id: number
  pourcentage: number
  chapitre_id: number
  created_at: string
}

export interface ScoreWithChapitre extends Score {
  chapitre: {
    titre: string
  }
} 