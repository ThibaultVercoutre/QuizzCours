<template>
    <UContainer>
      <div class="flex justify-center items-center py-3">
        <NuxtLink to="/" class="flex items-center gap-2">
          <UIcon name="i-heroicons-academic-cap" class="text-primary text-xl" />
          <span class="font-bold text-lg">QuizzCours</span>
        </NuxtLink>
        
        <div class="flex items-center gap-4">
          <UHorizontalNavigation>
            <ULink to="/dashboard" active-class="text-primary" inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              Accueil
            </ULink>
            <ULink to="/dashboard/matieres" active-class="text-primary" inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              Matières
            </ULink>
            <ULink to="/dashboard/contact" active-class="text-primary" inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              Contact
            </ULink>
          </UHorizontalNavigation>
        </div>
      </div>
    </UContainer>
</template>

<script setup lang="ts">

</script> 