<template>
  <div class="container mx-auto p-4">
    <UCard>
      <template #header>
        <h1 class="text-2xl font-bold">Contact</h1>
      </template>
      
      <div class="space-y-6">
        <p class="text-gray-600 dark:text-gray-400">
          Vous avez des questions ou des suggestions ? N'hésitez pas à nous contacter en remplissant le formulaire ci-dessous.
        </p>
        
        <form @submit.prevent="submitForm" class="space-y-4">
          <UFormGroup label="Nom" name="name">
            <UInput v-model="form.name" placeholder="Votre nom" />
          </UFormGroup>
          
          <UFormGroup label="Email" name="email">
            <UInput v-model="form.email" type="email" placeholder="votre.email@exemple.com" />
          </UFormGroup>
          
          <UFormGroup label="Sujet" name="subject">
            <USelect v-model="form.subject" :options="subjectOptions" placeholder="Sélectionnez un sujet" />
          </UFormGroup>
          
          <UFormGroup label="Message" name="message">
            <UTextarea v-model="form.message" placeholder="Votre message" :rows="5" />
          </UFormGroup>
          
          <div class="flex justify-end">
            <UButton type="submit" color="primary" :loading="loading">
              Envoyer
            </UButton>
          </div>
        </form>
        
        <UAlert v-if="showSuccess" color="green" title="Message envoyé" icon="i-heroicons-check-circle">
          Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
        </UAlert>
      </div>
      
      <template #footer>
        <UButton
          to="/"
          color="gray"
          variant="ghost"
          icon="i-heroicons-arrow-left"
        >
          Retour à l'accueil
        </UButton>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const subjectOptions = [
  { label: 'Question générale', value: 'general' },
  { label: 'Signaler un bug', value: 'bug' },
  { label: 'Suggestion', value: 'suggestion' },
  { label: 'Autre', value: 'other' }
];

const loading = ref(false);
const showSuccess = ref(false);

const submitForm = async () => {
  loading.value = true;
  
  // Simuler un délai d'envoi
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Réinitialiser le formulaire
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  loading.value = false;
  showSuccess.value = true;
  
  // Masquer le message de succès après 5 secondes
  setTimeout(() => {
    showSuccess.value = false;
  }, 5000);
};
</script> 