<template>
  <StudentEditor :defaultData="{
    user_id: null,
    enrollment_year: '',
    user: {
      email: null,
      first_name: '',
      last_name: '',
      is_active: '',
      user_detail: {
        date_of_birth: '',
        degree: '',
        academic_title: '',
        biography: ''
      }
    }
  }" />
</template>

<script setup lang=ts>
definePageMeta({
  layout: 'adminlayout'
});
</script>
