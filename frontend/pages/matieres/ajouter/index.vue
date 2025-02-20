<template>
    <div class="container mx-auto p-4">
      <div class="flex items-center gap-4 mb-6">
        <UButton
          icon="i-heroicons-arrow-left"
          variant="ghost"
          @click="router.back()"
        />
        <h2 class="text-xl font-bold">Ajouter une matière</h2>
      </div>
  
      <UForm :state="formState" @submit="onSubmit">
        <UFormGroup label="Titre" name="titre">
          <UInput v-model="formState.nom" required />
        </UFormGroup>

        <UFormGroup label="Description" name="description">
          <UTextarea v-model="formState.description" required />
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
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const loading = ref(false)
  const formState = ref({
    nom: '',
    description: ''
  })
  
  const onSubmit = async () => {
    loading.value = true
    try {
      const response = await fetch('http://localhost:3001/api/matieres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState.value)
      })
  
      if (!response.ok) {
        throw new Error('Erreur lors de la création de la matière')
      }
  
      router.push('/matieres')
    } catch (error) {
      console.error(error)
      alert(error instanceof Error ? error.message : 'Une erreur est survenue')
    } finally {
      loading.value = false
    }
  }
</script>