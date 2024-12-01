import BaseService from "./base";
import { shouldFetch, createCachedEntry } from '@/utils/caching';
import { useDepartmentsStore } from "~/stores/departments";

class DepartmentService extends BaseService {
  get entity() {
    return "department/v1/departments";
  }

  async fetch(force=false) {
    const store = useDepartmentsStore();
    if(force || shouldFetch(store.departments)) {
      store.setDepartments({ ...store.departments, fetching: true });
      try {
        const response = await this.gets();
        const departments = createCachedEntry(response);
        console.log(departments);
        store.setDepartments(departments);
      } catch (error) {
        store.setDepartments({ ...store.departments, fetching: false });
        throw error;
      }
    }     
  }
}

export default new DepartmentService();