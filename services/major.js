import BaseService from "./base";
import { shouldFetch, createCachedEntry } from '@/utils/caching';
import { useMajorsStore } from '~/stores/majors';
class MajorService extends BaseService {
  get entity() {
    return "department/v1/majors";
  }

  async fetch(force=false) {
    const store = useMajorsStore();
    if(force || shouldFetch(store.majors)) {
      store.setMajors({ ...store.majors, fetching: true });
      try {
        const response = await this.gets();
        const majors = createCachedEntry(response);
        store.setMajors(majors);
      } catch (error) {
        store.setMajors({ ...store.majors, fetching: false });
        throw error;
      }
    }     
  }
}

export default new MajorService();