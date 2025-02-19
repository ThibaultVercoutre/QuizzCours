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
  import { useRouter, useRoute } from 'vue-router'
  
  const router = useRouter()
  const route = useRoute()
  const matiereId = route.params.id as string
  
  const loading = ref(false)
  const formState = ref({
    titre: '',
    description: ''
  })
  
  const onSubmit = async () => {
    loading.value = true
    try {
      const response = await fetch(`http://localhost:3001/api/chapitres`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formState.value,
          matiere_id: parseInt(matiereId)
        })
      })
  
      if (!response.ok) {
        throw new Error('Erreur lors de la création du chapitre')
      }
  
      router.push(`/matieres/${matiereId}/chapitres`)
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }
  </script>