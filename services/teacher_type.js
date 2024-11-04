import BaseService from "./base";
import { shouldFetch, createCachedEntry } from '@/utils/caching';

class TeacherTypeService extends BaseService {
  get entity() {
    return "department/v1/teacher_types";
  }

  async fetch(force=false) {
    const store = usePlansStore();
    if(force || shouldFetch(store.plans)) {
      store.setPlans({ ...store.plans, fetching: true });
      try {
        const response = await this.gets();
        const plans = createCachedEntry(response);
        store.setPlans(plans);
      } catch (error) {
        store.setPlans({ ...store.plans, fetching: false });
        throw error;
      }
    }     
  }
}

export default new TeacherTypeService();