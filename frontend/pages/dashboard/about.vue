<template>
  <div class="container mx-auto p-4">
    <UCard>
      <template #header>
        <h1 class="text-2xl font-bold">À propos de QuizzCours</h1>
      </template>
      
      <div class="space-y-4">
        <p>
          QuizzCours est une application web conçue pour aider les étudiants à réviser leurs cours
          à travers des quiz interactifs.
        </p>
        
        <h2 class="text-xl font-semibold mt-4">Notre mission</h2>
        <p>
          Faciliter l'apprentissage en proposant une méthode interactive et efficace pour tester
          ses connaissances dans différentes matières.
        </p>
        
        <h2 class="text-xl font-semibold mt-4">Fonctionnalités</h2>
        <ul class="list-disc pl-5 space-y-2">
          <li>Création et gestion de matières et chapitres</li>
          <li>Ajout de questions à choix multiples</li>
          <li>Passage de quiz par chapitre ou matière</li>
          <li>Suivi des scores et progression</li>
        </ul>
        
        <h2 class="text-xl font-semibold mt-4">Technologies utilisées</h2>
        <div class="flex flex-wrap gap-2 mt-2">
          <UBadge color="primary">Nuxt.js</UBadge>
          <UBadge color="primary">Nuxt UI</UBadge>
          <UBadge color="green">Hapi.js</UBadge>
          <UBadge color="green">Sequelize</UBadge>
          <UBadge color="blue">TypeScript</UBadge>
          <UBadge color="orange">MySQL</UBadge>
        </div>
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