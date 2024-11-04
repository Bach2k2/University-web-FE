<template>
  <div v-if="authenticated" class="flex flex-row min-h-screen">
    <TopbarNav />
    <aside class="flex-none w-64 h-screen text-white">
      <Sidebar class="flex-1 overflow-y-auto overflow-x-hidden aside-scrollbars dark:aside-scrollbars-[slate]">
        <template #header>
          <MyUniversityLogo />
          <!-- <h5 >{{ $t('education_management') }}</h5> -->
        </template>
        <el-menu-item index="/admin">
          <IconDashboard color="white" style="cursor: pointer" class="el-icon" />
          <span class="text-white">{{ $t('dashboard') }}</span>
        </el-menu-item>
        <el-menu-item index="/admin/students">
          <IconStudent color="white" style="cursor: pointer" class="el-icon" />
          <span class="text-white">{{ $t('students') }}</span>
        </el-menu-item>
        <el-sub-menu index="/admin/courses">
          <template #title>
            <IconCourse color="white" style="cursor: pointer" class="el-icon" />
            <span class="text-white">{{ $t('course_management') }}</span>
          </template>
          <el-menu-item index="/admin/courses">
            <template #title class="text-white">{{ $t('courses') }}</template>
          </el-menu-item>
          <el-menu-item index="/admin/courses/subjects">
            <template #title class="text-white">{{ $t('subjects') }}</template>
          </el-menu-item>
          <el-menu-item index="/admin/courses/rooms">
            <template #title class="text-white">{{ $t('rooms') }}</template>
          </el-menu-item>
          <el-menu-item index="/admin/courses/room-types">
            <template #title class="text-white">{{ $t('room_types') }}</template>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="#">
          <template #title>
            <el-icon>
              <Document />
            </el-icon>
            <span class="text-white"> {{ $t('documents') }}</span>
          </template>

          <el-menu-item index="/admin/documents/thesis">
            <template #title class="text-white">{{ $t('thesis') }}</template>
            <!-- <el-menu-item index="1-4-1">item one</el-menu-item> -->
          </el-menu-item>
          <el-menu-item index="/admin/documents/subject_materials">
            <template #title class="text-white">{{ $t('subject_materials') }}</template>
            <!-- <el-menu-item index="1-4-1">item one</el-menu-item> -->
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/admin/departments">
          <template #title>
            <el-icon>
              <OfficeBuilding />
            </el-icon>
            <span class="text-white">{{ $t('departments') }}</span>
          </template>
          <RestrictedView>
            <el-menu-item index="/admin/departments/teachers">
              <IconTeacher color="white" style="cursor: pointer" class="el-icon" /><span>{{ $t('teachers') }}</span>
            </el-menu-item>
          </RestrictedView>
          <el-menu-item index="/admin/departments/majors">
            <IconMajor class="el-icon" /><span>{{ $t('majors') }}</span>
          </el-menu-item>
          <el-menu-item index="/admin/departments/teacher-types">
            <IconMajor class="el-icon" /><span>{{ $t('teacher_types') }}</span>
          </el-menu-item>
        </el-sub-menu>
      </Sidebar>
      <a
        class="flex cursor-pointer py-3 border-blue-600 dark:border-blue-500 ring-blue-300 dark:ring-blue-700 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-700 hover:dark:bg-blue-600 hover:dark:border-blue-600"><span
          class="inline-flex justify-center items-center w-16 h-6 flex-none"><svg viewBox="0 0 24 24" width="18"
            height="18" class="inline-block">
            <path fill="currentColor"
              d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z">
            </path>
          </svg></span><span class="grow text-ellipsis line-clamp-1 pr-12">Logout</span></a>
    </aside>
    <!-- Main Content -->
    <main class="flex-1 p-4 bg-gray-50 mt-16">
      <slot />
    </main>
 
  </div>
  <div v-else>
    <NavBar />
    <AuthenticationLogin />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconMajor from '~/assets/icons/majors.svg'
import IconDashboard from '~/assets/icons/dashboard.svg';
import IconStudent from '~/assets/icons/students.svg'
import IconTeacher from '~/assets/icons/teachers.svg'
import IconCourse from '~/assets/icons/courses.svg'
import Sidebar from '@/components/Sidebar/index.vue'
import MyUniversityLogo from '@/assets/icons/dark_logo.svg'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  OfficeBuilding
} from '@element-plus/icons-vue'
const layoutAsidePadding = 'xl:pl-60'

import { useOauthStore } from '@/stores/oauth';
const oauthStore = useOauthStore()
const authenticated = computed(() => {
  const { tokenInfo } = oauthStore;
  if (!tokenInfo) return false;
  const { access_token } = tokenInfo;
  if (!access_token) return false;
  return access_token.length > 0;
})
const router = useRouter();
onMounted(() => {
  // if (!authenticated.value) {
  //   navigateTo('/login')
  // }
})
</script>
<style lang="css" scoped>
li .el-menu-item {
  display: flex;
  align-items: center;
  color: white;
  list-style: none;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  white-space: nowrap;
}
</style>