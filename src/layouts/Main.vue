<template>
    <div class="flex">
        <AppSidebar />

        <main class="flex-1 p-6">
            <router-view />
        </main>
    </div>
</template>

<script setup>
import AppSidebar from '@/components/AppSidebar.vue';

</script>