<template>
    <div class="container-login flex bg-slate-100 rounded min-h-screen justify-center items-center">
        <div class="wrap-login mt-2">

            <div class="mt-5 mb-10">
                <div class="lg:text-l text-center font-bold">
                    <img src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-white.svg" alt="logo"
                        class="w-full" />
                </div>
            </div>
            <el-form ref="formRef" :model="formData" :rules="rules">
                <span class="text-primary">{{error}}</span>
                <div class="mt-2">
                    <el-form-item class="wrap-input username-wrap validate-input" prop="email">
                        <input class="input" type="text" :placeholder="$t('email_phone_username')"
                            v-model="formData.email" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <input class="input" type="password" :placeholder="$t('password')"
                            v-model="formData.password" />
                    </el-form-item>
                    <NuxtLink to="/forgot-password" class="text-primary">{{ $t('forgot_password') }}</NuxtLink>
                </div>
                <div class="mt-2 flex flex-row items-center justify-center self-center m-0 p-0">
                    <el-button class="py-2 px-4 login-form-btn items-center" @click="login()">
                        Sign in
                    </el-button>
                </div>
            </el-form>
            <!-- <div class="login-method-container login-class">
                <div class="sso-method-block">
                    <div class="sso-title">
                        <div class="sso-title-line"></div>
                        <div class="sso-title-text" res-key="SSO_OtherMethod">Hoặc đăng nhập với</div>
                        <div class="sso-title-line"></div>
                    </div>
                    <div class="sso-method-list">
                        <div class="sso-method-item" method="Google" title="Google"></div>
                        <div class="sso-method-item" method="Apple" title="Apple"></div>
                        <div class="sso-method-item" method="Microsoft" title="Microsoft"></div>
                    </div>
                </div>
            </div> -->

        </div>
    </div>
</template>
<script lang="ts" setup>
import Password from 'primevue/password';
import OAuthService from '@/services/oauth';
import { useOauthStore } from '~/stores/oauth';

definePageMeta({
    layout: "auth",
})

const props = defineProps({
    redirectTo: {
        type: String,
        required: false
    },
})

useHead({
    title: 'Login'
})
const { t } = useI18n();
const loading = ref(false);
const error = ref(null);
const authError = ref('')
const store = useOauthStore();
const formRef = ref(null);
const formData = ref({
    email: null,
    password: null,
})

const login = async () => {
    if (!formRef.value) {
        return;
    }
    formRef.value.validate(async (valid: any, fields: any) => {
        if (!valid) {
            return;
        }
        let { email: username, password } = formData.value;
        const { redirectTo } = props
        store.setFirstLogin(false);
        error.value = null;
        OAuthService.login({ username, password })
            .then(() => {
                if (!!redirectTo && redirectTo.length > 0) {
                    navigateTo(redirectTo);
                }
            })
            .catch(e => {
                console.warn(e);
                error.value = e.error;
            })
    });

}
const rules = {
    email: [
        { required: true, message: t('validate_error_required'), trigger: 'blur' },
        { type: 'email', message: t('validate_error_email_format'), trigger: ['blur'] },
    ],
    password: [
        { required: true, message: t('validate_error_required'), trigger: 'blur' },
    ],
};
const clearError = () => {
    authError.value = '';
};
</script>
<style lang="css" scoped>
.container-login {
    width: 100%;
    min-height: 100vh;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background-image: url('https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?cs=srgb&dl=pexels-pixabay-206359.jpg&fm=jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
    z-index: 1;
}
.wrap-login {
    width: 400px;
    border-radius: 8px;
    padding: 40px 48px 40px 48px;
    min-height: 340px;
    background: #fff;
    position: relative;
    box-shadow: 0 12px 20px rgba(0, 0, 0, .12);
}

.input {
    font-size: 16px;
    color: #212121;
    line-height: 1.2;
    display: block;
    width: 100%;
    height: 48px;
    border: 1px solid #e0e5e9;
    background: 0 0;
    padding: 14px 16px 15px 16px;
    border-radius: 4px;
}

.wrap-input {
    width: 100%;
    position: relative;
    margin-bottom: 12px;
}
.login-form-btn {
    position: relative;
    width: 100%;
    font-size: 16px;
    color: #fff;
    line-height: 40px;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    height: 40px;
    border-radius: 4px;
    background: #0073e6;
    transition: all .4s;
    display: flex;
    align-items: center;
    text-decoration: none;
}

.sso-title {
    display: inline-flex;
    align-items: center;
    justify-items: center;
    height: 28px;
    width: 100%;
    margin-bottom: 16px;
}
.sso-title-line {
    height: 1px;
    flex: 1;
    background-color: #9ea1a5;
}
.sso-title-text {
    padding: 5px 10px;
    background-color: #fff;
    color: #9ea1a5;
    font-size: 14px;
}

.sso-method-item[method=Google] {
    background-image: url('@/assets/icons/google-icon-logo.svg');
}
</style>