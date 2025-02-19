<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold">Liste des matières</h2>
      <UButton
        icon="i-heroicons-plus"
        color="primary"
        @click="handleAddMatiere"
      >
        Ajouter une matière
      </UButton>
    </div>

    <div v-if="loading" class="flex justify-center py-4">
      <ULoadingIcon />
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
                icon="i-heroicons-ellipsis-vertical"
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

const router = useRouter()

interface Matiere {
id: number
nom: string
description: string
}

const loading = ref(false)
const error = ref<string | null>(null)
const matieres = ref<Matiere[]>([])

const getActionItems = (matiere: Matiere) => [
{
  label: 'Modifier',
  icon: 'i-heroicons-pencil',
  click: () => handleEditMatiere(matiere)
},
{
  label: 'Supprimer',
  icon: 'i-heroicons-trash',
  click: () => handleDeleteMatiere(matiere)
}
]

const fetchMatieres = async () => {
loading.value = true
try {
  const response = await fetch('http://localhost:3001/api/matieres')
  if (!response.ok) {
    throw new Error('Erreur lors du chargement des matières')
  }
  matieres.value = await response.json()
} catch (e) {
  error.value = e instanceof Error ? e.message : "Erreur lors du chargement des matières"
} finally {
  loading.value = false
}
}

const handleAddMatiere = () => {
  router.push('/matieres/ajouter')
}

const handleEditMatiere = (matiere: Matiere) => {
  router.push(`/matieres/${matiere.id}/modifier`)
}

const handleDeleteMatiere = async (matiere: Matiere) => {
  try {
    const response = await fetch(`http://localhost:3001/api/matieres/${matiere.id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression')
    }
    await fetchMatieres()
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Erreur lors de la suppression"
  }
}

const navigateToQuizz = (matiereId: number) => {
  router.push(`/matieres/${matiereId}/chapitres`)
}

onMounted(() => {
fetchMatieres()
})
</script>