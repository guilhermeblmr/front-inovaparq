<!-- src/views/Startup/Create.vue -->
<template>
    <div class="p-6 max-w-xl mx-auto">
        <h1 class="text-2xl font-bold mb-6">Nova Startup</h1>

        <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Nome da empresa</label>
                <input v-model="form.name" type="text" id="name"
                    class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                    required />
            </div>

            <div>
                <label for="description" class="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea v-model="form.description" id="description" rows="3"
                    class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                    required></textarea>
            </div>

            <SelectField label="Incubadora" name="incubator" v-model="form.incubator"
                :options="['CRIA-TE', 'CAUSE', 'CENTRA']" />

            <div class="pt-4">
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    Salvar
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import SelectField from '@/components/Forms/SelectField.vue'

const form = reactive({
    name: '',
    description: '',
    incubator: '',
})

function handleSubmit() {
    console.log('Dados do formulário:', form)
    // Aqui você pode fazer o POST para a API ou usar Inertia, por exemplo
}
</script>
