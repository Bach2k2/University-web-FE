export default class Http {
  constructor() {
    const { $api } = useNuxtApp();
    this.api = $api;
  }

  get(path, params = null) {
    if (!params) return this.api(path);
    const query = Object.entries(params)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");
    const url = `${path}?${query}`;
    return this.api(url);
  }

  post(path, data = null) {
    return this.api(path, {
      method: "POST",
      body: data,
    });
  }

  put(path, data) {
    return this.api(path, {
      method: "PUT",
      body: data,
    });
  }

  delete(path, data = null) {
    return this.api(path, {
      method: "DELETE",
      body: data,
    });
  }
}
