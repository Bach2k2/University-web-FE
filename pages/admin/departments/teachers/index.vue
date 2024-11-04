<template>
    <div class="mt-20">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">{{ $t('dashboard') }}</el-breadcrumb-item>
            <el-breadcrumb-item>
                <a href="/admin/departments">{{ $t('departments') }}</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <a href="/admin/departments/teachers">{{ $t('teachers') }}</a>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="flex flex-col  items-center justify-center pt-20 px-5">
            <PaginationTable :page-size="5" :service="TeacherService" :canAddItems="true" :canDeleteItems="true"
                :canEditItems="true" :multipleSelect="true" :allowExportToExcel="true" :allowExportToJson="true"
                :searchable="true">
                <el-table-column prop="user_id" label="user_id" min-width="150"></el-table-column>
            </PaginationTable>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'adminlayout'
})
import TeacherService from '@/services/teacher';
import { utcToLocalDateTime } from '@/utils/time'
</script>
