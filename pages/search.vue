<template>
    <div class="flex flex-col mt-20 min-h-screen ml-5">
        <h2>Search</h2>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item>
                <a href="/search">Search</a>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="flex flex-col mt-4 lg:w-[960px] items-center justify-center self-center">
            <SearchBar class="self-center" v-model:query="searchQuery" @search="handleSearch"/>

            <div v-if="checkSearch" class="self-start w-full">
                <el-tabs v-model="activeName" class="demo-tabs w-full" @tab-click="handleClick" v-loading="searchLoading">
                    <el-tab-pane :label="$t('show_all')" name="show_all">
                        <div class="flex flex-col flex-wrap gap-4 self-start">
                            <p v-html="formattedResults"></p>
                            <el-card v-for="item in results" :key="item.title" shadow="always">
                                <div v-for="(n, index) in item.name">
                                    <NuxtLink :to="item.url[index]">
                                        <h3><span>{{ n }}</span></h3>
                                    </NuxtLink>
                                </div>
                                <p>{{ item.additional_info }}</p>
                            </el-card>
                            <el-pagination layout="prev, pager, next" :total="results.length" />
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('news')" name="news"></el-tab-pane>
                    <el-tab-pane :label="$t('events')" name="events">{{ $t('events') }}</el-tab-pane>
                    <el-tab-pane :label="$t('programs')" name="programs">{{ $t('programs') }}</el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus'
import SearchService from '@/services/search'
const {t} = useI18n();
const activeName = ref('show_all')
const results = ref<any[]>([])
const handleClick = (tab: TabsPaneContext, event: Event) => {
    // console.log(tab, event)
}
const searchLoading= ref(false)
const searchQuery = ref('')
const lastQuery=ref('')
const checkSearch= ref(false)
const formattedResults = computed(()=> {
            const length = results.value.length; // Ensure results is defined
            const query = searchQuery.value; // Adjust to your query variable
            return t('show_results', {
                length: `<strong><em>${length}</em></strong>`,
                query: `<strong><em>${query}</em></strong>`
            });
}) 
const handleSearch =()=>{
    searchLoading.value= true
    lastQuery.value = searchQuery.value
    const params = { query: searchQuery.value } ;
    checkSearch.value = true;
    SearchService.gets(params).then((response)=>{
        results.value= response;
    }).catch((err)=>{
        console.log(err)
    }).finally(()=>{
        searchLoading.value = false
    })
}

// const fetchResults = async (tabName: string) => {
//     // Simulate an API call for different tab results
//     // if (tabName === 'show_all') {
//     let data = [
//         {
//             name: [
//                 '{Object_1} {object_1_id}',
//                 '{Object_2} {object_2_id}'
//             ],
//             additional_info: 'additional_info for data 1',
//             url: [
//                 '/Object_1/object_1_id',
//                 '/Object_2/object_2_id'
//             ]
//         },
//         {
//             name: [
//                 '{Object_1} {object_1_id}',
//                 '{Object_2} {object_2_id}'
//             ],
//             additional_info: 'additional_info for data 1',
//             url: [
//                 '/Object_1/object_1_id',
//                 '/Object_2/object_2_id'
//             ]
//         },
//     ]
//     // } else if (tabName === 'news') {
//     //     data = [
//     //         { name: 'News Data 1', additional_info: 'Description for news data 1', url: '/hoome' },
//     //         { name: 'News Data 2', additional_info: 'Description for news data 2', url: '/hoome' },
//     //     ];
//     // } else if (tabName === 'events') {
//     //     data = [
//     //         { title: 'Event Data 1', description: 'Description for event data 1', url: '/hoome' },
//     //         { title: 'Event Data 2', description: 'Description for event data 2', url: '/hoome' },
//     //     ];
//     // } else if (tabName === 'programs') {
//     //     data = [
//     //         { title: 'Program Data 1', description: 'Description for program data 1', url: '/hoome' },
//     //         { title: 'Program Data 2', description: 'Description for program data 2', url: '/hoome' },
//     //     ];
//     // }

//     results.value = data;
// };

watch(activeName, (newTab) => {
    // Fetch new results when tab changes
    // fetchResults(newTab);
});

// Fetch initial data for "show_all"
// fetchResults(activeName.value);

</script>
