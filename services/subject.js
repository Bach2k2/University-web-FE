import { useSubjectsStore } from "~/stores/subject";
import BaseService from "./base";
import { shouldFetch, createCachedEntry } from '@/utils/caching';

class SubjectService extends BaseService {
  get entity() {
    return "course/v1/subjects";
  }

  async fetch(force=false) {
    const store = useSubjectsStore();
    if(force || shouldFetch(store.subjects)) {
      store.setSubjects({ ...store.subjects, fetching: true });
      try {
        const response = await this.gets();
        const subjects = createCachedEntry(response);
        store.setSubjects(subjects);
      } catch (error) {
        store.setSubjects({ ...store.subjects, fetching: false });
        throw error;
      }
    }     
  }
}

export default new SubjectService();