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
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { ref } from 'vue'

</script>