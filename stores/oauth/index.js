import { defineStore } from 'pinia';
import jwtDecode from "jwt-decode";
import { getCachedData } from '@/utils/caching';
import { createCachedEntry } from '@/utils/caching';
export const useOauthStore= defineStore('oauth',{
    state: () => ({
        tokenInfo: {
            access_token: "",
            refresh_token: "",
            sub: "",
            iat: 0,
            exp: 0,
            nbf: 0,
            scope: "",
            business_id: null
        },
        scopes: {
            ...createCachedEntry([], 0)
        },
        default_scopes: {
            ...createCachedEntry([], 0)
        },
        first_login: false,
        default_business_id: null,
        user: null,
    }),
    persist: {
        storage: persistedState.localStorage,
    },
    getters: {
      
        isFirstLogin: (state) => {
            return state.first_login
        },
        grantedScopes: (state) => {
            const {scope} = state.tokenInfo;
            if (!scope || scope.length ==0) {
                return [];
            }
            return scope.split(" ");
        },
        allScopes: (state) => {
            return getCachedData(state.scopes);
        },
        defaultScopes: (state) => {
            return getCachedData(state.default_scopes);
        },
        peopleGrantableScopes: (state) => {
            const scopes = _cloneDeep(getCachedData(state.scopes));
            try {
                if (scopes && scopes.openid) {
                    delete scopes.openid;
                }
            } catch (error) {
                console.warn(error);
            }
            return scopes;
        },
        hasAllScopes: (state) => (scopes) => {
            const { scope } = state.tokenInfo;
            if (!scope || scope.length === 0) {
                return false;
            }
            return !scopes.some((n) => {
                return scope.indexOf(n) === -1;
            });
        },
        hasOneOfScopes: (state) => (scopes) => {
            const { scope } = state.tokenInfo;
            if (!scope || scope.length === 0) {
                return false;
            }
            return scopes.some((n) => {
              return scope.indexOf(n) !== -1;
            });
        },
        userId: (state) => {
            return state.user ? state.user.id : null;
        },
    },
    actions: {
        setTokenInfo({ access_token, refresh_token }) {
            const { sub, iat, exp, nbf, scope, business_id } = jwtDecode(access_token);
            this.tokenInfo = {
                access_token,
                refresh_token,
                sub,
                iat,
                exp,
                nbf: nbf,
                scope,
                business_id
            }

        },
        setFirstLogin(value) {
            this.first_login = value;
        },
        setScopes(scopes) {
            this.scopes = scopes;
        },
        setDefaultScopes(scopes) {
            this.default_scopes = scopes;
        },
        setUser(user) {
            this.user = user;
        }
    },
})