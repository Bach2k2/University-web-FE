<template>
    <el-card v-loading="loading">
        <template #header>
            <div class="flex flex-row h-full bg-primary text-white justify-between align-middle px-2">
                <span v-if="title && title.length > 0">{{ title }}</span>
                <div class="flex flex-row">
                    <el-button type="primary" v-if="editable && !editing" size="small" :icon="Edit" @click="edit()" />
                    <el-button type="primary" v-if="editing && changed" size="small" :icon="Discard"
                        @click="discard()" />
                    <el-button type="primary" v-if="editing && changed" size="small" :icon="Save" @click="onSave()" />
                    <el-button type="primary" v-if="collapsible && collapsed" size="small" :icon="CaretBottom"
                        @click="expand()" />
                    <el-button type="primary" v-if="collapsible && !collapsed" size="small" :icon="CaretTop"
                        @click="collapse()" />
                </div>
            </div>
        </template>
        <p v-if="error" class="flex self-center justify-center text-red-800 mb-2">{{ error }}</p>
        <el-form v-if="current" ref="formRef" :class="collapsed ? 'hidden' : 'block'"
            :label-width="props.labelWidth ? props.labelWidth : 'auto'"
            :label-position="props.labelPosition ? props.labelPosition : 'right'" label-suffix=":" :model="current"
            :rules="props.rules">
            <slot :current="current" :editing="editing" />
        </el-form>
    </el-card>
</template>

<script setup lang="ts" generic="S extends BaseService">
import { CaretTop, CaretBottom, Edit } from '@element-plus/icons-vue'
import Save from '@/assets/icons/save.svg'
import Discard from '@/assets/icons/discard.svg'
import { ref } from 'vue';
import BaseService from '@/services/base';
import { nestedDiff, toFormData, overrideFieldIfNullOrEmpty } from "@/utils/obj";
import { getErrorMessage } from '@/utils/error';
import { useOauthStore } from '@/stores/oauth';

const props = defineProps<{
    service: S,
    title?: String,
    collapsible?: Boolean,
    labelWidth?: String | Number | null
    labelPosition?: 'left' | 'right' | null
    default?: any | null,
    nestedFields?: String[] | null,
    editable?: Boolean
    overrideIfFieldNullOrEmpty?: any | null,
    rules?: any | null,
    contentType?: String | null,
    customCreateResponseParser?: (response: any) => any,
    addFn?: (data: any) => Promise<any>,
    updateFn?: (data: any) => Promise<any>,
    customHandleResponse?: (data: any) => any,
    useParentHandlers?: Boolean // Biến boolean để kiểm tra có dùng hàm từ cha không
}>();

const { t } = useI18n();
const route = useRoute();
const formRef = ref(null);
const editing = ref((route.query && route.query.edit && route.query.edit === 'true') || !!props.default);
const collapsed = ref(false);
const loading = ref(false);
const initData = overrideFieldIfNullOrEmpty(props.default, props.overrideIfFieldNullOrEmpty)
const origin = ref(_cloneDeep(initData));
const current = ref(_cloneDeep(initData));
const error = ref(null);

const oauthStore = useOauthStore();
const { tokenInfo } = storeToRefs(oauthStore);

const changes = computed(() => {
    const o = origin.value;
    const c = current.value;
    if (!c) {
        return null;
    }
    //Todo: implement comparing 2 object
    return nestedDiff(c, o, props.nestedFields);
});

const changed = computed(() => {
    const c = changes.value
    if (!c) {
        return false;
    }
    return Object.keys(c).length > 0;
});

const edit = () => {
    editing.value = true;
};

const collapse = () => {
    collapsed.value = true;
};

const expand = () => {
    collapsed.value = false;
};

const fetchData = async () => {
    const { id } = route.params;
    if (!id) {
        return;
    }

    error.value = null;
    loading.value = true;
    props.service.get(id)
        .then((response) => {
            let data = response;
            console.log(response);

            if (props.overrideIfFieldNullOrEmpty) {
                data = overrideFieldIfNullOrEmpty(data, props.overrideIfFieldNullOrEmpty)
            }
            origin.value = _cloneDeep(data);
            current.value = _cloneDeep(data);
        })
        .catch((e) => {
            error.value = getErrorMessage(e, e.statusCode ? t('an_error_occurred') : t('connection_corrupted'));
        })
        .finally(() => {
            loading.value = false;
        });
};

watch(tokenInfo, () => {
    fetchData();
});

const onSave = () => {
    if (!formRef.value) {
        return;
    }

    formRef.value.validate(async (valid, fields) => {
        if (!valid) {
            return;
        }
        saveEntry();
    });
};


const handleError = (e: any) => {
    error.value = getErrorMessage(e, t('an_error_occurred'));
};
const handleResponse = (response: any) => {
    try {
        console.log('res at mf', response);
        let data = response;
        if (props.overrideIfFieldNullOrEmpty) {
            data = overrideFieldIfNullOrEmpty(data, props.overrideIfFieldNullOrEmpty);
        }
        origin.value = _cloneDeep(data);
        current.value = _cloneDeep(data);
        if (data.id) {
            navigateTo(route.fullPath.replace('/new', `/${data.id}`));
        }
    } catch (err) {
        console.log(err);
    }
};



const saveEntry = async () => {
    let value = changes.value;
    if (!value) {
        return;
    }
    const { id } = value;
    const contentType = props.contentType
    if (contentType && contentType.includes('form-data')) {
        value = toFormData(value);
    }
    error.value = null;
    // Kiểm tra xem có dùng hàm từ component cha không
    if (props.useParentHandlers) {
        if (value.id && props.updateFn) {
            props.updateFn(value).then(handleResponse).catch(handleError);
        } else if (!value.id && props.addFn) {
            console.log("come on");

            props.addFn(value).then(handleResponse).catch(handleError);
        }
    } else {
        if (id) {
            props.service.update(value)
                .then((response) => {
                    let data = response;
                    if (props.overrideIfFieldNullOrEmpty) {
                        data = overrideFieldIfNullOrEmpty(data, props.overrideIfFieldNullOrEmpty)
                    }
                    origin.value = _cloneDeep(data);
                    current.value = _cloneDeep(data);
                })
                .catch((e) => {
                    error.value = getErrorMessage(e, t('an_error_occurred'));
                })
        } else {
            props.service.create(value)
                .then((response) => {
                    let data = response;
                    if (props.customCreateResponseParser) {
                        data = props.customCreateResponseParser(data)
                    }
                    if (props.overrideIfFieldNullOrEmpty) {
                        data = overrideFieldIfNullOrEmpty(data, props.overrideIfFieldNullOrEmpty)
                    }
                    origin.value = _cloneDeep(data);
                    current.value = _cloneDeep(data);
                    navigateTo(route.fullPath.replace('/new', `/${data.id}`));
                })
                .catch((e) => {
                    error.value = getErrorMessage(e, t('an_error_occurred'));
                })
        }
    }
};

const discard = () => {
    if (origin.value) {
        current.value = _cloneDeep(origin.value);
    }
};

defineExpose({
    current,
    changes,
    editing,
    formRef
});

onMounted(() => {
    fetchData();
})
</script>
