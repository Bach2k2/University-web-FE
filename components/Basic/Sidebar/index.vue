<template>
    <aside id="aside" class="lg:py-2 lg:pl-2 w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden">
        <div class="aside lg:rounded-2xl flex-1 flex flex-col overflow-hidden bg-slate-900">
            <div class="aside-brand flex flex-row h-14 items-center justify-between bg-slate-900">
                <div class="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0">
                    <b class="font-white">One</b>
                </div>
                <el-button class="hidden lg:inline-block xl:hidden p-3" :icon="Close"></el-button>
            </div>

            <div class="flex-1 overflow-y-auto overflow-x-hidden aside-scrollbars">
                <BasicSidebarItem v-for="(item, index) in menu" :item="item" :key="index" />
            </div>
        </div>
        <div>
        </div>
    </aside>

</template>
<script lang="ts" setup>
import { Close, ArrowRightBold } from '@element-plus/icons-vue'

const menu = [
    {
        label: 'Dashboard',
        path: '/',
        icon: Close
    },
    {
        label: 'Dashboard2',
        path: '/',
        icon: Close
    },
    {
        label: 'Dashboard3',
        path: '/',
        icon: Close
    },
    {
        label: 'Dashboard4',
        path: '/',
        icon: Close
    }
]

// const asideLgCloseClick = (event) => {
//   emit('aside-lg-close-click', event)
// }
</script>