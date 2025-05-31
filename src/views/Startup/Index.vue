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

        <div class="grid grid-cols-1 gap-6">
            <ReusableList :items="listItems" :onEdit="handleEdit" :onDelete="handleDelete" />
        </div>
        <!-- Listagem -->
    </div>
</template>

<script setup>
import { ref } from 'vue'
import ReusableList from '@/components/ReusableList.vue'

const listItems = [
  {
    id: 1,
    title: 'Startup Alpha',
    description: 'IA para negócios locais.',
    stage: 'Pré-incubação',
  },
  {
    id: 2,
    title: 'Startup Beta',
    description: 'Coworking management.',
    stage: 'Crescimento',
  },
  {
    id: 3,
    title: 'Startup Gamma',
    description: 'Soluções ambientais.',
    stage: 'Implantação',
  },
]

function handleEdit(item) {
  // todo
}

function handleDelete(item) {
  // todo
}

</script>
