<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 p-4">
    <div class="w-full max-w-md bg-gray-800 rounded-lg overflow-hidden shadow-xl">
      <div class="flex items-center justify-center py-6 border-b border-gray-700">
        <UIcon name="i-heroicons-academic-cap" class="text-green-500 text-2xl mr-2" />
        <h1 class="text-2xl font-bold text-white">QuizzCours</h1>
      </div>
      
      <div class="flex border-b border-gray-700">
        <button 
          class="flex-1 py-3 text-center font-medium transition-colors"
          :class="isLogin ? 'text-white bg-gray-800' : 'text-gray-400 hover:text-gray-200'"
          @click="isLogin = true"
        >
          Connexion
        </button>
        <button 
          class="flex-1 py-3 text-center font-medium transition-colors"
          :class="!isLogin ? 'text-white bg-gray-800' : 'text-gray-400 hover:text-gray-200'"
          @click="isLogin = false"
        >
          Inscription
        </button>
      </div>
      
      <!-- Formulaire de connexion -->
      <div v-if="isLogin" class="p-6 space-y-4">
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-300">Email</label>
          <input 
            id="email"
            v-model="loginForm.email" 
            type="email" 
            placeholder="votre@email.com"
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <div class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-300">Mot de passe</label>
          <div class="relative">
            <input 
              id="password"
              v-model="loginForm.password" 
              :type="showLoginPassword ? 'text' : 'password'" 
              placeholder="Votre mot de passe"
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button 
              type="button" 
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              @click="showLoginPassword = !showLoginPassword"
            >
              <UIcon :name="showLoginPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" class="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div class="flex items-center">
          <input 
            id="remember" 
            type="checkbox" 
            v-model="loginForm.remember" 
            class="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-600 rounded bg-gray-700"
          />
          <label for="remember" class="ml-2 block text-sm text-gray-300">
            Se souvenir de moi
          </label>
        </div>
        
        <button 
          class="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          :class="{ 'opacity-75 cursor-not-allowed': isLoading }"
          :disabled="isLoading"
          @click="handleLogin"
        >
          <span v-if="isLoading" class="flex items-center justify-center">
            <UIcon name="i-heroicons-arrow-path" class="animate-spin h-5 w-5 mr-2" />
            Chargement...
          </span>
          <span v-else>Se connecter</span>
        </button>
      </div>
      
      <!-- Formulaire d'inscription -->
      <div v-else class="p-6 space-y-4">
        <div class="space-y-2">
          <label for="name" class="block text-sm font-medium text-gray-300">Nom</label>
          <input 
            id="name"
            v-model="registerForm.name" 
            type="text" 
            placeholder="Votre nom"
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <div class="space-y-2">
          <label for="register-email" class="block text-sm font-medium text-gray-300">Email</label>
          <input 
            id="register-email"
            v-model="registerForm.email" 
            type="email" 
            placeholder="votre@email.com"
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <div class="space-y-2">
          <label for="register-password" class="block text-sm font-medium text-gray-300">Mot de passe</label>
          <div class="relative">
            <input 
              id="register-password"
              v-model="registerForm.password" 
              :type="showRegisterPassword ? 'text' : 'password'" 
              placeholder="Choisissez un mot de passe"
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button 
              type="button" 
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              @click="showRegisterPassword = !showRegisterPassword"
            >
              <UIcon :name="showRegisterPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" class="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div class="space-y-2">
          <label for="confirm-password" class="block text-sm font-medium text-gray-300">Confirmer le mot de passe</label>
          <div class="relative">
            <input 
              id="confirm-password"
              v-model="registerForm.confirmPassword" 
              :type="showRegisterConfirmPassword ? 'text' : 'password'" 
              placeholder="Confirmez votre mot de passe"
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button 
              type="button" 
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              @click="showRegisterConfirmPassword = !showRegisterConfirmPassword"
            >
              <UIcon :name="showRegisterConfirmPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" class="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div class="flex items-center">
          <input 
            id="terms" 
            type="checkbox" 
            v-model="registerForm.acceptTerms" 
            class="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-600 rounded bg-gray-700"
          />
          <label for="terms" class="ml-2 block text-sm text-gray-300">
            J'accepte les conditions d'utilisation
          </label>
        </div>
        
        <button 
          class="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          :class="{ 'opacity-75 cursor-not-allowed': isLoading || !registerForm.acceptTerms }"
          :disabled="isLoading || !registerForm.acceptTerms"
          @click="handleRegister"
        >
          <span v-if="isLoading" class="flex items-center justify-center">
            <UIcon name="i-heroicons-arrow-path" class="animate-spin h-5 w-5 mr-2" />
            Chargement...
          </span>
          <span v-else>S'inscrire</span>
        </button>
      </div>
      
      <div class="px-6 py-4 bg-gray-800 border-t border-gray-700">
        <p class="text-center text-sm text-gray-400">
          {{ isLogin ? "Vous n'avez pas de compte ?" : "Vous avez déjà un compte ?" }}
          <button 
            class="ml-1 text-green-500 hover:text-green-400 font-medium focus:outline-none"
            @click="isLogin = !isLogin"
          >
            {{ isLogin ? "Se connecter" : "S'inscrire" }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { authService } from '@/services/authService';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  middleware: ['guest'],
  layout: 'auth'
});

const router = useRouter();

const isLogin = ref(true);
const isLoading = ref(false);
const showLoginPassword = ref(false);
const showRegisterPassword = ref(false);
const showRegisterConfirmPassword = ref(false);

const loginForm = reactive({
  email: '',
  password: '',
  remember: false
});

const registerForm = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
});

const handleLogin = async () => {
  isLoading.value = true;
  
  try {
    // Validation basique
    if (!loginForm.email || !loginForm.password) {
      console.error('Veuillez remplir tous les champs');
      isLoading.value = false;
      return;
    }
    
    // Appel au service d'authentification
    const response = await authService.login({
      email: loginForm.email,
      password: loginForm.password,
      remember: loginForm.remember
    });
    
    if (response.success) {
      // Rediriger vers le dashboard
      router.push('/dashboard');
    } else {
      console.error(response.error || 'Identifiants invalides');
    }
  } catch (error) {
    console.error('Erreur de connexion:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleRegister = async () => {
  isLoading.value = true;
  
  try {
    // Validation basique
    if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      console.error('Veuillez remplir tous les champs');
      isLoading.value = false;
      return;
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      console.error('Les mots de passe ne correspondent pas');
      isLoading.value = false;
      return;
    }
    
    if (!registerForm.acceptTerms) {
      console.error('Vous devez accepter les conditions d\'utilisation');
      isLoading.value = false;
      return;
    }
    
    // Appel au service d'authentification
    const response = await authService.register({
      name: registerForm.name,
      email: registerForm.email,
      password: registerForm.password
    });
    
    if (response.success) {
      // Rediriger vers le dashboard
      router.push('/dashboard');
    } else {
      console.error(response.error || 'Une erreur est survenue lors de l\'inscription');
    }
  } catch (error) {
    console.error('Erreur d\'inscription:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>
