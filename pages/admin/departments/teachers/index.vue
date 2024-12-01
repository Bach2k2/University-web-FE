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
        <div class="flex flex-col w-full items-center justify-center pt-20 px-5">
            <PaginationTable :service="TeacherService" :canAddItems="true" :canDeleteItems="true" :canEditItems="true"
                :multipleSelect="true" :allowExportToExcel="true" :allowExportToJson="true" :searchable="true"
                :custom-fetch-data="customFetchData">
                <template #append>
                    <label>{{ $t('department')+':' }}</label>
                    <el-select v-model="selectedDepartment" multiple style="width: 200px; max-width: 500px" collapse-tags>
                        <el-option v-for="department in departmentStore.allDepartments" :key="department.id" :value="department.id"
                            :label="department.name">
                        </el-option>
                    </el-select>
                </template>
                <template #more_action>
                    <div class="flex flex-row self-start gap-2 my-2">
                        <el-select v-model="selectedTeacherType" multiple style="width: 200px; max-width: 500px"
                            collapse-tags clearable>
                            <el-option v-for="type in teacherTypesStore.allTeacherTypes.data" :key="type.id"
                                :value="type.id" :label="type.name">
                            </el-option>
                        </el-select>
                        <el-button @click="fetchData" type="primary">
                            {{ $t('fetch_data') }}
                        </el-button>
                    </div>
                </template>
                <!-- <el-table-column :label="$t('major')" min-width="150">
                    <template #default="scope">
                        {{ scope.row.departments[0].major }}
                    </template>
                </el-table-column> -->
                <el-table-column :label="$t('full_name')" min-width="150">
                    <template #default="scope">
                        {{ scope.row.user.first_name + " " + scope.row.user.last_name }}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('department_id')" min-width="150">
                    <template #default="scope">
                        {{ scope.row.departments[0].id }}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('department')" min-width="150">
                    <template #default="scope">
                        {{ scope.row.departments[0].name }}
                    </template>
                </el-table-column>
            </PaginationTable>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'adminlayout'
})
import TeacherService from '@/services/teacher';
import DepartmentService from '@/services/department'

import TeacherTypeService from '@/services/teacher_type'
import { utcToLocalDateTime } from '@/utils/time'
import UserService from '@/services/user';
import { useDepartmentsStore } from "~/stores/departments";
import { useTeacherTypesStore } from '~/stores/teacher_types';

const selectedDepartment = ref(null)
const departmentStore = useDepartmentsStore();

const selectedTeacherType = ref(null)
const teacherTypesStore = useTeacherTypesStore();

const fetchData = () => {
    TeacherService.fetch(true);
    customFetchData();
}

const customFetchData = async (pagination, searchQuery) => {
    const filterOptions = {
        departmentIds: selectedDepartment.value,
        teacherTypeIds: selectedTeacherType.value,
    };
    return TeacherService.fetchDataWithFilters({ ...pagination, ...filterOptions, searchQuery });
};


onMounted(() => {
    fetchData();
    DepartmentService.fetch(true)
    TeacherTypeService.fetch(true)
    console.log('departments:', departmentStore.allDepartments);
    console.log('teacher_types:', teacherTypesStore.allTeacherTypes);
})
</script>
