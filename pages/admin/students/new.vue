<template>
  <StudentEditor :defaultData="{
    user_id: null,
    enrollment_year: null,
  }" />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'adminlayout'
});
</script>
