import BaseService from "./base";
import { shouldFetch, createCachedEntry } from '@/utils/caching';
import { useStudentsStore } from "@/stores/student";
class StudentService extends BaseService {
  get entity() {
    return "student/v1/students";
  }

  async fetch(force=false) {
    const store = useStudentsStore();
    if(force || shouldFetch(store.students)) {
      store.setStudents({ ...store.students, fetching: true });
      try {
        const response = await this.gets();
        const students = createCachedEntry(response);
        store.setStudents(students);
      } catch (error) {
        store.setStudents({ ...store.students, fetching: false });
        throw error;
      }
    }     
  }
}

export default new StudentService();