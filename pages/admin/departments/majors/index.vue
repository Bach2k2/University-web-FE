<template>
    <div class="flex flex-col  items-center justify-center pt-20 px-5">
        <PaginationTable :page-size="5" :service="MajorService" :canAddItems="true" :canDeleteItems="true"
            :canEditItems="true" :multipleSelect="true" :allowExportToExcel="true" :allowExportToJson="true"
            :searchable="true">
            <el-table-column prop="name" :label="$t('name')" min-width="150"></el-table-column>
            <el-table-column prop="department.name" :label="$t('department_name')" min-width="150"></el-table-column>
            <el-table-column prop="more_info.credits" :label="$t('credit')" min-width="150"></el-table-column>
            <el-table-column prop="more_info.duration" :label="$t('duration')" min-width="150"></el-table-column>
            <el-table-column prop="description" :label="$t('description')" min-width="300"></el-table-column>            
        </PaginationTable>
    </div>
</template>

<script setup>
definePageMeta({
    layout:'adminlayout'
})
import MajorService from '@/services/major';
import { utcToLocalDateTime } from '@/utils/time'
</script>
