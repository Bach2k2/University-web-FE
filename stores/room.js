import { defineStore } from 'pinia';
import { getCachedData, createCachedEntry } from '@/utils/caching';

export const useRoomsStore = defineStore('rooms', {
    state: () => ({
        rooms: {
            ...createCachedEntry([], 0)
        },
    }),
    persist: {
        storage: persistedState.localStorage,
    },
    getters: {
        allRooms: (state) => {
            return getCachedData(state.rooms);
        }
    },
    actions: {
        setRooms(rooms) {
            this.rooms = rooms;
        }
    },
})