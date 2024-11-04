import { defineStore } from 'pinia';
import { getCachedData, createCachedEntry } from '@/utils/caching';

export const useteacher_departmentStore = defineStore('teacher_department', {
    state: () => ({
        teacher_department: {
            ...createCachedEntry([], 0)
        },
    }),
    persist: {
        storage: persistedState.localStorage,
    },
    getters: {
        allTeacherDepartment: (state) => {
            return getCachedData(state.teacher_department);
        }
    },
    actions: {
        setteacher_department(teacher_department) {
            this.teacher_department = teacher_department;
        }
    },
})