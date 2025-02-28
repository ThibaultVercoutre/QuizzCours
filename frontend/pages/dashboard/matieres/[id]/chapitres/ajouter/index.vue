<template>
    <div class="container mx-auto p-4">
      <div class="flex items-center gap-4 mb-6">
        <UButton
          icon="i-heroicons-arrow-left"
          variant="ghost"
          @click="router.back()"
        />
        <h2 class="text-xl font-bold">Ajouter un chapitre</h2>
      </div>
  
      <UForm :state="formState" @submit="onSubmit">
        <UFormGroup label="Titre" name="titre">
          <UInput v-model="formState.titre" />
        </UFormGroup>
  
        <UFormGroup label="Description" name="description">
          <UTextarea v-model="formState.description" />
        </UFormGroup>
  
        <div v-if="error" class="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {{ error }}
        </div>
  
        <div class="flex justify-end gap-4 mt-4">
          <UButton
            variant="ghost"
            @click="router.back()"
          >
            Annuler
          </UButton>
          <UButton
            type="submit"
            color="primary"
            :loading="loading"
          >
            Ajouter
          </UButton>
        </div>
      </UForm>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onBeforeUnmount } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import type { CreateChapitreDto } from '@/types/chapitre'
  import { chapitreService } from '@/services/chapitreService'
  
  const route = useRoute()
  const router = useRouter()
  const matiereId = Number(route.params.id)
  
  const loading = ref(false)
  const error = ref<string>('')
  
  const formState = ref<CreateChapitreDto>({
    titre: '',
    description: '',
    matiere_id: matiereId
  })
  
  // Fonction pour naviguer et forcer un rechargement de la page
  const navigateAndRefresh = (path: string) => {
    // On utilise un paramètre de requête avec un timestamp pour forcer le rechargement
    const timestamp = Date.now()
    router.push(`${path}?refresh=${timestamp}`)
  }
  
  const onSubmit = async () => {
    loading.value = true
    error.value = ''
    
    try {
      if (!formState.value.titre.trim()) {
        throw new Error('Le titre est obligatoire')
      }
      
      // Vérification des données avant envoi
      const chapitreData = {
        titre: formState.value.titre,
        description: formState.value.description,
        matiere_id: Number(matiereId)
      }
      
      const response = await chapitreService.createChapitre(chapitreData)
      
      // Utiliser navigateAndRefresh au lieu de router.push pour forcer un rechargement
      navigateAndRefresh(`/dashboard/matieres/${matiereId}/chapitres`)
    } catch (err) {
      
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as any
        if (axiosError.response?.status === 500) {
          error.value = 'Une erreur est survenue sur le serveur. Veuillez réessayer plus tard.'
        } else {
          error.value = axiosError.response?.data?.message || 
                       axiosError.response?.data?.error ||
                       'Erreur lors de la communication avec le serveur'
        }
      } else if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Erreur lors de la création du chapitre. Veuillez réessayer.'
      }
    } finally {
      loading.value = false
    }
  }
  
  // Nettoyer les références
  onBeforeUnmount(() => {
    formState.value = {
      titre: '',
      description: '',
      matiere_id: matiereId
    }
    error.value = ''
  })
  </script>