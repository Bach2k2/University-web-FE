<template>
    <div>
        <p>Redirecting...</p>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

onMounted(() => {
    const query = '​'; // You can set your default value as needed
    console.log('Redirecting...');

    if (route.path.includes('search/')) {
        navigateTo(`${query}`);
    } else {
        navigateTo(`search/${query}`);
    }
});
</script>