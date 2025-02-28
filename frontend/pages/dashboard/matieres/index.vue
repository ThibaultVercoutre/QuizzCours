<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-4">
          <UButton
            icon="i-heroicons-arrow-left-20-solid"
            variant="ghost"
            @click="router.back()"
          />
          <h2 class="text-xl font-bold">Liste des matières</h2>
      </div>
      <UButton
        icon="i-heroicons-plus-20-solid"
        color="primary"
        @click="handleAddMatiere"
      >
        Ajouter une matière
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
      <UCard v-for="matiere in matieres" :key="matiere.id" class="flex flex-col">
        <template #header>
          <h3 class="text-lg font-semibold">{{ matiere.nom }}</h3>
        </template>
        
        <div class="flex-grow p-4">
          <p class="text-gray-600 line-clamp-3">{{ matiere.description }}</p>
        </div>
        
        <template #footer>
          <div class="flex justify-between items-center">
            <UButton
              color="primary"
              @click="navigateToQuizz(matiere.id)"
            >
              Accès aux chapitres
            </UButton>
            <UDropdown :items="getActionItems(matiere)">
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Matiere } from '@/types/matiere'
import { matiereService } from '@/services/matiereService'
import { authService } from '@/services/authService'

const router = useRouter()

const loading = ref(false)
const error = ref<string | null>(null)
const matieres = ref<Matiere[]>([])

const getActionItems = (matiere: Matiere) => [[
  {
    label: 'Modifier',
    icon: 'i-heroicons-pencil-20-solid',
    click: () => handleEditMatiere(matiere)
  },
  {
    label: 'Supprimer',
    icon: 'i-heroicons-trash-20-solid',
    click: () => handleDeleteMatiere(matiere)
  }
]]

const fetchMatieres = async () => {
  loading.value = true
  try {
    const userId = authService.getUser()?.id
    if (!userId) {
      throw new Error('Utilisateur non connecté')
    }
    matieres.value = await matiereService.getMatieresByUserId(userId)
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Erreur lors du chargement des matières"
  } finally {
    loading.value = false
  }
}

const handleAddMatiere = () => {
  router.push('/dashboard/matieres/ajouter')
}

const handleEditMatiere = (matiere: Matiere) => {
  router.push(`/dashboard/matieres/${matiere.id}/modifier`)
}

const handleDeleteMatiere = async (matiere: Matiere) => {
  try {
    await matiereService.deleteMatiere(matiere.id)
    await fetchMatieres()
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Erreur lors de la suppression"
  }
}

const navigateToQuizz = (matiereId: number) => {
  router.push(`/dashboard/matieres/${matiereId}/chapitres`)
}

onMounted(() => {
fetchMatieres()
})
</script>