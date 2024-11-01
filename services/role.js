import BaseService from "./base";
import { shouldFetch, createCachedEntry } from "@/utils/caching";
import { useRolesStore } from "@/stores/roles";

class RoleService extends BaseService {
  get entity() {
    return "auth/v1/users/roles/";
  }

  async fetch(force = false) {
    const store = useRolesStore();
    if (force || shouldFetch(store.roles)) {
      store.setRoles({ ...store.roles, fetching: true });
      try {
        const response = await this.gets();
        const roles = createCachedEntry(response);

        store.setRoles(roles);
      } catch (error) {
        store.setRoles({ ...store.roles, fetching: false });
        throw error;
      }
    }
  }
}

export default new RoleService();
