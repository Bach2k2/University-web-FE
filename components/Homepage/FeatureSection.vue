<template>
    <div class="block box-border mx-auto w-full min-h-[615px] bg-[#f5f5f5] p-8">
        <div class="box-content w-full">
            <div class="relative my-4 text-[#000054]">
                <div class="w-[84%] p-8 mx-auto">
                    <h2 class="text-3xl font-semibold">Tìm hiểu về các chương trình học tại Live&Learn</h2>
                    <div class="description text-xl font-medium">
                        Live&Learn mang đến cho bạn nhiều lựa chọn đa dạng về chương trình liên thông, cử nhân và thạc sĩ tùy theo khả năng, sở thích cũng như định hướng tương lai của bản thân. Hãy chọn cho mình con đường phù hợp nhất!
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-12 gap-4">
                <!-- Card starts -->
                <div v-for="option in options" :key="option.name" class="col-span-4 sm:col-span-12 md:col-span-4 gap-4">
                    <div class="flex flex-col object-cover w-full mt-2 relative">
                        <picture>
                            <source :srcset="option.image">
                            <img :src="option.image" class="w-full h-[250px] md:h-[300px] object-cover rounded-lg shadow-lg">
                        </picture>
                        <div class="-mt-8 mx-4 border border-solid border-white bg-white overflow-hidden md:w-auto min-h-32 px-4 py-6 rounded-lg shadow-md">
                            <h4 class="text-xl text-header leading-6">{{ option.name }}</h4>
                            <ul>
                                <li v-for="sub_option in option.features" :key="sub_option.name" class="flex items-center my-2">
                                    <el-icon>
                                        <ArrowRight color="red"/>
                                    </el-icon>
                                    <NuxtLink :to="sub_option.link" class="text-base text-black ml-2">
                                        {{ sub_option.name }}
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- Card ends -->
            </div>
        </div>
    </div>
</template>
<script setup>
import { ArrowRight } from '@element-plus/icons-vue';
const options = ref([
    {
        name: "Tìm một chương trình hoặc khóa học",
        image: 'https://picsum.photos/seed/picsum/200/300',
        features: [
            {
                name: "Duyệt theo lĩnh vực quan tâm",
                link: "/major"
            },
            {
                name: "Chương trình đại học",
                link: "/feature1"
            },
            {
                name: "Chương trình sau đại học",
                link: "/feature2"
            }
        ]
    },
    {
        name: "Thông tin cho phụ huynh",
        image: 'https://picsum.photos/200/300?grayscale',
        features: [
            {
                name: "Trang cho phụ huynh",
                link: "/major"
            },
            {
                name: "Chuẩn bị cho lực lượng lao động",
                link: "/feature1"
            },
            {
                name: "Cuộc sống trong khuôn viên trương",
                link: "/feature2"
            },
            {
                name: "Học phí",
                link: "/feature2"
            },
            {
                name: "Học bổng",
                link: "/feature2"
            }
        ]
    },
    {
        name: "Thông tin cho phụ huynh",
        image: 'https://picsum.photos/id/870/200/300?grayscale&blur=2',
        features: [
            {
                name: "Trang cho phụ huynh",
                link: "/major"
            },
            {
                name: "Chuẩn bị cho lực lượng lao động",
                link: "/feature1"
            },
            {
                name: "Cuộc sống trong khuôn viên trương",
                link: "/feature2"
            },
            {
                name: "Học phí",
                link: "/feature2"
            },
            {
                name: "Học bổng",
                link: "/feature2"
            }
        ]
    }
])
</script>
<style scoped>
.columnlinklist {
    @apply p-0 block;
    /* Applies Tailwind classes */

    &__wrapper {

        /* Nesting the wrapper class */
        &__content {
            /* Nesting the content class inside the wrapper */
            @apply p-0 flex flex-col;

            /* Correct Tailwind utility classes */
            img {
                @apply h-[200px];
            }
        }
    }
}

.col-md-12 {
    @apply flex flex-wrap float-left relative md:w-full items-center
}

.columnlinklist__content {
    img {
        @apply h-[200px] object-cover w-full
    }
}

img {
    @apply align-middle
}
</style>