<template>
    <div class="p-6 max-w-xl mx-auto">
        <h1 class="text-2xl font-bold mb-6">Editar Startup</h1>

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

            <!-- <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
                <input v-model="form.password" type="password" id="password" name="password"
                    class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500" />
            </div> -->

            <div v-if="form.profile != 'admin'">
                <label for="startup" class="block text-sm font-medium text-gray-700">Startup</label>
                <select v-model="form.startup_id" id="startup" name="startup"
                    class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500">
                    <option value="" disabled>Selecione uma startup</option>
                    <option v-for="startup in startups" :key="startup.id" :value="startup.id">
                        {{ startup.name }}
                    </option>
                </select>
            </div>

            <div class="pt-4">
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    Salvar
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const startups = ref([]);

const form = reactive({
    name: '',
    email: '',
    password: '',
    startup_id: '',
    profile: '',
})

const fetchUser = async () => {
    try {
        const res = await fetch(`http://127.0.0.1:8000/users/${id}/`);
        if (!res.ok) throw new Error('Erro ao buscar o usuário');
        const data = await res.json();
        console.log(data)
        form.name = data.name;
        form.email = data.email;
        form.password = data.password;
        form.startup_id = data.startup_id;
        form.profile = data.profile;
    } catch (error) {
        toast('Erro ao carregar o usuário: ' + error.message, {
            type: toast.TYPE.ERROR,
            hideProgressBar: false,
            autoClose: 3000,
            position: toast.POSITION.BOTTOM_RIGHT,
            pauseOnHover: true,
        });
        router.push('/users');
    }
}

const fetchStartups = async () => {
    try {
        const res = await fetch(`http://127.0.0.1:8000/startups/`);
        if (!res.ok) throw new Error('Erro ao buscar a startup');
        const data = await res.json();
        startups.value = data;
    } catch (error) {
        toast('Erro ao carregar a startup: ' + error.message, {
            type: toast.TYPE.ERROR,
            hideProgressBar: false,
            autoClose: 3000,
            position: toast.POSITION.BOTTOM_RIGHT,
            pauseOnHover: true,
        });
        router.push('/startups');
    }
}

onMounted(fetchStartups);

onMounted(fetchUser);

const handleSubmit = () => {
    const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        startup_id: form.startup_id,
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

    fetch(`http://127.0.0.1:8000/users/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar o usuário');
            }
            return response.json();
        })
        .then(data => {
            toast('Usuário atualizado com sucesso!', {
                type: toast.TYPE.SUCCESS,
                hideProgressBar: false,
                autoClose: 3000,
                position: toast.POSITION.BOTTOM_RIGHT,
                pauseOnHover: true,
            });
        })
        .catch(error => {
            console.error('Erro:', error);
            toast('Erro ao atualizar o usuário: ' + error.message, {
                type: toast.TYPE.ERROR,
                hideProgressBar: false,
                autoClose: 3000,
                position: toast.POSITION.BOTTOM_RIGHT,
                pauseOnHover: true,
            });
        });
}

const validateForm = () => {
    return form.name && form.email;
}
</script>
