<template>
  <div class="min-h-screen flex flex-col">
    
    <UNavbar />
    
    <main class="flex-grow flex-1 w-full flex flex-col h-full">
      <slot />
    </main>
    
    <UFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Le layout par défaut qui sera utilisé pour toutes les pages
const mounted = ref(false);

onMounted(() => {
  mounted.value = true;
});
</script>