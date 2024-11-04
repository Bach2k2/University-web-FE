<template>
    <div class="main">
        <div
            class="w-full absolute space-x-* bg-transparent flex flex-row align-middle py-2 px-8 justify-between z-10">
            <div class="flex flex-row">
            </div>
            <div class="flex flex-row items-center gap-2">
                <TopbarLanguageSelector/>
            </div>
        </div>
        <div class="">
            <slot />
        </div>
    </div>
</template>
<script lang="ts" setup>
</script>
<style scoped></style>