<template>
    <!-- ====== Navbar Section Start -->
    <header class="absolute left-0 top-0 z-50 w-full  bg-[#090E34]">
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
    <!-- ====== Hero Section Start -->
    <div class="relative z-10  pt-[120px] pb-[120px] md:pt-[150px] lg:pt-[180px] lg:pb-[150px]">
        <div class="absolute top-0 right-0 z-[-1] h-full w-1/2 bg-primary"></div>
        <div class="container mx-auto">

        </div>
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2">

        </div>
        <el-carousel indicator-position="outside" autoplay>
            <el-carousel-item v-for="item in slides" :key="item.title">
                <div class="flex justify-center items-center h-96 w-full text-center bg-cover bg-center"
                    :style="{ backgroundImage: `url(${item.image})` }">
                    <div class="bg-opacity-50 p-8 rounded">
                        <h2 class="text-white text-3xl font-bold mb-2">{{ item.title }}</h2>
                        <p class="text-white text-lg">{{ item.description }}</p>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
    <div class="flex flex-col items-center p-8">
        <h2 class="text-2xl font-bold mb-8">Được tìm kiếm nhiều nhất</h2>

        <div class="w-full md:w-1/2 lg:w-1/3 flex items-center gap-4">
            <el-input v-model="searchQuery" placeholder="Bạn đang tìm gì?" size="large" clearable>
            </el-input>
            <el-button type="primary" :icon="Search" class="py-2">Search</el-button>
        </div>

        <div class="flex flex-wrap justify-center gap-4 mt-6">
            <div class="rounded-full border border-blue-900 px-2" v-for="option in searchOptions" :key="option">
                <el-button class="text-blue-900" type="text">
                    {{ option }}
                </el-button>
            </div>

        </div>
    </div>

    <!-- ====== Hero Section End -->

</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
// import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel' // ko su dung duoc
import { Search } from '@element-plus/icons-vue';


const open = ref(false)
const dropdownButtonRef = ref<HTMLButtonElement | null>(null)

const toggleNavbar = () => {
    open.value = !open.value
}
const navLinkItems = ref([
    { text: 'Home', href: 'javascript:void(0)' },
    { text: 'About Us', href: 'javascript:void(0)' },
    { text: 'Services', href: 'javascript:void(0)' },
    { text: 'Blog', href: 'javascript:void(0)' },
    { text: 'Contact', href: 'javascript:void(0)' }
])

const slides = ref(
    [
        { title: 'Khám phá ngay chuỗi hội thảo RMIT tại 10 tỉnh thành. ', description: 'Chuỗi hội thảo: Hành trình ra thế giới từ Đại học RMIT ', href: 'javascript:void(0)', image: 'data:image/jpeg;base64,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' },
        { title: 'Khám phá ngay chuỗi hội thảo RMIT tại 10 tỉnh thành. ', description: 'Chuỗi hội thảo: Hành trình ra thế giới từ Đại học RMIT ', href: 'javascript:void(0)', image: '~/assets/images/carousel/carousel-1.jpg' },
        { title: 'Khám phá ngay chuỗi hội thảo RMIT tại 10 tỉnh thành. ', description: 'Chuỗi hội thảo: Hành trình ra thế giới từ Đại học RMIT ', href: 'javascript:void(0)', image: '~/assets/images/carousel/carousel-1.jpg' },
        { title: 'Khám phá ngay chuỗi hội thảo RMIT tại 10 tỉnh thành. ', description: 'Chuỗi hội thảo: Hành trình ra thế giới từ Đại học RMIT ', href: 'javascript:void(0)', image: '~/assets/images/carousel/carousel-1.jpg' },
        { title: 'Khám phá ngay chuỗi hội thảo RMIT tại 10 tỉnh thành. ', description: 'Chuỗi hội thảo: Hành trình ra thế giới từ Đại học RMIT ', href: 'javascript:void(0)', image: '~/assets/images/carousel/carousel-1.jpg' },
    ]
)

const searchQuery = ref('');
const searchOptions = ref([
    'Học bổng',
    'Cơ hội trải nghiệm và việc làm',
    'Nhập học RMIT'
]);

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
    padding:8px 20px;
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