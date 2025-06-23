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
                    {{ item.profile.charAt(0).toUpperCase() + item.profile.slice(1) }}
                </span>
            </div>
            <div class="flex flex-col gap-1 text-right">
                <router-link :to="{ name: 'edit-user', params: { id: item.id } }"
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

<script setup>
import { defineProps } from 'vue';
import { toast } from 'vue3-toastify';

const props = defineProps({
    items: {
        required: true,
    }
});

const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir este item?')) {
        onDelete(id);
    }
};

const onDelete = (id) => {
    // Aqui você pode implementar a lógica de exclusão, como fazer uma requisição para a API
    console.log(`Excluindo item com ID: ${id}`);
    fetch(`http://127.0.1:8000/users/${id}/`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao excluir o item');
            }
            // Aqui você pode atualizar a lista de itens após a exclusão
            toast.success('Item excluído com sucesso!', {
                hideProgressBar: false,
                autoClose: 1000,
                position: toast.POSITION.BOTTOM_RIGHT,
                pauseOnHover: true,
            });

            window.location.reload();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    };
</script>
