<template>
  <UContainer>
    <div class="flex justify-between items-center py-3">
      <NuxtLink to="/" class="flex items-center gap-2">
        <UIcon name="i-heroicons-academic-cap" class="text-primary text-xl" />
        <span class="font-bold text-lg">QuizzCours</span>
      </NuxtLink>
      
      <div class="flex items-center gap-4">
        <UHorizontalNavigation>
          <ULink to="/" active-class="text-primary" inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            Accueil
          </ULink>
          <ULink to="/matieres" active-class="text-primary" inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            Matières
          </ULink>
          <ULink to="/contact" active-class="text-primary" inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            Contact
          </ULink>
        </UHorizontalNavigation>
        
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-moon"
          :ui="{ rounded: 'rounded-full' }"
          @click="toggleDark()"
          aria-label="Changer le thème"
        />
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

function toggleDark() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}
</script> 