<template>
    <UHeader class="border-b border-gray-200 dark:border-gray-800">
      <template #left>
        <UButton
          variant="ghost"
          to="/"
          class="font-bold text-xl"
        >
          QuizzCours
        </UButton>
      </template>
      <template #right>
        <UButton
          variant="ghost"
          to="/matieres"
          icon="i-heroicons-book-open"
        >
          Accès aux matières
        </UButton>
      </template>
    </UHeader>
  </template>