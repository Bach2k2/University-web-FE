<template>
    <div
        class="lg:py-2 lg:pl-2 w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden -left-60 lg:left-0 lg:hidden xl:flex">
        <div class="aside lg:rounded-2xl flex-1 flex flex-col overflow-hidden ">
            <div class="flex-1 overflow-y-auto overflow-x-hidden aside-scrollbars dark:aside-scrollbars-[slate]">
                <el-menu class="el-menu-sidebar h-screen" background-color="#C33C54" :collapse="!isMobile && isCollapse"
                    @open="handleOpen" @close="handleClose" :router="true" :default-active="$route.fullPath">
                    <div v-if="!isCollapse" class="text-white flex flex-col items-center pt-2 sidebar-header">
                        <slot name="header" />
                        <el-divider border-style="solid" />
                        <div v-if="!isCollapse && !isMobile" class="hidden sm:block absolute self-end px-3 py-2"
                            @click="collapseSideBar">
                            <el-icon color="white" style="cursor: pointer">
                                <DArrowLeft />
                            </el-icon>
                        </div>
                    </div>
                    <div v-if="isCollapse && !isMobile" class="flex flex-col items-center px-3 py-2"
                        @click="expandSideBar">
                        <el-icon color="white" style="cursor: pointer">
                            <DArrowRight />
                        </el-icon>
                    </div>
                    <slot />
                </el-menu>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { DArrowLeft, DArrowRight } from "@element-plus/icons-vue";
const props = defineProps({
    isMobile: {
        type: Boolean,
        default: false,
    },
});
const isCollapse = ref(props.isMobile);

const collapseSideBar = () => {
    isCollapse.value = true;
};
const expandSideBar = () => {
    isCollapse.value = false;
};

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};
</script>

<style>
.sidebar-container {
    background: linear-gradient(to right, #2c3e50, #4ca1af);
    width: 220px;
    min-height: 100vh;
    padding-top: 20px;
    color: #fff;
}

.el-menu-sidebar:not(.el-menu--collapse) {
    padding: 10px;
    z-index: 10;
}

.sidebar-header {
    color: white;
    text-align: center;
    padding: 10px 0;
}

.collapse-icon,
.expand-icon {
    position: absolute;
    right: 0;
    top: 10px;
    padding: 10px;
}

.el-menu-sidebar .el-menu-item {
    border-radius: 10px;
    margin: 5px 0;
    transition: background-color 0.3s ease;
}

.el-menu-sidebar .el-menu-item:hover {
    background-color: rgba(255, 255, 255, 0.2);
}
</style>