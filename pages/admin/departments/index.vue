<template>
    <div class="mt-20">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">{{ $t('dashboard') }}</el-breadcrumb-item>
            <el-breadcrumb-item>
                <a href="/admin/departments">{{ $t('departments') }}</a>
            </el-breadcrumb-item>
        </el-breadcrumb>

        <div class="flex flex-col items-center justify-center pt-10 px-5">
            <PaginationTable :page-size="5" :service="DepartmentService" :can-add-items="true" :can-delete-items="true"
                :can-edit-items="true" :multiple-select="true" :allow-export-to-excel="true"
                :allow-export-to-json="true" :searchable="true">
                <el-table-column prop="name" :label="$t('name')" min-width="150"></el-table-column>             
            </PaginationTable>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'adminlayout'
});
import DepartmentService from '@/services/department';
import { utcToLocalDateTime } from '@/utils/time';
</script>