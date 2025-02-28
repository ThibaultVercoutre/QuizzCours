<template>
  <div class="container mx-auto p-4">
    <div class="flex items-center gap-4 mb-6">
      <UButton
        icon="arrow-left"
        variant="ghost"
        @click="router.back()"
      />
      <h2 class="text-xl font-bold">Ajouter une question</h2>
    </div>

    <UForm :state="formState" @submit="onSubmit">
      <UFormGroup label="Question" name="enonce">
        <UInput v-model="formState.enonce" required />
      </UFormGroup>

      <div class="mt-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-semibold">Réponses</h3>
          <UButton
            size="sm"
            variant="ghost"
            icon="plus"
            @click="addReponse"
          >
            Ajouter une réponse
          </UButton>
        </div>

        <div v-for="(reponse, index) in formState.reponses" :key="index" class="mb-4">
          <div class="flex items-center gap-4">
            <UFormGroup label="Réponse" class="flex-1">
              <UInput
                v-model="reponse.texte"
                placeholder="Saisissez une réponse"
                required
              />
            </UFormGroup>
            <UCheckbox
              v-model="reponse.est_correcte"
              label="Correcte"
            />
            <UButton
              icon="trash"
              color="red"
              variant="ghost"
              @click="removeReponse(index)"
            />
          </div>
        </div>
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
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { quizzService } from '@/services/quizzService'

const router = useRouter()
const route = useRoute()
const chapitreId = route.params.idChap as string

interface Reponse {
  texte: string
  est_correcte: boolean
}

const loading = ref(false)
const formState = ref({
  enonce: '',
  reponses: [{ texte: '', est_correcte: false }] as Reponse[]
})

const addReponse = () => {
  formState.value.reponses.push({ texte: '', est_correcte: false })
}

const removeReponse = (index: number) => {
  formState.value.reponses.splice(index, 1)
}

const onSubmit = async () => {
  loading.value = true
  try {
    // Préparer les données pour le service
    const questionData = {
      question: {
        enonce: formState.value.enonce,
        chapitre_id: parseInt(chapitreId)
      },
      reponses: formState.value.reponses.map(reponse => ({
        texte: reponse.texte,
        est_correcte: reponse.est_correcte
      }))
    }

    // Utiliser le service pour créer la question
    await quizzService.createQuestion(parseInt(chapitreId), questionData)

    // Si tout s'est bien passé, rediriger
    router.back()
  } catch (error) {
    console.error('Erreur:', error)
    alert(error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'enregistrement')
  } finally {
    loading.value = false
  }
}
</script>