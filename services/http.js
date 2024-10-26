export default class Http {
  constructor() {
    const { $api } = useNuxtApp().$createApi('http://127.0.0.1:9000/api/auth/v1/');
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
