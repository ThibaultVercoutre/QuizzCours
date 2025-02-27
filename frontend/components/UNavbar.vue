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
        
        <UTooltip :text="themeTooltipText">
          <UButton
            color="gray"
            variant="ghost"
            :icon="themeIcon"
            :ui="{ rounded: 'rounded-full' }"
            @click="toggleDark()"
            aria-label="Changer le thème"
          />
        </UTooltip>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const themeIcon = computed(() => {
  return colorMode.value === 'dark' 
    ? 'i-heroicons-moon' 
    : 'i-heroicons-sun';
});

const themeTooltipText = computed(() => {
  return colorMode.value === 'dark' 
    ? 'Passer au mode clair' 
    : 'Passer au mode sombre';
});

function toggleDark() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}
</script> 