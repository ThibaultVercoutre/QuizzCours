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
  import { ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import type { CreateChapitreDto } from '../../../../../types/chapitre'
  import { chapitreService } from '../../../../../services/chapitreService'
  
  const route = useRoute()
  const router = useRouter()
  const matiereId = Number(route.params.id)
  
  const loading = ref(false)
  const formState = ref<CreateChapitreDto>({
    titre: '',
    description: '',
    matiereId: matiereId
  })
  
  const onSubmit = async () => {
    loading.value = true
    try {
      await chapitreService.createChapitre(formState.value)
      router.push(`/matieres/${matiereId}/chapitres`)
    } catch (error) {
      console.error(error)
      alert(error instanceof Error ? error.message : 'Une erreur est survenue')
    } finally {
      loading.value = false
    }
  }
  </script>