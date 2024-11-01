<template>
    <main class="pt-14 min-h-screen">
        <div class="flex flex-col  items-start font-sans h-screen w-full mt-4">
            <!-- <p>Home</p> -->
            <section class="mb-6 flex items-center justify-between">
                <div class="flex items-center justify-start"><span
                        class="inline-flex justify-center items-center w-12 h-12 rounded-full bg-white text-black dark:bg-slate-900/70 dark:text-white mr-3">
                        <svg viewBox="0 0 24 24" width="24" height="24" class="inline-block">
                            <path fill="currentColor"
                                d="M3,14L3.5,14.07L8.07,9.5C7.89,8.85 8.06,8.11 8.59,7.59C9.37,6.8 10.63,6.8 11.41,7.59C11.94,8.11 12.11,8.85 11.93,9.5L14.5,12.07L15,12C15.18,12 15.35,12 15.5,12.07L19.07,8.5C19,8.35 19,8.18 19,8A2,2 0 0,1 21,6A2,2 0 0,1 23,8A2,2 0 0,1 21,10C20.82,10 20.65,10 20.5,9.93L16.93,13.5C17,13.65 17,13.82 17,14A2,2 0 0,1 15,16A2,2 0 0,1 13,14L13.07,13.5L10.5,10.93C10.18,11 9.82,11 9.5,10.93L4.93,15.5L5,16A2,2 0 0,1 3,18A2,2 0 0,1 1,16A2,2 0 0,1 3,14Z">
                            </path>
                        </svg></span>
                    <h1 class="text-3xl leading-tight">Overview</h1>
                </div>
            </section>
            <section class="p-6 xl:max-w-6xl xl:mx-auto w-full">
                <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
                    <div v-for="(item, index) in items" :key="index" class="rounded-2xl flex-col dark:bg-slate-900/70 bg-white flex">
                        <div class="flex-1 p-6">
                          <div class="justify-between items-center flex mb-3">
                            <div class="flex items-center justify-center">
                              <div class="inline-flex items-center capitalize leading-none text-xs border rounded-full py-1 px-3"
                                   :class="item.badgeBgClass">
                                <span class="inline-flex justify-center items-center w-4 h-4 mr-1">
                                  <el-icon>
                                    <component :is="item.iconComponent" />
                                  </el-icon>
                                </span>
                                <span>{{ item.percentage }}%</span>
                              </div>
                            </div>
                            <div class="flex items-center justify-center">
                              <button class="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded"
                                      type="button">
                                <span class="inline-flex justify-center items-center w-6 h-6">
                                  <SettingIcon />
                                </span>
                              </button>
                            </div>
                          </div>
                          <div class="justify-between items-center flex">
                            <div class="flex items-center justify-center">
                              <div>
                                <h3 class="text-lg leading-tight" :class="item.textColorClass">{{ item.title }}</h3>
                                <h1 class="text-3xl leading-tight font-semibold">
                                  <div>{{ item.number }}</div>
                                </h1>
                              </div>
                            </div>
                            <div class="flex items-center justify-center">
                              <span class="inline-flex justify-center items-center h-16" :class="item.iconColorClass">
                                <component :is="item.mainIconComponent" class="w-[48px]" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>


                    <!-- <div v-for="(item, index) in items" class="rounded-2xl flex-col dark:bg-slate-900/70 bg-white flex">
                        <div class="flex-1 p-6">
                            <div class="justify-between items-center flex mb-3">
                                <div class="flex items-center justify-center">
                                    <div
                                        class="inline-flex items-center capitalize leading-none text-xs border rounded-full py-1 px-3 bg-emerald-500 border-emerald-500 text-white">
                                        <span class="inline-flex justify-center items-center w-4 h-4 mr-1">
                                            <el-icon>
                                                <ArrowUp />
                                            </el-icon></span>
                                        <span>12%</span>
                                    </div>
                                </div>
                                <div class="flex items-center justify-center">
                                    <button
                                        class="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded border-gray-100 dark:border-slate-800 ring-gray-200 dark:ring-gray-500 bg-gray-100 text-black dark:bg-slate-800 dark:text-white hover:bg-gray-200 hover:dark:bg-slate-700 p-1"
                                        type="button" icon-w="w-4" icon-h="h-4"><span
                                            class="inline-flex justify-center items-center w-6 h-6">
                                            <SettingIcon />
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div class="justify-between items-center flex">
                                <div class="flex items-center justify-center">
                                    <div>
                                        <h3 class="text-lg leading-tight text-gray-500 dark:text-slate-400">Clients</h3>
                                        <h1 class="text-3xl leading-tight font-semibold">
                                            <div>512</div>
                                        </h1>
                                    </div>
                                </div>
                                <div class="flex items-center justify-center">
                                    <span class="inline-flex justify-center items-center  h-16 text-emerald-500">
                                        <svg
                                            viewBox="0 0 24 24" width="48" height="48" class="inline-block">
                                            <path fill="currentColor"
                                                d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z">
                                            </path>
                                        </svg>
                                        <UserIcon class="w-[48px]" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    
                </div>
            </section>
        </div>
    </main>

</template>
<script setup>
definePageMeta({
    layout: 'adminlayout'
})
import UserIcon from '@/assets/icons/users.svg'
import SettingIcon from '@/assets/icons/settings.svg'
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'

const length = 3;
const items = ref([
    {
        percentage: 12,
        title: 'Clients',
        number: 512,
        badgeBgClass: 'bg-emerald-500 border-emerald-500 text-white',
        iconComponent: ArrowUp,
        mainIconComponent: UserIcon,
        iconColorClass: 'text-emerald-500',
        textColorClass: 'text-gray-500 dark:text-slate-400'
    },
    {
        percentage: 12,
        title: 'Clients',
        number: 512,
        badgeBgClass: 'bg-emerald-500 border-emerald-500 text-white',
        iconComponent: ArrowUp,
        mainIconComponent: UserIcon,
        iconColorClass: 'text-emerald-500',
        textColorClass: 'text-gray-500 dark:text-slate-400'
    },
    {
        percentage: 12,
        title: 'Clients',
        number: 512,
        badgeBgClass: 'bg-emerald-500 border-emerald-500 text-white',
        iconComponent: ArrowUp,
        mainIconComponent: UserIcon,
        iconColorClass: 'text-emerald-500',
        textColorClass: 'text-gray-500 dark:text-slate-400'
    },
    ])
</script>
