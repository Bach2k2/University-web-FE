<template>
    <div class="mt-20">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">{{ $t('dashboard') }}</el-breadcrumb-item>
            <el-breadcrumb-item>
                <a href="/admin/courses">{{ $t('courses') }}</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <a href="/admin/courses/rooms">{{ $t('rooms') }}</a>
            </el-breadcrumb-item>
        </el-breadcrumb>

        <div class="flex flex-col items-center justify-center pt-10 px-5">
            <PaginationTable :page-size="5" :service="RoomTypeService" :can-add-items="true" :can-delete-items="true"
                :can-edit-items="true" :multiple-select="true" :allow-export-to-excel="true"
                :allow-export-to-json="true" :searchable="true">
                <el-table-column prop="title" :label="$t('title')" min-width="150"></el-table-column>
                <el-table-column prop="capacity" :label="$t('capacity')" min-width="150"></el-table-column>    
                <el-table-column prop="location" :label="$t('location')" min-width="180"></el-table-column> 
                <el-table-column prop="room_type.title" :label="$t('room_type')" min-width="150"></el-table-column>           
            </PaginationTable>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'adminlayout'
});
import RoomService from '@/services/room';
import { utcToLocalDateTime } from '@/utils/time';
</script>