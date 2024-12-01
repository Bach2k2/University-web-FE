import { useTeacherTypesStore } from "~/stores/teacher_types";
import BaseService from "./base";
import { shouldFetch, createCachedEntry } from '@/utils/caching';

class TeacherTypeService extends BaseService {
  get entity() {
    return "department/v1/teacher_types";
  }

  async fetch(force=false) {
    const store = useTeacherTypesStore();
    if(force || shouldFetch(store.teacher_types)) {
      store.setTeacherTypes({ ...store.teacher_types, fetching: true });
      try {
        const response = await this.gets();
        console.log(response);
        const teacher_types = createCachedEntry(response);
        store.setTeacherTypes(teacher_types);
      } catch (error) {
        store.setTeacherTypes({ ...store.teacher_types, fetching: false });
        throw error;
      }
    }     
  }
}

export default new TeacherTypeService();