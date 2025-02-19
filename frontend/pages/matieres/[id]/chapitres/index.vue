<template>
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-4">
          <UButton
            icon="i-heroicons-arrow-left"
            variant="ghost"
            @click="router.back()"
          />
          <h2 class="text-xl font-bold">{{ matiere?.nom }} - Chapitres</h2>
        </div>
        <UButton
          icon="i-heroicons-plus"
          color="primary"
          @click="handleAddChapitre"
        >
          Ajouter un chapitre
        </UButton>
      </div>
  
      <div v-if="loading" class="flex justify-center py-4">
        <ULoadingIcon />
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
                Accéder au Quiz
              </UButton>
              <UDropdown :items="getActionItems(chapitre)">
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
  import { useRouter, useRoute } from 'vue-router'
  
  const router = useRouter()
  const route = useRoute()
  const matiereId = route.params.id as string
  
  interface Chapitre {
    id: number
    titre: string
    description: string
    matiere_id: number
  }
  
  interface Matiere {
    id: number
    nom: string
  }
  
  const loading = ref(false)
  const error = ref<string | null>(null)
  const chapitres = ref<Chapitre[]>([])
  const matiere = ref<Matiere | null>(null)
  
  const getActionItems = (chapitre: Chapitre) => [
    {
      label: 'Modifier',
      icon: 'i-heroicons-pencil',
      click: () => handleEditChapitre(chapitre)
    },
    {
      label: 'Supprimer',
      icon: 'i-heroicons-trash',
      click: () => handleDeleteChapitre(chapitre)
    }
  ]
  
  const fetchMatiere = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/matieres/${matiereId}`)
      if (!response.ok) {
        throw new Error('Erreur lors du chargement de la matière')
      }
      matiere.value = await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Erreur lors du chargement de la matière"
    }
  }
  
  const fetchChapitres = async () => {
    loading.value = true
    try {
      const response = await fetch(`http://localhost:3001/api/matieres/${matiereId}/chapitres`)
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des chapitres')
      }
      chapitres.value = await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Erreur lors du chargement des chapitres"
    } finally {
      loading.value = false
    }
  }
  
  const handleAddChapitre = () => {
    router.push(`/matieres/${matiereId}/chapitres/ajouter`)
  }
  
  const handleEditChapitre = (chapitre: Chapitre) => {
    router.push(`/chapitres/${chapitre.id}/modifier`)
  }
  
  const handleDeleteChapitre = async (chapitre: Chapitre) => {
    try {
      const response = await fetch(`http://localhost:3001/api/chapitres/${chapitre.id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression')
      }
      await fetchChapitres()
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Erreur lors de la suppression"
    }
  }
  
  const navigateToQuizz = (chapitreId: number) => {
    router.push(`/chapitres/${chapitreId}/quizz`)
  }
  
  onMounted(async () => {
    await fetchMatiere()
    await fetchChapitres()
  })
</script>