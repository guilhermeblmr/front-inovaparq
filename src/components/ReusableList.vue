<template>
    <div class="flex gap-4 overflow-x-auto pb-4">
        <div v-for="stage in stages" :key="stage"
            class="w-64 shrink-0 bg-gray-100 rounded-xl p-4 border border-gray-200" :data-stage="stage">
            <h2 class="text-md font-bold text-gray-700 mb-3">{{ stage }}</h2>

            <draggable :list="filteredItems(stage)" :group="{ name: 'kanban', pull: true, put: true }" class="space-y-3"
                item-key="id" @end="onDragEnd">
                <template #item="{ element: item }">
                    <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                        <div class="flex justify-between items-center">
                            <div>
                                <h3 class="font-semibold text-gray-800 text-sm">
                                    {{ item.title }}
                                </h3>
                                <p class="text-xs text-gray-500 mt-1">
                                    {{ item.description }}
                                </p>
                            </div>
                            <div class="flex flex-col gap-1">
                                <button @click="() => props.onEdit(item)"
                                    class="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                                    Editar
                                </button>
                                <button @click="() => props.onDelete(item)"
                                    class="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                </template>
            </draggable>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import draggable from 'vuedraggable';

const props = defineProps({
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
});

const stages = [
    'Pré-incubação',
    'Implantação',
    'Crescimento',
    'Consolidação',
    'Graduação',
];

function filteredItems(stage) {
    return props.items.filter((item) => item.stage === stage);
}

function onDragEnd(event) {
    const { item, to } = event;
    const newStage = to.closest('[data-stage]').getAttribute('data-stage');
    item.stage = newStage;
    console.log(`Item moved to stage: ${newStage}`);

    // todo: atualizar o dado no backend e retornar a lista atualizada
}
</script>
