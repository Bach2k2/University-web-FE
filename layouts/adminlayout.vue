<template>
  <div v-if="authenticated" class="flex flex-row min-h-screen">
    <TopbarNav />

    <aside class="flex-none w-64 h-screen">
      <Sidebar class="flex-1 overflow-y-auto overflow-x-hidden aside-scrollbars dark:aside-scrollbars-[slate]">
        <template #header>
          <p>One</p>
          <h5>{{ $t('education_management') }}</h5>
        </template>
        <el-menu-item index="/admin">
          <IconDashboard color="white" style="cursor: pointer" class="el-icon" />
          <span class="text-white">{{ $t('dashboard') }}</span>
        </el-menu-item>
        <el-menu-item index="/admin/students">
          <IconStudent color="white" style="cursor: pointer" class="el-icon" />
          <span class="text-white">{{ $t('student') }}</span>
        </el-menu-item>
        <el-menu-item index="/admin/courses">
          <IconDashboard color="white" style="cursor: pointer" class="el-icon" />
          <span class="text-white">{{ $t('course') }}</span>
        </el-menu-item>
        <el-menu-item index="/admin/documents">
          <IconDashboard color="white" style="cursor: pointer" class="el-icon" />
          <span class="text-white">{{ $t('document') }}</span>
        </el-menu-item>
        <el-sub-menu index="/admin/departments">
          <template #title>
            <span class="text-white">{{ $t('department') }}</span>
          </template>
          <RestrictedView>
            <el-menu-item index="/admin/department/teachers">{{ $t('teachers') }}</el-menu-item>
          </RestrictedView>
          <el-menu-item index="/admin/department/teachers">{{ $t('teachers') }}</el-menu-item>
          <el-menu-item index="/admin/department/majors">
            <IconMajor class="el-icon" /><span>{{ $t('majors') }}</span>
          </el-menu-item>
          <el-menu-item index="/admin/department/teacher-types">{{ $t('teacher_types') }}</el-menu-item>
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
    <NavBar/>
    <AuthenticationLogin />
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconMajor from '~/assets/icons/majors.svg'
import IconDashboard from '~/assets/icons/dashboard.svg';
import IconStudent from '~/assets/icons/student_types.svg'
import Sidebar from '@/components/Sidebar/index.vue'
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