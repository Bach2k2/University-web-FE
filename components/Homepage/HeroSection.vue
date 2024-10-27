<template>
    <!-- ====== Hero Section Start -->
    <div class="flex relative z-10 mt-16 w-full">
        <el-carousel indicator-position="outside" autoplay class="h-full w-full">
            <el-carousel-item v-for="item in slides" :key="item.title">
                <div class="image-container flex justify-center items-center h-full w-full text-center bg-cover bg-center"
                    :style="{ backgroundImage: `url(${item.image})` }">
                    <div class="bg-opacity-50 p-8 rounded absolute bottom-0 texts">
                        <h2 class="text-white text-3xl font-bold mb-2">{{ item.title }}</h2>
                        <p class="text-white text-lg">{{ item.description }}</p>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
    <div class="flex flex-col items-center p-8">
        <h2 class="text-2xl font-bold mb-8">Được tìm kiếm nhiều nhất</h2>

        <!-- <div class="w-full md:w-1/2 lg:w-1/3 flex items-center gap-4">
            <el-input v-model="searchQuery" placeholder="Bạn đang tìm gì?" size="large" clearable>
            </el-input>
            <el-button type="primary" :icon="Search" class="py-2">Search</el-button>
        </div> -->
        <SearchBar />

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
const searchQuery = ref('');
const searchOptions = ref([
    'Học bổng',
    'Cơ hội trải nghiệm và việc làm',
    'Nhập học RMIT'
]);

const slides = ref(
    [
        { title: 'Khám phá ngay chuỗi hội thảo tại 10 tỉnh thành. ', description: 'Chuỗi hội thảo: Hành trình ra thế giới từ Đại học RMIT ', href: 'javascript:void(0)', image: 'https://picsum.photos/600/600?random=1' },
        { title: 'Khám phá ngay chuỗi hội thảo RMIT tại 10 tỉnh thành. ', description: 'Chuỗi hội thảo: Hành trình ra thế giới từ Đại học RMIT ', href: 'javascript:void(0)', image: 'https://picsum.photos/600/600?random=2' },
        { title: 'Khám phá ngay chuỗi hội thảo RMIT tại 10 tỉnh thành. ', description: 'Chuỗi hội thảo: Hành trình ra thế giới từ Đại học RMIT ', href: 'javascript:void(0)', image: 'https://picsum.photos/600/600?random=3' },
        { title: 'Tìm hiểu 18 chương trình cử nhân và khám phá lộ trình học tập toàn cầu. ', description: 'Chuỗi hội thảo: Hành trình ra thế giới từ Đại học RMIT ', href: 'javascript:void(0)', image: 'https://picsum.photos/600/600?random=4' },
        { title: 'Tuần lễ Định hướng - Học kỳ 3, 2024. ', description: 'Chuỗi hội thảo: Hành trình ra thế giới từ Đại học RMIT ', href: 'javascript:void(0)', image: 'https://picsum.photos/600/600?random=5' },
    ]
)

</script>
<style style="css" scoped>

div.el-carousel__container {
    height: 600px;
}
.texts{
    background-color: rgba(16, 16, 16, 0.75);
    position: relative;
    bottom: 0;
    width: 60%;
    text-align: left;
    margin: 0 auto;
    padding: 32px;
    line-height: 24px;
}
</style>