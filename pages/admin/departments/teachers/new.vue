<template>
    <TeacherEditor :defaultData="{
      user_id: null,
      teacher_type_id: null,
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

<script setup lang="ts">

definePageMeta({
  layout: 'adminlayout'
});
</script>
