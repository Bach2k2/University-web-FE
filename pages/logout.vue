<template>
    <div>
        <p>Redirecting...</p>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import OAuthService from '@/services/oauth';
import { useOauthStore } from '@/stores/oauth';
const store = useOauthStore();

onMounted(() => {
    OAuthService.logout()
      .then(response => {
        console.log(response);
        store.$reset()
      })
      .catch(error => {
        console.log(error);
        store.$reset()
      })
      .finally(() => {
        navigateTo("/");
      })
});
</script>