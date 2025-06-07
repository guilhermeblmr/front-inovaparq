<template>
	<div class="p-6">
		<!-- Cabeçalho com botão -->
		<div class="flex justify-between items-center mb-4">
			<h1 class="text-2xl font-bold">Usuários</h1>
			<router-link :to="{ name: 'create-user' }"
				class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
				Novo Usuário
			</router-link>
		</div>

		<div class="grid grid-cols-1 gap-6">
			<List :items="listItems" :onEdit="handleEdit" :onDelete="handleDelete" />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import List from '@/components/List.vue'

import { onMounted } from 'vue'

const listItems = ref([])

onMounted(async () => {
	try {
		const response = await fetch('http://127.0.0.1:8000/users/')
		if (!response.ok) throw new Error('Erro ao buscar startups')
		const data = await response.json()
		listItems.value = data
	} catch (error) {
		console.error(error)
	}
})

</script>
