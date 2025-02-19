<template>
    <div class="container mx-auto p-4">
      <UCard>
        <template #header>
          <h1 class="text-2xl font-bold">Bienvenue sur QuizzCours</h1>
        </template>
        <p class="text-gray-600 dark:text-gray-400">
          Sélectionnez une matière pour commencer à étudier.
        </p>
        <template #footer>
          <UButton
            to="/matieres"
            color="primary"
            icon="i-heroicons-arrow-right"
          >
            Voir les matières
          </UButton>
        </template>
      </UCard>
    </div>
  </template>