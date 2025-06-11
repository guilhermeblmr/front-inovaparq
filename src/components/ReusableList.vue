<template>
    <div class="flex gap-4 overflow-x-auto pb-4">
        <div v-for="stage in stages" :key="stage"
            class="w-64 shrink-0 bg-gray-100 rounded-xl p-4 border border-gray-200" :data-stage="stage">
            <h2 class="text-md font-bold text-gray-700 mb-3">{{ stage }}</h2>

            <draggable :list="filteredItems(stage)" :disabled="user.profile !== 'admin'"
                :group="{ name: 'kanban', pull: true, put: true }" class="space-y-3" item-key="id" @end="onDragEnd">
                <template #item="{ element: item }">
                    <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                        <div class="flex justify-between items-center w-full">
                            <div class="max-w-2/3">
                                <h3 class="font-semibold text-gray-800 text-sm max-w-full ">
                                    <p class="overflow-hidden text-ellipsis">{{ item.name }}</p>
                                </h3>
                                <p class="text-xs text-gray-500 mt-1">
                                    <p class="overflow-hidden text-ellipsis">{{ item.description }}</p>
                                </p>
                            </div>
                            <div v-if="user.profile == 'admin'" class="flex flex-col gap-1">
                                <router-link :to="{ name: 'edit-startup', params: { id: item.id } }"
                                    class="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                                    Editar
                                </router-link>
                                <button @click="() => handleDelete(item.id)"
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
import { computed } from 'vue'
import { useStore } from 'vuex'
import { toast } from 'vue3-toastify';

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

const stages = [
    'Pré-Incubação',
    'Implantação',
    'Crescimento',
    'Consolidação',
    'Graduação',
];

const store = useStore()

const user = computed(() => store.getters.currentUser)

function filteredItems(stage) {
    return props.items.filter((item) => item.stage === stage);
}

function onDragEnd(event) {
    const movedItem = event.item._underlying_vm_;
    const { to } = event;
    const newStage = to.closest('[data-stage]').getAttribute('data-stage');
    movedItem.stage = newStage;

    fetch(`http://127.0.0.1:8000/startups/${movedItem.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...movedItem, stage: newStage }),
    })
        .then(response => response.json())
        .then(updatedItem => {
            return fetch('/api/items');
        })
        .then(response => response.json())
        .then(updatedList => {
            emit('update:items', updatedList);
        })
        .catch(error => {
            console.error('Erro ao atualizar item:', error);
        });

}

const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir este item?')) {
        onDelete(id);
    }
};

const onDelete = (id) => {
    console.log(`Excluindo item com ID: ${id}`);
    fetch(`http://127.0.1:8000/startups/${id}/`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao excluir o item');
            }
            toast.success('Item excluído com sucesso!', {
                hideProgressBar: false,
                autoClose: 1000,
                position: toast.POSITION.BOTTOM_RIGHT,
                pauseOnHover: true,
            });

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
};
</script>
