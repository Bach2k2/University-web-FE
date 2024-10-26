<template>
    <el-select
        v-model:model-value="selected"
        :placeholder="$t('pick_a_language')"
        size="large"
        style="width: 8em"
    >
        <el-option
            v-for="language in localeStore.supportedLanguages"
            :key="language.code"
            :label="language.name"
            :value="language.code"
        />
    </el-select>
</template>

<script setup lang="ts">
import { useLocaleStore } from '@/stores/locale';
const localeStore = useLocaleStore();
const { locale, setLocale } = useI18n();
if (locale.value != localeStore.currentLangue) {
    setLocale(localeStore.currentLangue);
}
const selected = ref(localeStore.currentLangue);
watch(selected, (newVal) => {
    localeStore.setCurrentLangue(newVal);
    setLocale(newVal);
});
</script>