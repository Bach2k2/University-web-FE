import { defineStore } from "pinia";
import { getCachedData, createCachedEntry } from "@/utils/caching";

export const useDepartmentsStore = defineStore("departments", {
  state: () => ({
    departments: {
      ...createCachedEntry([], 0),
    },
  }),
  persist: {
    storage: persistedState.localStorage,
  },
  getters: {
    allDepartments: (state) => {
      return getCachedData(state.departments);
    },
    departmentsCount(state) {
      const departmentsData = getCachedData(state.departments);
      return departmentsData ? departmentsData.length : 0;
    },
  },
  actions: {
    setDepartments(departments) {
      this.departments = departments;
    },
  },
});
