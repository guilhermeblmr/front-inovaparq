<template>
    <div class="p-6">
        <!-- Cabeçalho com botão -->
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold">Minhas Startups</h1>
            <router-link :to="{ name: 'create-startup' }"
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Nova Startup
            </router-link>
        </div>

        <!-- Listagem -->
        <ReusableList :items="listItems" :onEdit="handleEdit" :onDelete="handleDelete" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import ReusableList from '@/components/ReusableList.vue'

const listItems = ref([
    {
        id: 1,
        title: 'Startup Alpha',
        description: 'Solução em IA para negócios locais.',
    },
    {
        id: 2,
        title: 'Startup Beta',
        description: 'Gestão para espaços de coworking.',
    },
])

function handleEdit(item) {
    console.log('Editar:', item)
}

function handleDelete(item) {
    console.log('Excluir:', item)
}
</script>
