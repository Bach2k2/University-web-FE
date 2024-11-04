import { defineStore } from "pinia";
import { getCachedData, createCachedEntry } from "@/utils/caching";

export const useTeachersStore = defineStore("teachers", {
  state: () => ({
    teachers: {
      ...createCachedEntry([], 0),
    },
  }),
  persist: {
    storage: persistedState.localStorage,
  },
  getters: {
    allTeachers: (state) => {
      return getCachedData(state.teachers);
    },
    teachersCount(state) {
      const teachersData = getCachedData(state.teachers);
      return teachersData ? teachersData.length : 0;
    },
  },
  actions: {
    setTeachers(teachers) {
      this.teachers = teachers;
    },
  },
});
