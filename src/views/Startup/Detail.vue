<template>
    <div>
        <h1 class="text-2xl font-bold mb-4">Detalhes da Startup</h1>
        <div class="bg-gray-200 p-6 rounded shadow">
            <div class="mb-4">
                <strong>Nome:</strong> {{ startup.name }}
            </div>
            <div class="mb-4">
                <strong>Descrição:</strong> {{ startup.description }}
            </div>
            <div class="mb-4">
                <strong>Incubadora:</strong> {{ startup.incubator }}
            </div>
            <div class="mb-4">
                <strong>Plano:</strong> {{ startup.plan }}
            </div>
        </div>
    </div>

    <div class="grid grid-cols-3 gap-4">
        <!-- Conteúdo -->
        <div class="bg-[#A30B89] text-white p-6 rounded shadow mt-6">
            <div class="text-center">
                <h2 class="text-xl font-bold">Detalhes do plano Grow</h2>
                <p class="mt-1 text-sm">R$ 590 MENSAL<br />+ 0,5% FAT</p>
                <p class="mt-1 text-sm">Jornada de incubação: Quinzenal (1h)</p>
                <p class="mt-1 text-sm">Mentoria: 1x por mês (1h)</p>
                <p class="mt-1 text-sm">Clube de benefícios</p>
                <p class="mt-1 text-sm">Eventos</p>
                <p class="mt-1 text-sm">Aceleração de investimento e fomento</p>
                <p class="mt-1 text-sm">Rodadas de pitch e hotseat com investidores</p>
                <p class="mt-1 text-sm">Imersão na startup com time</p>
                <p class="mt-1 text-sm">Vivências de extensão - Conexão Universidade</p>
            </div>
        </div>

        <div class="bg-[#2C9AA5] text-white p-6 rounded shadow mt-6">
            <div class="text-center">
                <h2 class="text-xl font-bold">Detalhes do plano Start</h2>
                <p class="mt-1 text-sm">R$ 250 MENSAL<br />+ 1,5% FAT</p>
                <p class="mt-1 text-sm">Jornada de incubação: Mensal (1h)</p>
                <p class="mt-1 text-sm">Mentoria: 1x por trimestre (1h)</p>
                <p class="mt-1 text-sm">Clube de benefícios</p>
                <p class="mt-1 text-sm">Eventos</p>
            </div>
        </div>
        <div class="bg-gray-200 p-6 rounded shadow mt-6 overflow-y-auto h-[336px]">
            <div class="">
                <h2 class="text-xl font-bold">Usuários da startup:</h2>
                <ul class="mt-4 space-y-2">
                    
                    <li v-for="user in users.users" :key="user.id" class="bg-white p-3 rounded shadow">
                        <div class="flex flex-col">
                            <span>{{ user.name }}</span>
                            <span class="text-sm text-gray-500">{{ user.email }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const startup = reactive({
    name: '',
    description: '',
    incubator: '',
    plan: '',
});

const users = ref({
    users: []
});

const fetchStartup = async () => {
    try {
        const res = await fetch(`http://127.0.0.1:8000/startups/${id}/`);
        if (!res.ok) throw new Error('Erro ao buscar a startup');
        const data = await res.json();
        startup.name = data.name;
        startup.description = data.description;
        startup.incubator = data.incubator;
        startup.plan = data.plan;
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

const fetchUsers = async () => {
    try {
        const res = await fetch(`http://127.0.0.1:8000/users/listUsers/${id}/`);
        if (!res.ok) throw new Error('Erro ao buscar usuários');
        const data = await res.json();
        users.value = data;

        console.log(users.value);

        console.log(users);
    } catch (error) {
        toast('Erro ao carregar usuários: ' + error.message, {
            type: toast.TYPE.ERROR,
            hideProgressBar: false,
            autoClose: 3000,
            position: toast.POSITION.BOTTOM_RIGHT,
            pauseOnHover: true,
        });
    }
}

onMounted(fetchStartup);
onMounted(fetchUsers);
</script>
