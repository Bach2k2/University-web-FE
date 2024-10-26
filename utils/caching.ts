export function shouldFetch(current: { fetching: boolean; expired_at: number; data: any; }) {
    const {fetching, expired_at, data } = current;
    if (fetching) {
        return false;
    }
    if (!data ||
      !expired_at ||
      (Array.isArray(data) && data.length == 0) ||
      Object.keys(data).length == 0
    ) {
        return true;
    }
  
    return expired_at < Date.now();
  }
  
  export function getCachedData(current: { fetching: boolean; expired_at: number; data: any; }) {
    const { data } = current;
    if (!data || (Array.isArray(data) && data.length == 0)) {
        return null;
    }
    return data;
  }
  
  export function createCachedEntry(data: any, cachePeriod=30000) {
    return {
      fetching: false,
      expired_at: Date.now() + cachePeriod,
      data
    };
  }
    