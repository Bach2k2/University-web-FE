<template>
    <div class="flex flex-col  items-center justify-center pt-20 px-5">
        <PaginationTable :page-size="5" :service="StudentService" :canAddItems="true" :canDeleteItems="true"
            :canEditItems="true" :multipleSelect="true" :allowExportToExcel="true" :allowExportToJson="true"
            :searchable="true">
            <el-table-column prop="name_content.origin" label="Name" min-width="150"></el-table-column>
            <el-table-column prop="updated_at" :label="$t('updated_at')" min-width="180" sortable>
                <template #default="scope">
                    {{ utcToLocalDateTime(scope.row.updated_at) }}
                </template>
            </el-table-column>
        </PaginationTable>
    </div>
</template>

<script setup>
definePageMeta({
    layout:'adminlayout'
})
import StudentService from '@/services/student';
import { utcToLocalDateTime } from '@/utils/time'
</script>
