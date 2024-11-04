<template>
    <div class="mt-20">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">{{ $t('dashboard') }}</el-breadcrumb-item>
            <el-breadcrumb-item>
                <a href="/admin/documents/thesis">{{ $t('thesis_management') }}</a>
            </el-breadcrumb-item>
        </el-breadcrumb>

        <div class="flex flex-col items-center justify-center pt-10 px-5">
            <h1>My thesis</h1>
            <PaginationTable :page-size="5" :service="ThesisService" :can-add-items="true" :can-delete-items="true"
                :can-edit-items="true" :multiple-select="true" :allow-export-to-excel="true"
                :allow-export-to-json="true" :searchable="true">
                <el-table-column prop="title" :label="$t('title')" min-width="150"></el-table-column>
                <el-table-column prop="more_info.funding" :label="$t('funding')" min-width="150"></el-table-column>
                <el-table-column prop="more_info.department" :label="$t('department')"
                    min-width="150"></el-table-column>
                <el-table-column prop="more_info.supervisor" :label="$t('supervisor')"
                    min-width="150"></el-table-column>
                <el-table-column prop="description" :label="$t('description')" min-width="150"></el-table-column>
                <el-table-column prop="submission_date" :label="$t('submission_date')" min-width="180" sortable>
                    <template #default="scope">
                        {{ utcToLocalDateTime(scope.row.submission_date) }}
                    </template>
                </el-table-column>
            </PaginationTable>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'adminlayout'
});
import ThesisService from '@/services/thesis';
import { utcToLocalDateTime } from '@/utils/time';
</script>