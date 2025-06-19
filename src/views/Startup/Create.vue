<!-- src/views/Startup/Create.vue -->
<template>
    <div class="p-6 max-w-xl mx-auto">
        <h1 class="text-2xl font-bold mb-6">Nova Startup</h1>

        <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Nome da empresa</label>
                <input v-model="form.name" type="text" id="name" name="name"
                    class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div>
                <label for="description" class="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea v-model="form.description" id="description" rows="3" name="description"
                    class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>

            <SelectField label="Incubadora" name="incubator" v-model="form.incubator"
                :options="['CRIA-TE', 'CAUSE', 'CENTRA', 'NANOTECH']" />

            <SelectField label="Plano" name="plan" v-model="form.plan"
                :options="['Start', 'Grow']" />

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
import { toast } from 'vue3-toastify';


const form = reactive({
    name: '',
    description: '',
    incubator: '',
    plan: '',
})

const handleSubmit = () => {
    const payload = {
        name: form.name,
        description: form.description,
        incubator: form.incubator,
        plan: form.plan,
        stage: 'Pré-Incubação'
    };

    if (!validateForm()) {
        toast('Por favor, preencha todos os campos obrigatórios.', {
            type: toast.TYPE.WARNING,
            hideProgressBar: false,
            autoClose: 3000,
            position: toast.POSITION.BOTTOM_RIGHT,
            pauseOnHover: true,
        });
        return;
    }

    fetch('http://127.0.0.1:8000/startups/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao criar a startup');
            }
            return response.json();
        })
        .then(data => {
            toast('Startup criada com sucesso!', {
                type: toast.TYPE.SUCCESS,
                hideProgressBar: false,
                autoClose: 3000,
                position: toast.POSITION.BOTTOM_RIGHT,
                pauseOnHover: true,
            });

            form.name = '';
            form.plan = '';
            form.description = '';
            form.incubator = '';
        })
        .catch(error => {
            console.error('Erro:', error);
            toast('Erro ao criar a startup: ' + error.message, {
                type: toast.TYPE.ERROR,
                hideProgressBar: false,
                autoClose: 3000,
                position: toast.POSITION.BOTTOM_RIGHT,
                pauseOnHover: true,
            });
        });
}

const validateForm = () => {
    return form.name && form.description && form.incubator;
}
</script>
