export interface Question {
  id: number
  enonce: string
  chapitreId: number
  reponses: Reponse[]
}

export interface CreateQuestionDto {
  enonce: string
  chapitreId: number
}

export interface UpdateQuestionDto {
  enonce?: string
}

export interface Reponse {
  id: number
  texte: string
  est_correcte: boolean
  questionId: number
}

export interface CreateReponseDto {
  texte: string
  est_correcte: boolean
  questionId: number
}

export interface UpdateReponseDto {
  texte?: string
  est_correcte?: boolean
} 