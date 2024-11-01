<template>
    <StudentEditor :defaultData="{
      enrollment_year: '',
      user: {
        email: null,
        first_name: '',
        last_name: '',
      }
    }" />
  </template>
  
  <script setup lang=ts>
  definePageMeta({
    layout: 'adminlayout'
  });
  </script>
  