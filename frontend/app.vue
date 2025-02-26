<template>
  <div class="flex flex-col min-h-screen">
    <UNavbar />
    <NuxtRouteAnnouncer />
    <main class="flex-grow">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>
    <UFooter />
  </div>
</template>

<script setup>
// S'assurer que les composants sont correctement importés
import UNavbar from '~/components/UNavbar.vue';
import UFooter from '~/components/UFooter.vue';
</script>

<style>
body {
  @apply bg-gray-50 dark:bg-gray-900;
  min-height: 100vh;
}
</style>