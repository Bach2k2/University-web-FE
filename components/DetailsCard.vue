<template>
    <el-card shadow="hover" class="p-4">
        <div class="mb-4">
            <h2 class="text-xl font-semibold mb-2">{{ title }}</h2>
            <hr class="border-t border-gray-300 mb-4" />
        </div>

        <div class="flex flex-col md:flex-row gap-4">
            <!-- Label Column (Slot for labels) -->
            <div class="w-full md:w-1/3 space-y-2 font-semibold text-gray-700">
                <slot name="labels"></slot>
            </div>

            <!-- Data Column (Slot for data values) -->
            <div class="w-full md:w-2/3 space-y-2 text-gray-900">
                <slot name="data"></slot>
            </div>
        </div>
    </el-card>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        default: 'Details'
    }
});
</script>

<style scoped>
/* Add custom styles here if needed */
</style>