import { defineStore } from "pinia";
import { getCachedData, createCachedEntry } from "@/utils/caching";

export const useStudentsStore = defineStore("students", {
  state: () => ({
    students: {
      ...createCachedEntry([], 0),
    },
  }),
  persist: {
    storage: persistedState.localStorage,
  },
  getters: {
    allStudents: (state) => {
      return getCachedData(state.students);
    },
    studentsCount(state) {
      const studentsData = getCachedData(state.students);
      return studentsData ? studentsData.length : 0;
    },
  },
  actions: {
    setStudents(students) {
      this.students = students;
    },
  },
});
