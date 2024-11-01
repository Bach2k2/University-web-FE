import { defineStore } from 'pinia';
import { getCachedData, createCachedEntry } from '@/utils/caching';

export const useSubjectsStore = defineStore('subjects', {
    state: () => ({
        subjects: {
            ...createCachedEntry([], 0)
        },
    }),
    persist: {
        storage: persistedState.localStorage,
    },
    getters: {
        allSubjects: (state) => {
            return getCachedData(state.subjects);
        }
    },
    actions: {
        setSubjects(subjects) {
            this.subjects = subjects;
        }
    },
})