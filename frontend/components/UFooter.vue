<template>
    <footer class="bg-white dark:bg-gray-800 shadow-md mt-8">
      <div class="container mx-auto p-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              © 2025 QuizzCours - Tous droits réservés
            </p>
          </div>
          <div class="flex space-x-4">
            <UButton
              variant="ghost"
              color="gray"
              icon="i-heroicons-information-circle"
              to="/dashboard/about"
              size="sm"
            >
              À propos
            </UButton>
            <UButton
              variant="ghost"
              color="gray"
              icon="i-heroicons-envelope"
              to="/dashboard/contact"
              size="sm"
            >
              Contact
            </UButton>
          </div>
        </div>
      </div>
    </footer>
</template> 
