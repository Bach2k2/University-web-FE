<template>
    <!-- <UserEditor/> -->
</template>

<script setup lang="ts">
const route = useRoute();
definePageMeta({
  layout: 'adminlayout'
});

onMounted(() => {
    const { id } = route.params;
    console.log('PERSON::', id);    
});

</script>
