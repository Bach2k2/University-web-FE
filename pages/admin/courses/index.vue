<template>
    <div class="mt-20">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">dashboard</el-breadcrumb-item>
            <el-breadcrumb-item>
              <a href="/admin/student">{{$t('student_management')}}</a>
            </el-breadcrumb-item>
          </el-breadcrumb>
        <div class="flex flex-col  items-center justify-center pt-20 px-5">

            <PaginationTable :service="StudentService" :canAddItems="true" :canDeleteItems="true"
                :canEditItems="true" :multipleSelect="true" :allowExportToExcel="true" :allowExportToJson="true"
                :searchable="true">
                <el-table-column prop="user.first_name" :label="$t('first_name')" min-width="150"></el-table-column>
                <el-table-column prop="user.last_name" :label="$t('last_name')" min-width="150"></el-table-column>
                <el-table-column prop="user.email" :label="$t('email')" min-width="150"></el-table-column>
                <!-- <el-table-column prop="updated_at" :label="$t('updated_at')" min-width="180" sortable>
                <template #default="scope">
                    {{ utcToLocalDateTime(scope.row.updated_at) }}
                </template>
                </el-table-column> -->
            </PaginationTable>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'adminlayout'
})
import StudentService from '@/services/student';
// import { utcToLocalDateTime } from '@/utils/time'
</script>
