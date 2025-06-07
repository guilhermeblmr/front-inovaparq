<!-- src/views/Startup/Create.vue -->
<template>
    <div class="p-6 max-w-xl mx-auto">
        <h1 class="text-2xl font-bold mb-6">Novo usuário</h1>

        <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
                <input v-model="form.name" type="text" id="name" name="name"
                    class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
                <input v-model="form.email" type="email" id="email" name="email"
                    class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
                <input v-model="form.password" type="password" id="password" name="password"
                    class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <SelectField label="Perfil" name="profile" v-model="form.profile" :options="['admin', 'startup']" />

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
import 'vue3-toastify/dist/index.css';


const form = reactive({
    name: '',
    email: '',
    password: '',
    profile: '',
})

const handleSubmit = () => {
    const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        profile: form.profile,
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

    fetch('http://127.0.0.1:8000/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao criar o usuário');
            }
            return response.json();
        })
        .then(data => {
            toast('Usuário criado com sucesso!', {
                type: toast.TYPE.SUCCESS,
                hideProgressBar: false,
                autoClose: 3000,
                position: toast.POSITION.BOTTOM_RIGHT,
                pauseOnHover: true,
            });

            form.name = '';
            form.email = '';
            form.password = '';
            form.profile = '';
        })
        .catch(error => {
            console.error('Erro:', error);
            toast('Erro ao criar o usuário: ' + error.message, {
                type: toast.TYPE.ERROR,
                hideProgressBar: false,
                autoClose: 3000,
                position: toast.POSITION.BOTTOM_RIGHT,
                pauseOnHover: true,
            });
        });
}

const validateForm = () => {
    return form.name && form.email && form.password && form.profile;
}
</script>
