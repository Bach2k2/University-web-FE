<template>
    <div class="flex box-border mx-auto w-full min-h-[700px] bg-[#f5f5f5] p-8">
        <div class="box-content w-full px-5">
            <div class="relative my-4 text-header">
                <div class="w-[84%] p-8 mx-auto">
                    <h2 class="text-3xl font-semibold">Tin tức mới nhất</h2>
                </div>
            </div>
            <div class="grid grid-cols-12 gap-4">
                <!-- Card starts -->
                <div v-for="option in news" :key="option.name"
                    class="col-span-4 sm:col-span-12 md:col-span-6 lg:col-span-4">
                    <div class="flex flex-col object-cover w-full mt-2 bg-white rounded-lg shadow-md overflow-hidden">
                        <picture>
                            <source :srcset="option.image">
                            <img :src="option.image" class="w-full h-[200px] object-cover">
                        </picture>
                        <div class="p-4">
                            <h3 class="text-2xl text-header font-semibold">{{ option.name }}</h3>
                            <div class="flex flex-row items-center py-1 text-gray-500">
                                <el-icon>
                                    <Calendar />
                                </el-icon>
                                <span class="text-base ml-2">{{ option.date_release }}</span>
                            </div>
                            <p class="text-base text-gray-700">{{ option.description }}</p>
                        </div>
                    </div>
                </div>
                <!-- Card ends -->
            </div>
            <div class="mt-6 flex justify-center">
                <button class="bg-header text-slate-100 px-6 py-4 rounded-lg">
                    <span class="font-normal text-xl">{{ $t('view_all_news') }}</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Calendar } from '@element-plus/icons-vue';
import { formatDate } from '@/utils/time'
const news = ref([
    {
        name: "Nhà phát minh tuổi teen về robot phân loại rác AI giành học bổng Live&Learn",
        image: 'https://picsum.photos/200/300?random=1',
        date_release: '19/10/2023',
        description: 'Là một học sinh giỏi, một nhà phát minh trẻ và một người yêu nhạc jazz – tài năng và sở thích của Đào Hiếu Phong cũng rộng lớn như sự tò mò của anh.'
    },
    {
        name: "Nghiên cứu cho thấy tác động hai chiều của AI đối với thông tin sức khỏe",
        image: 'https://picsum.photos/200/300?random=2',
        date_release: '20/10/2023',
        description: 'Nghiên cứu mới nhất đã chỉ ra rằng AI có thể vừa hỗ trợ vừa gây khó khăn cho việc tiếp cận thông tin sức khỏe.'
    },
    {
        name: "Live&Learn Việt Nam tôn vinh tác động thay đổi cuộc sống của học bổng",
        image: 'https://picsum.photos/200/300?random=3',
        date_release: '21/10/2023',
        description: 'Sự kiện vinh danh các học bổng đã mang lại cơ hội học tập cho nhiều sinh viên Việt Nam.'
    },
    {
        name: "Sinh viên Live&Learn phát triển hệ thống thông tin y tế ứng dụng AI",
        image: 'https://picsum.photos/200/300?random=4',
        date_release: '22/10/2023',
        description: 'Hệ thống thông tin y tế mới giúp nâng cao chất lượng dịch vụ chăm sóc sức khỏe cho cộng đồng.'
    },
    {
        name: "Chương trình đào tạo kỹ năng mềm tại Live&Learn",
        image: 'https://picsum.photos/200/300?random=5',
        date_release: '23/10/2023',
        description: 'Khóa học đào tạo kỹ năng mềm giúp sinh viên phát triển toàn diện hơn trong học tập và công việc.'
    },
    {
        name: "Hội thảo về tương lai của giáo dục trực tuyến",
        image: 'https://picsum.photos/200/300?random=6',
        date_release: '24/10/2023',
        description: 'Hội thảo này tập trung vào việc khám phá những xu hướng mới trong giáo dục trực tuyến và tiềm năng của nó trong tương lai.'
    }
])
</script>
<style scoped></style>