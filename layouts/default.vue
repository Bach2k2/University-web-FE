<template>
    <div class="main">
        <TopHeader />
        <slot />
    </div>
</template>
<script lang="ts" setup>  

</script>
<style scoped>
.main {
    background: url('https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2Nob29sfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60');
    background-attachment: fixed;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    position: relative;
    min-height: 100vh;
    width: 100vw;
}
</style>