import BaseService from "./base";
import { shouldFetch, createCachedEntry } from "@/utils/caching";

class TeacherService extends BaseService {
  get entity() {
    return "department/v1/teachers";
  }

  async fetch(force = false) {
    const store = useTeachersStore();
    if (force || shouldFetch(store.teachers)) {
      store.setTeachers({ ...store.teachers, fetching: true });
      try {
        const response = await this.gets();
        const teachers = createCachedEntry(response);
        store.setTeachers(teachers);
      } catch (error) {
        store.setTeachers({ ...store.teachers, fetching: false });
        throw error;
      }
    }
  }
  async fetchDataWithFilters({
    page,
    pageSize,
    departmentIds,
    teacherTypeIds,
    searchQuery,
  }) {
    const params = {
      page: page ?? 1,
      pageSize: pageSize ?? 10,
      department_ids: departmentIds?.length ? departmentIds.join(",") : "",
      teacher_type_ids: teacherTypeIds?.length
        ? teacherTypeIds.join(",")
        : "",
      search: searchQuery || "",
    };
    const response = await this.gets(params);
    return response;
  }
}

export default new TeacherService();
