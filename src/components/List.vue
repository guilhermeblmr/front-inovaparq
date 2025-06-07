<template>
    <div class="space-y-3">
        <div v-for="item in props.items" :key="item.id"
            class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
            <div>
                <h3 class="font-semibold text-gray-800 text-sm">
                    {{ item.name }}
                </h3>
                <p class="text-xs text-gray-500">
                    {{ item.email }}
                </p>
                <span class="text-xs text-gray-400 italic">
                    {{ item.startup }}
                </span>
            </div>
            <div class="flex flex-col gap-1 text-right">
                <router-link :to="{ name: 'edit-user', params: { id: item.id } }"
                    class="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                    Editar
                </router-link>
                <button @click="() => props.onDelete(item)"
                    class="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                    Excluir
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    items: {
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
});
</script>
