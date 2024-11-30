import { defineStore } from "pinia";
import { getCachedData, createCachedEntry } from "@/utils/caching";

export const useMajorsStore = defineStore("majors", {
  state: () => ({
    majors: {
      ...createCachedEntry([], 0),
    },
  }),
  persist: {
    storage: persistedState.localStorage,
  },
  getters: {
    allMajors: (state) => {
      return getCachedData(state.majors);
    },
  },
  actions: {
    setMajors(majors) {
      this.majors = createCachedEntry(majors, Date.now());
    },
  },
});
