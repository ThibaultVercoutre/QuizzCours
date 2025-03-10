<template>
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-4">
          <UButton
            icon="i-heroicons-arrow-left-20-solid"
            variant="ghost"
            @click="router.back()"
          />
          <h2 class="text-xl font-bold">{{ matiere?.nom }} - Chapitres</h2>
        </div>
        <UButton
          icon="i-heroicons-plus-20-solid"
          color="primary"
          @click="handleAddChapitre"
        >
          Ajouter un chapitre
        </UButton>
      </div>
  
      <div v-if="loading" class="flex justify-center py-4">
        <div class="w-full max-w-md">
          <UProgress animation="carousel" color="primary" class="w-full" />
        </div>
      </div>
      
      <div v-else-if="error" class="text-red-500 py-4">
        {{ error }}
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <UCard v-for="chapitre in chapitres" :key="chapitre.id" class="flex flex-col">
          <template #header>
            <h3 class="text-lg font-semibold">{{ chapitre.titre }}</h3>
          </template>
          
          <div class="flex-grow p-4">
            <p class="text-gray-600 line-clamp-3">{{ chapitre.description }}</p>
          </div>
          
          <template #footer>
            <div class="flex justify-between items-center">
              <UButton
                color="primary"
                @click="navigateToQuizz(chapitre.id)"
              >
                Accéder au Quizz
              </UButton>
              <UButton
                color="gray"
                @click="navigateToScores(chapitre.id)"
              >
                Accéder aux scores
              </UButton>
              <UDropdown :items="getActionItems(chapitre)">
                <UButton
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-ellipsis-vertical-20-solid"
                />
              </UDropdown>
            </div>
          </template>
        </UCard>
      </div>
    </div>
</template>
  
<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import type { Chapitre } from '@/types/chapitre'
  import { chapitreService } from '@/services/chapitreService'
  import { matiereService } from '@/services/matiereService'
  
  const router = useRouter()
  const route = useRoute()
  const matiereId = Number(route.params.id)
  
  interface Matiere {
    id: number
    nom: string
  }
  
  const loading = ref(false)
  const error = ref<string | null>(null)
  const chapitres = ref<Chapitre[]>([])
  const matiere = ref<Matiere | null>(null)
  
  const getActionItems = (chapitre: Chapitre) => [[
    {
      label: 'Modifier',
      icon: 'i-heroicons-pencil-20-solid',
      click: () => handleEditChapitre(chapitre)
    },
    {
      label: 'Supprimer',
      icon: 'i-heroicons-trash-20-solid',
      click: () => handleDeleteChapitre(chapitre)
    }
  ]]
  
  const fetchMatiere = async () => {
    try {
      matiere.value = await matiereService.getMatiere(matiereId)
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Erreur lors du chargement de la matière"
    }
  }
  
  const fetchChapitres = async () => {
    loading.value = true
    error.value = null
    try {
      // Forcer le rechargement depuis le serveur
      // Au lieu d'accéder directement au cache, on passe un paramètre pour forcer le rechargement
      const forceRefresh = true
      chapitres.value = await chapitreService.getChapitresByMatiereId(matiereId, forceRefresh)
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Erreur lors du chargement des chapitres"
    } finally {
      loading.value = false
    }
  }
  
  const handleAddChapitre = () => {
    router.push(`/dashboard/matieres/${matiereId}/chapitres/ajouter`)
  }
  
  const handleEditChapitre = (chapitre: Chapitre) => {
    router.push(`/dashboard/matieres/${matiereId}/chapitres/${chapitre.id}/modifier`)
  }
  
  const handleDeleteChapitre = async (chapitre: Chapitre) => {
    try {
      await chapitreService.deleteChapitre(chapitre.id)
      await fetchChapitres()
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Erreur lors de la suppression"
    }
  }
  
  const navigateToQuizz = (chapitreId: number) => {
    router.push(`/dashboard/matieres/${matiereId}/chapitres/${chapitreId}/quizz`)
  }
  
  const navigateToScores = (chapitreId: number) => {
    router.push(`/dashboard/matieres/${matiereId}/chapitres/${chapitreId}/scores`)
  }
  
  // Observer les changements de route pour recharger les données si nécessaire
  watch(() => route.query.refresh, (newVal) => {
    if (newVal) {
      fetchChapitres()
    }
  })
  
  onMounted(async () => {
    await fetchMatiere()
    await fetchChapitres()
  })
</script>