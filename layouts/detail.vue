<template>
    <div v-if="authenticated" class="flex flex-row min-h-screen">
        <TopbarNav />
        <!-- Main Content -->
        <main class="flex-1 p-4 bg-gray-50 mt-32">
            <slot />
        </main>
    </div>
    <div v-else>
        <NavBar />
        <AuthenticationLogin />
        <Footer />
    </div>
</template>

<script setup lang="ts">

import { useOauthStore } from '@/stores/oauth';
const oauthStore = useOauthStore()
const authenticated = computed(() => {
    const { tokenInfo } = oauthStore;
    if (!tokenInfo) return false;
    const { access_token } = tokenInfo;
    if (!access_token) return false;
    return access_token.length > 0;
})
onMounted(() => {
    // if (!authenticated.value) {
    //   navigateTo('/login')
    // }
})
</script>