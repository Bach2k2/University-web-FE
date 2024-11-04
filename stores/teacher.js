import { defineStore } from 'pinia';
import { getCachedData, createCachedEntry } from '@/utils/caching';

export const useTeachersStore = defineStore('teachers', {
    state: () => ({
        teachers: {
            ...createCachedEntry([], 0)
        },
    }),
    persist: {
        storage: persistedState.localStorage,
    },
    getters: {
        allTeachers: (state) => {
            return getCachedData(state.teachers);
        }
    },
    actions: {
        setTeachers(teachers) {
            this.teachers = teachers;
        }
    },
})