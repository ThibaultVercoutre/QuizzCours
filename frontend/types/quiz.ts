export interface Question {
  id: number
  titre: string
  chapitreId: number
  reponses: Reponse[]
}

export interface CreateQuestionDto {
  titre: string
  chapitreId: number
}

export interface UpdateQuestionDto {
  titre?: string
}

export interface Reponse {
  id: number
  contenu: string
  estCorrecte: boolean
  questionId: number
}

export interface CreateReponseDto {
  contenu: string
  estCorrecte: boolean
  questionId: number
}

export interface UpdateReponseDto {
  contenu?: string
  estCorrecte?: boolean
} 