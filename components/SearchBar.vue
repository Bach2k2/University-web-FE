<template>
    <div class="w-full flex items-center gap-4">
        <div class="flex px-4 py-6 justify-center items-center bg-gray-50 w-full">
            <el-input v-model="searchQuery" :placeholder="$t('search_query')" size="large" clearable @keydown.enter="handleSearch"/>
            <div>
                <el-button type="primary" :icon="Search" class="custom-padding" @click="handleSearch">Search</el-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
const props = defineProps({
    query:{
        type:String,
        default:''
    }
})
const emit= defineEmits(['update:query','search'])
const route = useRoute();
const router = useRouter();
const searchQuery = ref(props.query);
const handleSearch = () => {
    navigateTo(`/search/${searchQuery.value}`);
    emit('search', searchQuery.value)
}

// Watch for changes in the query prop and update searchQuery accordingly
// watch(() => props.query, (newQuery) => {
//     searchQuery.value = newQuery;
// });
watch(searchQuery, (newQuery) => {
    emit('update:query', newQuery);
});
</script>
<style lang="css" scoped>
.custom-padding {
    @apply bg-primary py-5 px-4 ml-2 hover:bg-secondary
  }
</style>
