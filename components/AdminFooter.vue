<template>
    <footer class="bg-primary p-3 justify-center rounded-md">
        <div class="flex flex-row justify-between items-center">
            <div class="flex items-center justify-center mb-6 md:mb-0">
                <div class="text-center md:text-left text-white"><b>© 2024, <a href="#" target="_blank">Live&Learn Team</a>.</b>
                </div>
            </div>
            <div class="justify-center">
                <div class="md:py-2">
                    <NuxtLink to="/">
                        <MyUniversityLogo class="w-48"/>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </footer>
</template>
<script lang="ts" setup>
import MyUniversityLogo from '@/assets/icons/light_logo.svg'
</script>
