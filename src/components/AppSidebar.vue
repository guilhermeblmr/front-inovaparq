<!-- src/components/Sidebar.vue -->
<template>
    <aside
        class="w-48 bg-blue-900 text-white h-screen flex flex-col items-center py-4 border-r border-black sticky top-0">
        <!-- Logo -->
        <img src="@/assets/logo.webp" alt="Logo Inovaparq" class="w-24 mb-6" />

        <!-- Nome da startup -->
        <div v-if="startup" class="bg-blue-300 text-black w-40 text-center py-1 mb-2 rounded shadow">
            {{ startup.name }}
        </div>

        <!-- Menu -->
        <router-link :to="{ name: 'startup-list' }">
            <button class="bg-blue-300 text-black w-40 text-center py-1 mb-2 rounded shadow hover:bg-blue-400">
                Startups
            </button>
        </router-link>

        <router-link v-if="user.profile == 'admin'" :to="{ name: 'user-list' }">
            <button class="bg-blue-300 text-black w-40 text-center py-1 mb-2 rounded shadow hover:bg-blue-400">
                Usuários
            </button>
        </router-link>

        <div class="absolute bottom-0 mb-4">
            <button class="bg-blue-300 text-black w-40 text-center py-1 mb-2 rounded shadow hover:bg-blue-400" @click="logout">
                Sair
            </button>
        </div>
    </aside>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { ref, onMounted } from 'vue'

const store = useStore()

const user = computed(() => store.getters.currentUser)
const startup = ref(null)

onMounted(async () => {
    if (user.value && user.value.startup_id) {
        try {
            const res = await fetch(`http://127.0.0.1:8000/startups/${user.value.startup_id}/`);
            if (!res.ok) throw new Error('Erro ao buscar a startup');
            const data = await res.json();
            startup.value = data;
        } catch (error) {
            console.error('Erro ao buscar a startup:', error);
        }
    }
})

const logout = () => {
    store.dispatch('logout')
    window.location.href = '/login'
}
</script>