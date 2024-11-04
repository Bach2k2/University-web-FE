<template>
    <div class="flex h-screen items-center justify-center">
        <div class="min-w-screen min-h-screen bg-blue-100 flex items-center p-5 lg:p-20 overflow-hidden relative">
            <div
                class="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
                <div class="w-full md:w-1/2">
                    <div class="mb-10 lg:mb-20">
                        <MyUniversityLogo />
                    </div>
                    <div class="mb-10 md:mb-20 text-gray-600 font-light">
                        <h1 class="font-black uppercase text-3xl lg:text-5xl text-yellow-500 mb-10">You seem to be lost!
                        </h1>
                        <p>The page you're looking for isn't available.</p>
                        <p>Try searching again or use the Go Back button below.</p>
                    </div>
                    <div class="mb-20 md:mb-0">
                        <button @click="handleError"
                            class="text-lg font-light outline-none focus:outline-none transform transition-all hover:scale-110 text-yellow-500 hover:text-yellow-600"><i
                                class="mdi mdi-arrow-left mr-2"></i>Go Back</button>
                    </div>
                </div>
                <div class="w-full md:w-1/2 text-center">
                    <BigNottification />
                    <a href="https://www.freepik.com/vectors/business" target="_blank"
                        class="text-xs text-gray-300">Copyright @2024 - Live&Learn Team</a>
                </div>
            </div>
            <div
                class="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform">
            </div>
            <div
                class="w-96 h-full bg-yellow-200 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { NuxtError } from '#app'
import MyUniversityLogo from '@/assets/icons/dark_logo.svg'
import BigNottification from "@/assets/icons/404_not_found.svg"

const props = defineProps({
    error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<style lang="css" scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);
</style>
