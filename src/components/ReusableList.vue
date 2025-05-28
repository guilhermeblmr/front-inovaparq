<!-- src/components/ReusableList.vue -->
<template>
    <div class="space-y-4">
        <div v-for="(item, index) in items" :key="index"
            class="bg-white shadow rounded-xl p-4 border border-gray-200 hover:shadow-md transition">
            <div class="flex justify-between items-center">
                <!-- Conteúdo do item -->
                <div>
                    <h3 class="text-lg font-semibold text-gray-800">{{ item.title }}</h3>
                    <p class="text-gray-500 text-sm mt-1">{{ item.description }}</p>
                </div>

                <!-- Ações fixas -->
                <div class="flex gap-2">
                    <button @click="() => onEdit(item)"
                        class="text-sm px-3 py-1 rounded-md font-medium bg-blue-500 text-white hover:bg-blue-600">
                        Editar
                    </button>
                    <button @click="() => onDelete(item)"
                        class="text-sm px-3 py-1 rounded-md font-medium bg-red-500 text-white hover:bg-red-600">
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    items: {
        type: Array,
        required: true,
    },
    onEdit: {
        type: Function,
        required: true,
    },
    onDelete: {
        type: Function,
        required: true,
    },
})
</script>
