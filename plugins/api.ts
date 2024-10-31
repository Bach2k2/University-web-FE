import { useOauthStore } from "@/stores/oauth";
import { useLocaleStore } from "@/stores/locale";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const oauthStore = useOauthStore();
  const localeStore = useLocaleStore();
  console.log("API base URL:", runtimeConfig.public.apiBase);

  const api = $fetch.create({
    baseURL: runtimeConfig.public.apiBase,
    onRequest({ request, options }) {
      const tokenInfo = oauthStore ? oauthStore.tokenInfo : null;
      let access_token = tokenInfo ? tokenInfo.access_token.trim() : null;
      if (access_token === "") access_token = null;

      let language = localeStore ? localeStore.current_langue : null;
      if (language === "") language = null;

      const isAuthEndpoint = request.endsWith("/login");
      // Add headers if token or language is available
      if (access_token || language) {
        if (!options.headers) {
          options.headers = new Headers();
        }
        const headers = options.headers;

        if (access_token && !isAuthEndpoint) {
          headers.set("Authorization", `Bearer ${access_token}`);
        }
        if (language) {
          headers.set("Accept-Language", language);
        }
        // headers.set("ngrok-skip-browser-warning", "true");
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401|| response.status === 403 ) {
        const tokenInfo = oauthStore ? oauthStore.tokenInfo : null;
        const refresh_token = tokenInfo ? tokenInfo.refresh_token : null;
        if (refresh_token && refresh_token.trim() !== "") {
          const formData = new FormData();
          formData.append("refresh_token", refresh_token);
          const refreshTokenUrl = `${runtimeConfig.public.apiBase}/auth/v1/oauth/refresh-token`;
          $fetch(refreshTokenUrl, {
            method: "POST",
            body: formData,
          })
            .then((data: any) => {
              const { access_token, refresh_token } = data;
              oauthStore.setTokenInfo({ access_token, refresh_token });
            })
            .catch((error) => {
              console.error(error);
              oauthStore.$reset();
            }).finally(()=>{
              console.log("check:")
            });
        }
      }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
