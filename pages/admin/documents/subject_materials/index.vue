<template>
    <div class="mt-20">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">{{ $t('dashboard') }}</el-breadcrumb-item>
            <el-breadcrumb-item>
                <router-link to="/admin/documents/subject_materials">{{ $t('subject_materials_management')
                    }}</router-link>
            </el-breadcrumb-item>
        </el-breadcrumb>

        <div class="flex flex-col items-center justify-center pt-10 px-5">
            <PaginationTable :page-size="5" :service="SubjectMaterialService" :can-add-items="true"
                :can-delete-items="true" :can-edit-items="true" :multiple-select="true" :allow-export-to-excel="true"
                :allow-export-to-json="true" :searchable="true">
                <el-table-column prop="title" :label="$t('title')" min-width="150"></el-table-column>
                <el-table-column prop="description" :label="$t('description')" min-width="300"></el-table-column>
            </PaginationTable>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'adminlayout'
});
import SubjectMaterialService from '@/services/subject_material';
</script>