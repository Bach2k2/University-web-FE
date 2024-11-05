<template>
    <div class="box-border mx-auto w-full min-h-[700px] bg-[#f5f5f5] p-8">
        <div class="flex flex-col box-content w-full px-5">
            <div class="flex-none relative my-4 text-header">
                <div class="w-full md:w-[84%] p-8">
                    <h2 class="text-3xl font-semibold">{{ $t('upcoming_events') }}</h2>
                </div>
            </div>
            
            <!-- Responsive grid for news items -->
            <div class="flex-auto h-auto">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <!-- News card starts -->
                    <div v-for="option in events" :key="option.name" class="flex flex-col object-cover w-full p-4 bg-white rounded-lg shadow-md">
                        <picture>
                            <source :srcset="option.image">
                            <img :src="option.image" class="w-full h-[150px] object-cover rounded-md">
                        </picture>
                        <h3 class="text-2xl text-header mt-2">{{ option.name }}</h3>
                        <div class="flex flex-row items-center justify-start py-1 font-normal">
                            <el-icon>
                                <Calendar />
                            </el-icon>
                            <span class="text-xl ml-2">{{ option.date_release }}</span>
                        </div>
                        <p class="text-xl">{{ option.description }}</p>
                    </div>
                    <!-- News card ends -->
                </div>
            </div>
    
            <!-- Button container -->
            <div class="my-6 flex justify-center lg:mt-12 sm:mt-6 w-full lg:w-auto mt-4">
                <button class="bg-header text-slate-100 px-6 py-4 rounded-lg w-full sm:w-auto">
                    <span class="font-normal text-xl">{{ $t('view_all_events') }}</span>
                </button>
            </div>
        </div>
    </div>
    
</template>
<script setup>
import { Calendar } from '@element-plus/icons-vue';
const events = ref([
    {
        name: "Lễ hội âm nhạc mùa hè 2023",
        image: 'https://picsum.photos/200/300?random=1',
        date_release: '15/06/2023',
        description: 'Một lễ hội âm nhạc hoành tráng với sự tham gia của nhiều nghệ sĩ nổi tiếng trong nước và quốc tế. Hãy cùng hòa mình vào không khí sôi động và thưởng thức những bản nhạc tuyệt vời!'
    },
    {
        name: "Cuộc thi tài năng trẻ Live&Learn",
        image: 'https://picsum.photos/200/300?random=2',
        date_release: '10/07/2023',
        description: 'Cuộc thi dành cho các bạn trẻ đam mê ca hát, nhảy múa và nghệ thuật biểu diễn. Hãy đến để khám phá tài năng của các bạn trẻ và cổ vũ cho những tiết mục đặc sắc!'
    },
    {
        name: "Đêm nhạc Jazz tại trung tâm thành phố",
        image: 'https://picsum.photos/200/300?random=3',
        date_release: '25/08/2023',
        description: 'Đêm nhạc Jazz với sự góp mặt của các nghệ sĩ tài năng, hứa hẹn mang đến những giai điệu du dương và không khí thư giãn tuyệt vời cho khán giả.'
    },
    {
        name: "Hội chợ ẩm thực quốc tế",
        image: 'https://picsum.photos/200/300?random=4',
        date_release: '05/09/2023',
        description: 'Tham gia hội chợ ẩm thực với nhiều món ăn độc đáo từ các nền văn hóa khác nhau. Đây là cơ hội tuyệt vời để khám phá ẩm thực thế giới và trải nghiệm những hương vị mới lạ.'
    },
    {
        name: "Ngày hội thể thao Live&Learn",
        image: 'https://picsum.photos/200/300?random=5',
        date_release: '20/10/2023',
        description: 'Ngày hội thể thao với nhiều hoạt động thú vị như chạy bộ, bóng đá, và các trò chơi tập thể. Hãy cùng nhau vận động và tạo nên những kỷ niệm đẹp!'
    },
    {
        name: "Chương trình biểu diễn nghệ thuật đường phố",
        image: 'https://picsum.photos/200/300?random=6',
        date_release: '30/11/2023',
        description: 'Chương trình biểu diễn nghệ thuật đường phố với sự tham gia của nhiều nghệ sĩ trẻ tài năng. Đến để thưởng thức những màn trình diễn đặc sắc và sáng tạo!'
    }
]);
</script>
<style scoped></style>