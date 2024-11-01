import BaseService from "./base";
import { shouldFetch, createCachedEntry } from '@/utils/caching';

class UserService extends BaseService {
  get entity() {
    return "auth/v1/users/";
  }

}

export default new UserService();