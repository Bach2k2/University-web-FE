import { defineStore } from "pinia";
import { getCachedData, createCachedEntry } from "@/utils/caching";

export const useRolesStore = defineStore("roles", {
  state: () => ({
    roles: {
      ...createCachedEntry([], 0),
    },
  }),
  persist: {
    storage: persistedState.localStorage,
  },
  getters: {
    allRoles: (state) => {
      return getCachedData(state.roles);
    },
    getStudentRole: (state) => {
      //   const roles = getCachedData(state.roles) || [];
      const roles = state.roles || [];
      console.log("roles:", roles);
      return roles.find((role) => role.name === "Student") || null;
    },
    getTeacherRole: (state) => {
      const roles = getCachedData(state.roles) || [];

      return roles.find((role) => role.name === "Teacher");
    },
  },
  actions: {
    setRoles(roles) {
      this.roles = createCachedEntry(roles, Date.now());
    },
  },
});
