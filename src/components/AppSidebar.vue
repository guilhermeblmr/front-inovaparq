<!-- src/components/Sidebar.vue -->
<template>
    <aside class="w-48 bg-blue-900 text-white h-screen flex flex-col items-center py-4 border-r border-black">
        <!-- Logo -->
        <img src="@/assets/logo.webp" alt="Logo Inovaparq" class="w-24 mb-6" />

        <!-- Nome da startup -->
        <div class="bg-blue-300 text-black w-40 text-center py-1 mb-2 rounded shadow">
            {Nome da startup}
        </div>

        <!-- Menu -->
        <router-link :to="{ name: 'startup-list' }">
            <button class="bg-blue-300 text-black w-40 text-center py-1 mb-2 rounded shadow hover:bg-blue-400">
                Startups
            </button>
        </router-link>
        <button class="bg-blue-300 text-black w-40 text-center py-1 mb-2 rounded shadow hover:bg-blue-400">
            Etapas do processo
        </button>
    </aside>
</template>
<script setup>
</script>