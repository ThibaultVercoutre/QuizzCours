<template>
  <div class="container mx-auto p-4">
    <div class="flex items-center gap-4 mb-6">
      <UButton
        icon="i-heroicons-arrow-left"
        variant="ghost"
        @click="router.back()"
      />
      <h2 class="text-xl font-bold">Historique des scores</h2>
    </div>

    <div v-if="loading" class="flex justify-center py-4">
      <ULoadingIcon />
    </div>

    <div v-else-if="error" class="text-red-500 py-4">
      {{ error }}
    </div>

    <div v-else class="grid gap-6">
      <!-- Carte du score moyen -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Score moyen</h3>
            <span class="text-2xl font-bold text-primary">{{ averageScore }}%</span>
          </div>
        </template>
      </UCard>

      <!-- Carte du graphique -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Évolution des scores</h3>
        </template>
        
        <div class="h-64 relative px-4">
          <!-- Lignes de référence -->
          <div class="absolute inset-0 flex flex-col justify-between pointer-events-none">
            <template v-for="n in 5" :key="n">
              <div class="h-px bg-gray-100 w-full" />
            </template>
          </div>

          <!-- Barres -->
          <div class="absolute inset-0 flex items-end justify-around">
            <div
              v-for="score in scores"
              :key="score.id"
              class="group relative flex-1 mx-1"
            >
              <div
                class="w-full bg-primary transition-all duration-300 rounded-t"
                :style="{ height: `${score.pourcentage}%` }"
              >
                <UTooltip :text="`${score.pourcentage}%`" />
              </div>
            </div>
          </div>

          <!-- Axes -->
          <div class="absolute left-0 h-full w-px bg-gray-200" />
          <div class="absolute bottom-0 w-full h-px bg-gray-200" />
          
          <!-- Échelle Y -->
          <div class="absolute -left-8 h-full flex flex-col justify-between text-sm text-gray-500">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>
        </div>
      </UCard>

      <!-- Carte de l'historique -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Historique détaillé</h3>
        </template>

        <UTable
          :rows="scores"
          :columns="[
            {
              key: 'pourcentage',
              label: 'Score',
              formatter: (value) => `${value}%`
            },
            {
              key: 'created_at',
              label: 'Date',
              formatter: (value) => new Date(value).toLocaleDateString()
            }
          ]"
        >
          <template #pourcentage-data="{ row }">
            <div class="flex items-center gap-2">
              <div 
                class="w-2 h-2 rounded-full"
                :class="row.pourcentage >= 50 ? 'bg-green-500' : 'bg-red-500'"
              />
              {{ row.pourcentage }}%
            </div>
          </template>
        </UTable>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { Score } from '../../../../../../types/score'
import { scoreService } from '../../../../../../services/scoreService'

const router = useRouter()
const route = useRoute()
const chapitreId = Number(route.params.idChap)

const loading = ref(false)
const error = ref<string | null>(null)
const scores = ref<Score[]>([])
const averageScore = ref<number>(0)

const fetchScores = async () => {
  loading.value = true
  try {
    const [scoresData, avgScore] = await Promise.all([
      scoreService.getScoresByChapitreId(chapitreId),
      scoreService.getAverageScore(chapitreId)
    ])
    scores.value = scoresData.reverse()
    averageScore.value = avgScore
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Erreur lors du chargement des données"
  } finally {
    loading.value = false
  }
}

onMounted(fetchScores)
</script>
