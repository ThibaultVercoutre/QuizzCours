<template>
  <div class="container mx-auto p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Section principale -->
      <UCard class="md:col-span-2">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-academic-cap" class="text-primary text-2xl" />
            <h1 class="text-2xl font-bold">Bienvenue sur QuizzCours</h1>
          </div>
        </template>
        
        <div class="space-y-4">
          <p class="text-lg text-gray-600 dark:text-gray-400">
            QuizzCours est une plateforme interactive pour tester vos connaissances dans différentes matières.
          </p>
          
          <div class="flex flex-wrap gap-4 mt-4">
            <UButton
              to="/matieres"
              color="primary"
              icon="i-heroicons-book-open"
            >
              Explorer les matières
            </UButton>
            
            <UButton
              to="/about"
              color="gray"
              variant="soft"
              icon="i-heroicons-information-circle"
            >
              En savoir plus
            </UButton>
          </div>
        </div>
      </UCard>
      
      <!-- Statistiques -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-chart-bar" class="text-primary" />
            <h2 class="text-xl font-semibold">Statistiques</h2>
          </div>
        </template>
        
        <div class="grid grid-cols-2 gap-4">
          <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div v-if="loading" class="h-8 flex items-center">
              <UProgress animation="carousel" color="primary" class="w-full" />
            </div>
            <div v-else class="text-3xl font-bold text-primary">{{ matieresCount }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Matières</div>
          </div>
          
          <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div v-if="loading" class="h-8 flex items-center">
              <UProgress animation="carousel" color="primary" class="w-full" />
            </div>
            <div v-else class="text-3xl font-bold text-primary">{{ chapitresCount }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Chapitres</div>
          </div>
          
          <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div v-if="loading" class="h-8 flex items-center">
              <UProgress animation="carousel" color="primary" class="w-full" />
            </div>
            <div v-else class="text-3xl font-bold text-primary">{{ questionsCount }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Questions</div>
          </div>
          
          <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div v-if="loading" class="h-8 flex items-center">
              <UProgress animation="carousel" color="primary" class="w-full" />
            </div>
            <div v-else class="text-3xl font-bold text-primary">{{ quizzCompletedCount }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Quiz complétés</div>
          </div>
        </div>
      </UCard>
      
      <!-- Derniers quiz -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-clock" class="text-primary" />
            <h2 class="text-xl font-semibold">Derniers quiz</h2>
          </div>
        </template>
        
        <div v-if="loading" class="h-8 flex items-center">
          <UProgress animation="carousel" color="primary" class="w-full" />
        </div>
        <div v-else>
          <div v-if="recentScores.length > 0">
            <ul class="divide-y divide-gray-200 dark:divide-gray-700">
              <li v-for="(score, index) in recentScores" :key="index" class="py-3">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium">{{ score.chapitre }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ score.matiere }}</p>
                  </div>
                  <UBadge :color="getScoreColor(score.score)" class="text-sm">
                    {{ score.score }}%
                  </UBadge>
                </div>
              </li>
            </ul>
          </div>
          <div v-else class="text-center py-4 text-gray-500 dark:text-gray-400">
            Aucun quiz complété récemment
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { chapitreService } from '@/services/chapitreService';
import { matiereService } from '@/services/matiereService';
import { quizzService } from '@/services/quizzService';
import { scoreService } from '@/services/scoreService';
// Données simulées pour la démo
const matieresCount = ref(0);
const chapitresCount = ref(0);
const questionsCount = ref(0);
const quizzCompletedCount = ref(0);
const loading = ref(true);

// Définir le type pour accepter les objets de l'API
const recentScores = ref<any[]>([]);

const fetchStats = async () => {
  try {
    const matieres = await matiereService.getAllMatieres()
    matieresCount.value = matieres.length
    
    const chapitres = await chapitreService.getAllChapitres()
    chapitresCount.value = chapitres.length

    const questions = await quizzService.getAllQuestions()
    questionsCount.value = questions.length

    const quizzCompleted = await scoreService.getAllScores()
    quizzCompletedCount.value = quizzCompleted.length

    // Récupérer uniquement les 4 derniers scores
    recentScores.value = quizzCompleted
      .slice(0, 4) // Prendre les 4 premiers éléments du tableau
      .map(score => ({
        matiere: score.chapitre.matiere.nom,
        chapitre: score.chapitre.titre,
        score: score.pourcentage
      }))

    loading.value = false
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error)
  }

}

onMounted(() => {
  fetchStats()
})


const getScoreColor = (score: number): 'green' | 'yellow' | 'red' => {
  if (score >= 80) return 'green';
  if (score >= 60) return 'yellow';
  return 'red';
};
</script>