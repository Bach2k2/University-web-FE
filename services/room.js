import { useRoomsStore } from "~/stores/room";
import BaseService from "./base";
import { shouldFetch, createCachedEntry } from '@/utils/caching';

class RoomService extends BaseService {
  get entity() {
    return "course/v1/rooms";
  }

  async fetch(force = false) {
    const store = useRoomsStore();
    if (force || shouldFetch(store.rooms)) {
      store.setRooms({ ...store.rooms, fetching: true });
      try {
        const response = await this.gets();
        const rooms = createCachedEntry(response);
        store.setRooms(rooms);
      } catch (error) {
        store.setRooms({ ...store.rooms, fetching: false });
        throw error;
      }
    }
  }
}

export default new RoomService();
