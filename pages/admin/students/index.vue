<template>
    <div v-if="canView" class="mt-20">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">dashboard</el-breadcrumb-item>
            <el-breadcrumb-item>
              <a href="/admin/student">{{$t('student_management')}}</a>
            </el-breadcrumb-item>
          </el-breadcrumb>
        <div class="flex flex-col  items-center justify-center pt-20 px-5">

            <PaginationTable :pageSize="5" :service="StudentService" :canAddItems="true" :canDeleteItems="true"
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
    <div v-else class="mt-20">
        <span>{{ $t('no_permission') }}</span>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'adminlayout'
})
import StudentService from '@/services/student';
import { useOauthStore } from '@/stores/oauth';
const oauthStore = useOauthStore();

const canView = computed(() => {
    return oauthStore.hasOneOfScopes(["admin:students:view"]);
});

// import { utcToLocalDateTime } from '@/utils/time'
</script>
