<template>
    <!-- ====== Navbar Section Start -->
    <header class="absolute left-0 top-0 z-50 w-full bg-[#090E34] mb-20">
        <div class="container">
            <div class="relative -mx-4 flex items-center justify-between">
                <div class="max-w-full px-4 w-60">
                    <a href="javascript:void(0)" class="block w-full py-5 lg:py-3 ml-5">
                        <img src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-white.svg" alt="logo"
                            class="w-full" />
                    </a>
                </div>
                <div class="flex w-full items-center justify-between px-4">
                    <div>
                        <button @click="toggleNavbar" ref="dropdownButtonRef" id="navbarToggler"
                            class="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden">
                            <span class="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                            <span class="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                            <span class="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                        </button>
                        <nav :class="{ hidden: !open }" id="navbarCollapse"
                            class="absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white dark:bg-dark-2 py-5 px-6 shadow lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:shadow-none xl:ml-10 lg:dark:bg-transparent text-black">
                            <ul class="block lg:flex">
                                <template v-for="(item, index) in navLinkItems" :key="index">
                                    <li>
                                        <a v-if="item.href" :href="item.href"
                                            class="mr-1 flex rounded-full border border-transparent py-[5px] px-[18px] text-base font-medium text-dark dark:text-white hover:border-primary hover:text-primary lg:inline-flex lg:text-white lg:hover:border-white lg:hover:text-white">
                                            {{ item.text }}
                                        </a>
                                    </li>
                                </template>
                            </ul>
                        </nav>
                    </div>

                    <div class="hidden justify-end pr-16 sm:flex lg:pr-0">
                        <div class="flex items-center justify-end">
                            <a href="javascript:void(0)" class="ml-5 text-white hover:opacity-70">
                                <svg width="10" height="18" viewBox="0 0 10 18" class="fill-current">
                                    <path
                                        d="M9.00007 6.82105H7.50006H6.96434V6.27097V4.56571V4.01562H7.50006H8.62507C8.91971 4.01562 9.16078 3.79559 9.16078 3.46554V0.550085C9.16078 0.247538 8.9465 0 8.62507 0H6.66969C4.55361 0 3.08038 1.54024 3.08038 3.82309V6.21596V6.76605H2.54466H0.72322C0.348217 6.76605 0 7.06859 0 7.50866V9.48897C0 9.87402 0.294645 10.2316 0.72322 10.2316H2.49109H3.02681V10.7817V16.31C3.02681 16.6951 3.32145 17.0526 3.75003 17.0526H6.26791C6.42862 17.0526 6.56255 16.9701 6.66969 16.8601C6.77684 16.7501 6.8572 16.5576 6.8572 16.3925V10.8092V10.2591H7.4197H8.62507C8.97328 10.2591 9.24114 10.0391 9.29471 9.709V9.6815V9.65399L9.66972 7.7562C9.6965 7.56367 9.66972 7.34363 9.509 7.1236C9.45543 6.98608 9.21436 6.84856 9.00007 6.82105Z" />
                                </svg>
                            </a>
                            <a href="javascript:void(0)" class="ml-5 text-white hover:opacity-70">
                                <svg width="19" height="15" viewBox="0 0 19 15" class="fill-current">
                                    <path
                                        d="M16.1616 3.1786L17.2294 1.93274C17.5385 1.59532 17.6228 1.33577 17.6509 1.20599C16.8079 1.67319 16.0211 1.82892 15.5153 1.82892H15.3186L15.2062 1.7251C14.5318 1.18004 13.6888 0.894531 12.7897 0.894531C10.8227 0.894531 9.2772 2.39994 9.2772 4.13894C9.2772 4.24276 9.2772 4.3985 9.3053 4.50232L9.3896 5.02142L8.79951 4.99547C5.20275 4.89165 2.25229 2.03656 1.7746 1.54341C0.987807 2.84118 1.4374 4.08703 1.9151 4.86569L2.87048 6.31919L1.3531 5.54053C1.3812 6.63065 1.8308 7.48718 2.70189 8.1101L3.46058 8.62921L2.70189 8.91472C3.17958 10.2384 4.24737 10.7835 5.03416 10.9911L6.07384 11.2507L5.09035 11.8736C3.51678 12.9118 1.5498 12.834 0.678711 12.7561C2.44899 13.8981 4.55646 14.1577 6.01764 14.1577C7.11353 14.1577 7.92842 14.0539 8.12512 13.976C15.993 12.263 16.3583 5.77413 16.3583 4.47636V4.29468L16.5269 4.19085C17.4823 3.36028 17.8757 2.91904 18.1005 2.65949C18.0162 2.68545 17.9038 2.73736 17.7914 2.76331L16.1616 3.1786Z" />
                                </svg>
                            </a>
                            <a href="javascript:void(0)" class="ml-5 text-white hover:opacity-70">
                                <svg width="18" height="18" viewBox="0 0 18 18" class="fill-current">
                                    <path
                                        d="M8.71681 12.4993C10.4917 12.4993 11.9306 11.091 11.9306 9.35366C11.9306 7.61637 10.4917 6.20801 8.71681 6.20801C6.9419 6.20801 5.50305 7.61637 5.50305 9.35366C5.50305 11.091 6.9419 12.4993 8.71681 12.4993Z" />
                                    <path
                                        d="M12.2074 0.947266H5.17044C2.37225 0.947266 0.100464 3.17092 0.100464 5.90981V12.7435C0.100464 15.5366 2.37225 17.7603 5.17044 17.7603H12.152C15.0056 17.7603 17.2774 15.5366 17.2774 12.7977V5.90981C17.2774 3.17092 15.0056 0.947266 12.2074 0.947266ZM8.71665 13.4757C6.36174 13.4757 4.50552 11.6045 4.50552 9.35377C4.50552 7.10299 6.38945 5.23187 8.71665 5.23187C11.0161 5.23187 12.9001 7.10299 12.9001 9.35377C12.9001 11.6045 11.0438 13.4757 8.71665 13.4757ZM14.5346 5.61152C14.2576 5.90981 13.842 6.07252 13.371 6.07252C12.9555 6.07252 12.5399 5.90981 12.2074 5.61152C11.9027 5.31322 11.7365 4.93357 11.7365 4.47257C11.7365 4.01157 11.9027 3.65904 12.2074 3.33363C12.5122 3.00821 12.9001 2.84551 13.371 2.84551C13.7866 2.84551 14.2299 3.00821 14.5346 3.30651C14.8117 3.65904 15.0056 4.06581 15.0056 4.49969C14.9779 4.93357 14.8117 5.31322 14.5346 5.61152Z" />
                                    <path
                                        d="M13.399 3.82178C13.0388 3.82178 12.7341 4.12007 12.7341 4.4726C12.7341 4.82513 13.0388 5.12343 13.399 5.12343C13.7591 5.12343 14.0639 4.82513 14.0639 4.4726C14.0639 4.12007 13.7868 3.82178 13.399 3.82178Z" />
                                </svg>
                            </a>
                            <a href="javascript:void(0)" class="ml-5 text-white hover:opacity-70">
                                <svg width="18" height="18" viewBox="0 0 18 18" class="fill-current">
                                    <path
                                        d="M16.4813 0.947266H1.54769C0.841943 0.947266 0.277344 1.49735 0.277344 2.18496V16.7622C0.277344 17.4223 0.841943 17.9999 1.54769 17.9999H16.4249C17.1306 17.9999 17.6952 17.4498 17.6952 16.7622V2.15745C17.7517 1.49735 17.1871 0.947266 16.4813 0.947266ZM5.44342 15.442H2.8745V7.32825H5.44342V15.442ZM4.14485 6.20058C3.29795 6.20058 2.64866 5.54047 2.64866 4.74285C2.64866 3.94523 3.32618 3.28513 4.14485 3.28513C4.96351 3.28513 5.64103 3.94523 5.64103 4.74285C5.64103 5.54047 5.01997 6.20058 4.14485 6.20058ZM15.1828 15.442H12.6138V11.5089C12.6138 10.5738 12.5856 9.33606 11.2588 9.33606C9.90375 9.33606 9.70614 10.3812 9.70614 11.4264V15.442H7.13722V7.32825H9.64968V8.45592H9.67791C10.0449 7.79582 10.8636 7.13572 12.1339 7.13572C14.7593 7.13572 15.2392 8.78598 15.2392 11.0413V15.442H15.1828Z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- ====== Navbar Section End -->
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
// import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel' // ko su dung duoc

import SearchBar from '@/components/SearchBar.vue';

const open = ref(false)
const dropdownButtonRef = ref<HTMLButtonElement | null>(null)
import { useOauthStore } from '@/stores/oauth';
const oauthStore = useOauthStore()
const authenticated = computed(() => {
    const { tokenInfo } = oauthStore;
    if (!tokenInfo) return false;
    const { access_token } = tokenInfo;
    if (!access_token) return false;
    return access_token.length > 0;
})
const toggleNavbar = () => {
    open.value = !open.value
}
const navLinkItems = ref([
    { text: 'Home', href: '/' },
    { text: 'About Us', href: '/' },
    { text: 'Services', href: '/' },
    { text: 'Staff', href: '/admin' },
    { text: 'Login', href: '/login' }
])



// Custom composition function to handle click outside
const handleClickOutside = (event: MouseEvent) => {
    if (dropdownButtonRef.value && !dropdownButtonRef.value.contains(event.target as Node)) {
        open.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})


</script>

<style scoped>
.el-input {
    border-radius: 9999px;
}

.el-button {
    padding: 8px 20px;
}

.el-input__wrapper {
    border-radius: 9999px;
}

.el-carousel__item h3 {
    display: flex;
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>