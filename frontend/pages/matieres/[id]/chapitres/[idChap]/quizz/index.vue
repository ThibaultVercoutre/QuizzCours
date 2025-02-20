<template>
    <div class="container mx-auto p-4">
      <!-- En-tête -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-4">
          <UButton
            icon="i-heroicons-arrow-left"
            variant="ghost"
            @click="router.back()"
          />
          <h2 class="text-xl font-bold">{{ chapitre?.titre }} - Quiz</h2>
        </div>
        <UButton
          icon="i-heroicons-plus"
          color="primary"
          @click="handleAddQuestion"
        >
          Ajouter une question
        </UButton>
      </div>
  
      <!-- État de chargement -->
      <div v-if="loading" class="flex justify-center py-4">
        <ULoadingIcon />
      </div>
  
      <!-- Affichage des erreurs -->
      <div v-else-if="error" class="text-red-500 py-4">
        {{ error }}
      </div>
  
      <!-- Quiz en cours -->
      <div v-else-if="!finished && currentQuestion" class="max-w-2xl mx-auto">
        <!-- Progression -->
        <div class="mb-4">
          <UProgress
            :value="(currentQuestionIndex + 1) / questions.length * 100"
            color="primary"
          />
          <p class="text-center mt-2">
            Question {{ currentQuestionIndex + 1 }}/{{ questions.length }}
          </p>
        </div>
  
        <!-- Question -->
        <UCard class="mb-6">
          <p class="text-lg font-medium">{{ currentQuestion.enonce }}</p>
        </UCard>
  
        <!-- Réponses -->
        <div class="grid gap-4">
          <UButton
            v-for="(reponse, index) in shuffledAnswers"
            :key="index"
            :color="getAnswerColor(reponse)"
            :disabled="answered"
            block
            @click="checkAnswer(reponse)"
          >
            {{ reponse.texte }}
          </UButton>
        </div>
  
        <!-- Bouton suivant -->
        <div v-if="answered" class="mt-6 flex justify-center">
          <UButton
            color="primary"
            @click="nextQuestion"
          >
            {{ isLastQuestion ? 'Terminer le quiz' : 'Question suivante' }}
          </UButton>
        </div>
      </div>
  
      <!-- Résultats -->
      <div v-else-if="finished" class="max-w-2xl mx-auto text-center">
        <UCard>
          <h3 class="text-2xl font-bold mb-4">Quiz terminé!</h3>
          <p class="text-xl mb-4">
            Votre score: {{ score }}/{{ questions.length }}
          </p>
          <p class="mb-6">
            ({{ Math.round(score / questions.length * 100) }}%)
          </p>
          <UButton
            color="primary"
            @click="restartQuiz"
          >
            Recommencer le quiz
          </UButton>
        </UCard>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  
  interface Reponse {
    id: number
    texte: string
    est_correcte: boolean
    question_id: number
  }
  
  interface Question {
    id: number
    enonce: string
    reponses: Reponse[]
  }
  
  interface Chapitre {
    id: number
    titre: string
  }
  
  const router = useRouter()
  const route = useRoute()
  const chapitreId = route.params.idChap as string
  
  const loading = ref(true)
  const error = ref<string | null>(null)
  const chapitre = ref<Chapitre | null>(null)
  const questions = ref<Question[]>([])
  const currentQuestionIndex = ref(0)
  const answered = ref(false)
  const selectedAnswer = ref<Reponse | null>(null)
  const score = ref(0)
  const finished = ref(false)
  
  const handleAddQuestion = () => {
    router.push(`/matieres/${route.params.id}/chapitres/${chapitreId}/quizz/ajouter`)
  }

  // Mélange les questions et les réponses
  const shuffleArray = <T>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5)
  }
  
  const currentQuestion = computed(() => 
    questions.value[currentQuestionIndex.value]
  )
  
  const shuffledAnswers = computed(() => 
    currentQuestion.value ? shuffleArray(currentQuestion.value.reponses) : []
  )
  
  const isLastQuestion = computed(() => 
    currentQuestionIndex.value === questions.value.length - 1
  )
  
  const fetchChapitre = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/chapitres/${chapitreId}`)
      if (!response.ok) throw new Error('Erreur lors du chargement du chapitre')
      chapitre.value = await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Erreur lors du chargement du chapitre"
    }
  }
  
  const fetchQuestions = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/chapitres/${chapitreId}/questions`)
      if (!response.ok) throw new Error('Erreur lors du chargement des questions')
      questions.value = shuffleArray(await response.json())
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Erreur lors du chargement des questions"
    } finally {
      loading.value = false
    }
  }
  
  const checkAnswer = (reponse: Reponse) => {
    selectedAnswer.value = reponse
    answered.value = true
    if (reponse.est_correcte) {
      score.value++
    }
  }
  
  const getAnswerColor = (reponse: Reponse): string => {
    if (!answered.value) return 'gray'
    if (reponse.est_correcte) return 'green'
    if (reponse === selectedAnswer.value) return 'red'
    return 'gray'
  }
  
  const nextQuestion = () => {
    if (isLastQuestion.value) {
      finished.value = true
    } else {
      currentQuestionIndex.value++
      answered.value = false
      selectedAnswer.value = null
    }
  }
  
  const restartQuiz = () => {
    questions.value = shuffleArray(questions.value)
    currentQuestionIndex.value = 0
    answered.value = false
    selectedAnswer.value = null
    score.value = 0
    finished.value = false
  }
  
  onMounted(async () => {
    await fetchChapitre()
    await fetchQuestions()
  })
  </script>