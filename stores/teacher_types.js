import { defineStore } from "pinia";
import { getCachedData, createCachedEntry } from "@/utils/caching";

export const useTeacherTypesStore = defineStore("teacher_types", {
  state: () => ({
    teacher_types: {
      ...createCachedEntry([], 0),
    },
  }),
  persist: {
    storage: persistedState.localStorage,
  },
  getters: {
    allTeacherTypes: (state) => {
      return getCachedData(state.teacher_types);
    },
  },
  actions: {
    setTeacherTypes(teacher_types) {
      this.teacher_types = createCachedEntry(teacher_types, Date.now());
    },
  },
});
