<template>
    <li>
        <component class="flex cursor-pointer text-white" @click="menuClick">
            <el-icon>{{ item.icon }}}</el-icon>
            <span>{{ item.label }}</span>
            <el-button size="large" :icon="isDropdownActive ? Expand : Fold"></el-button>
        </component>
    </li>
</template>
<script lang="ts" setup>
import { Expand, Fold } from '@element-plus/icons-vue'
const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    hasDropdown: {
        type: Boolean,
        require: false
    }
})

const emit = defineEmits(['menu-click'])
const isDropdownActive = ref(false);
const hasDropdown = computed(() => !!props.item.menu)
// const toggleSideBar = ()=>{
//     isDropdownActive.value = !isDropdownActive.value
// }
const menuClick = (event: any) => {
    emit('menu-click', event, props.item)

    if (hasDropdown.value) {
        isDropdownActive.value = !isDropdownActive.value
    }
}
</script>
