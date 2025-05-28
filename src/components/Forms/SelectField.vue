<!-- src/components/SelectField.vue -->
<template>
    <div class="flex flex-col gap-1">
        <label :for="name" class="text-sm font-medium text-gray-700">{{ label }}</label>
        <select :id="name" :name="name" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            class="border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500">
            <option value="" disabled>Selecione...</option>
            <option v-for="option in options" :key="option" :value="option">
                {{ option }}
            </option>
        </select>
    </div>
</template>

<script setup>
defineProps({
    label: String,
    name: String,
    options: Array,
    modelValue: String,
})
defineEmits(['update:modelValue'])
</script>
