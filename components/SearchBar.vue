<template>
    <div class="w-full flex items-center gap-4">
        <div class="flex px-4 py-6 justify-center items-center bg-gray-50 w-full">
            <el-input v-model="searchQuery" placeholder="Bạn đang tìm gì?" size="large" clearable>
            </el-input>
            <div>
                <el-button type="primary" :icon="Search" class="custom-padding" @click="handleSearch">Search</el-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
const router = useRouter();
const searchQuery = ref('');
const handleSearch = () => {
    router.push('/search');
}
</script>
<style lang="css" scoped>
.custom-padding {
    @apply bg-primary py-5 px-4 ml-2 hover:bg-secondary
  }
</style>
