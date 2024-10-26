<template>
    <div class="text-box">
      <label :for="id">{{ label }}</label>
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        v-model="inputValue"
        @input="$emit('update:modelValue', inputValue)"
        class="input"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Props
  const props = defineProps({
    modelValue: String,  // Two-way binding for the input
    label: String,       // Label for the text box
    id: String,          // ID for the input
    type: {
      type: String,
      default: 'text',   // Default input type is 'text'
    },
    placeholder: String  // Placeholder for the input
  })
  
  // Internal state
  const inputValue = ref(props.modelValue || '')
  </script>
  
  <style scoped>
  .text-box {
    display: flex;
    flex-direction: column;
  }
  
  .input {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-top: 4px;
  }
  </style>
  