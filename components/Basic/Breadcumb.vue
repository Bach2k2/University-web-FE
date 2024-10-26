<template>
    <ul class="breadcumb">
        <li v-for="link in links" class=""><NuxtLink :to="link?.link">{{link?.label}}</NuxtLink></li>
    </ul>
</template>
<script lang="ts" setup>
interface Link{
    label:string,
    link:string,
    icon:string
}
defineProps<{
    links:Link[];
}>()
</script>
<style lang="css" scoped>
ul.breadcrumb {
    padding: 10px 16px;
    list-style: none;
    background-color: #eee;
}

ul.breadcrumb li {
    display: inline;
    font-size: 18px;
}

ul.breadcrumb li+li:before {
    padding: 8px;
    color: black;
    content: "/\00a0";
}

ul.breadcrumb li a {
    color: #0275d8;
    text-decoration: none;
}

ul.breadcrumb li a:hover {
    color: #01447e;
    text-decoration: underline;
}
</style>