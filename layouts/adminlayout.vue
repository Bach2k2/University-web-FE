<script setup lang="ts">
import { ref } from 'vue'
import IconMajor from '~/assets/icons/majors.svg'
import IconDashboard from '~/assets/icons/dashboard.svg';
import IconStudent from '~/assets/icons/student_types.svg'
import Sidebar from '@/components/Sidebar/index.vue'
const layoutAsidePadding = 'xl:pl-60'

</script>

<template>
  <div class="flex flex-row">
    <TopbarNav/>
    <aside>
      <Sidebar>
        <template #header>
          <p>One</p>
          <h5>{{ $t('education_management') }}</h5>
        </template>
        <el-menu-item index="/admin">
          <IconDashboard class="el-icon" />
          <span>{{ $t('dashboard') }}</span>
        </el-menu-item>
        <el-menu-item index="/admin/students/">
          <IconStudent  class="el-icon"/>
          <span>{{ $t('student') }}</span>
        </el-menu-item>
        <el-menu-item index="/admin/course/">
          <IconDashboard class="el-icon" />
          <span>{{ $t('course') }}</span>
        </el-menu-item>
        <el-menu-item index="/admin/document/">
          <IconDashboard class="el-icon" />
          <span>{{ $t('document') }}</span>
        </el-menu-item>
        <el-sub-menu index="/admin/employees">
          <template #title>
            <span>{{ $t('department') }}</span>
          </template>
          <RestrictedView>
            <el-menu-item index="/admin/department/teachers">{{ $t('teachers') }}</el-menu-item>
          </RestrictedView>
          <el-menu-item index="/admin/department/teachers">{{ $t('teachers') }}</el-menu-item>
          <el-menu-item index="/admin/department/majors"> <IconMajor class="el-icon" /><span>{{ $t('majors') }}</span></el-menu-item>
          <el-menu-item index="/admin/department/teacher-types">{{ $t('teacher_types') }}</el-menu-item>
        </el-sub-menu>
      </Sidebar>
    </aside>
    <div class="flex-auto">
      <slot />
    </div>
  </div>
</template>