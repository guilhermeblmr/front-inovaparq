<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)

const store = useStore()
const router = useRouter()

async function onSubmit() {
  loading.value = true
  error.value = null
  try {
    await store.dispatch('login', { email: email.value, password: password.value })
    router.push(store.state.returnUrl || '/empresas')
  } catch (err) {
    error.value = err.response?.data?.detail || 'Falha ao fazer login'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="h-screen flex flex-col items-center bg-[url(@/assets/login-bg.webp)] bg-no-repeat bg-right bg-cover justify-center">
    <div class="w-full h-full fixed top-0 left-0 bg-[#004aab] opacity-75 z-0"></div>

    <div class="relative w-96 bg-white/30 p-8 rounded-lg shadow-lg z-10 backdrop-blur-md">
      <div class="mb-6 text-center">
        <img src="@/assets/logo.webp" alt="Logo" class="mx-auto w-24 h-20" />
      </div>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            id="email"
            type="email"
            v-model="email"
            required
            class="mt-1 bg-white block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            class="mt-1 bg-white block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50"
        >
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
</style>
