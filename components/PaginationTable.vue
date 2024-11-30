<template>
    <div class="flex flex-col items-center w-[80%]">
        <p v-if="error" class="self-center text-red-800">{{ error }}</p>
      
        <div class="flex flex-row w-full self-end gap-2 my-2 items-center">
            <slot name="append"></slot>
            <el-input v-if="searchable" v-model="keyword" style="max-width: 500px" :placeholder="$t('Keyword')">
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input>
            
            <el-button  :icon="Excel" v-if="allowExportToExcel" @click="exportToExcel">{{ $t("to_excel") }}</el-button>
            <el-button :icon="Json" v-if="allowExportToJson" @click="exportToJson">{{ $t("to_json") }}</el-button>
            <el-button v-if="selectedItems && selectedItems.length > 0" :icon="Delete" @click="onMultipleDelete()">
                Delete
            </el-button>
        </div>
        <slot name="more_action"></slot>
        
        <el-table v-loading="loading" :data="data.results" stripe border style="width: 100%"
            @selection-change="onSelectionChange" @row-click="onRowClick">
            <el-table-column v-if="multipleSelect" type="selection" width="55" />
            <slot />
            <el-table-column v-if="
                canDeleteItems || canEditItems || approvalButtons || cancelButton
            " :label="$t('Operations')" :min-width="120">
                <template #default="scope">
                    <el-button v-if="canEditItems" :icon="Edit" size="small" @click="editItem(scope.row.id)" />
                    <el-button v-if="canDeleteItems && !approvalButtons" :icon="Delete" size="small"
                        @click="onDeleteItem(scope.row)" />
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-if="pageSize && pageSize > 0" :page-size="data.page_size" :pager-count="data.num_pages"
            :total="data.count" :current-page="data.page" layout="prev, pager, next" class="mt-6"
            @current-change="onCurrentPageChange" />
        <el-button type="primary" v-if="canAddItems" :icon="Plus" @click="onAdd()" class="self-end px-2 mb-2">
            {{ $t("add_new") }}
        </el-button>
        <el-dialog v-model="confirmDeleteDialog" :title="$t('confirm_deleting')" center align-center>
            <span class="flex justify-center">
                {{
                    confirmDeletingMessage
                        ? confirmDeletingMessage
                        : $t("deleting_item_confirm_default_message")
                }}
            </span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="deleteItem">{{
                        $t("yes")
                        }}</el-button>
                    <el-button plain @click="cancelDeletingItem">
                        {{ $t("cancel") }}
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="confirmMultipleDeleteDialog" :title="$t('confirm_deleting')" center align-center>
            <span class="flex justify-center">
                {{
                    confirmMultipleDeletingMessage
                        ? confirmMultipleDeletingMessage
                        : $t("deleting_items_confirm_default_message")
                }}
            </span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="multipleDelete">{{
                        $t("yes")
                        }}</el-button>
                    <el-button plain @click="cancelMultipleDeleting">
                        {{ $t("cancel") }}
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup generic="S extends BaseService">
import BaseService from "@/services/base";
import { Plus, Delete, Edit, Search } from '@element-plus/icons-vue';
import { diff } from '@/utils/obj';
import Excel from "@/assets/icons/excel.svg";
import Json from "@/assets/icons/json.svg";
import { toExcel } from '@/exporters/xls/xlsx';
import { toJson } from '@/exporters/json/json';
import { getErrorMessage } from '@/utils/error';
const props = defineProps<{
    service: S;
    pageSize?: Number;
    searchable: Boolean;
    multipleSelect: Boolean;
    canDeleteItems: Boolean;
    canEditItems: Boolean;
    canAddItems: Boolean;
    confirmDeletingMessage?: String;
    confirmMultipleDeletingMessage?: String;
    allowExportToExcel: Boolean;
    excelSheetName?: String;
    excelFileName?: String;
    exportFields?: Object;
    allowExportToJson: Boolean;
    jsonFileName?: String;
    disableRowClick?: Boolean;
    service_params?: Record<string, any>;
    approvalButtons?: Boolean;
    cancelButton?: Boolean;
    filter_by?: String;
    customFetchData?:Function;
}>();
const { t } = useI18n();
const route = useRoute();

const loading = ref(false);
const keyword = ref("");
const debouncedKeyword = ref<string>("");
const selectedItems = ref([]);
const error = ref(null);
const deletingItem = ref(null);
const confirmDeleteDialog = ref(false);
const confirmMultipleDeleteDialog = ref(false);

const oauthStore = useOauthStore();
const { tokenInfo } = storeToRefs(oauthStore);

const data = ref({
    page: 1,
    page_size: props.pageSize ? props.pageSize : 0,
    num_pages: 0,
    count: 0,
    results: [],
});




const query = computed(() => {
    const { page, page_size } = data.value;
    let params = {};
    if (page_size && page_size > 0) {
        params = { ...params, page_size };
    }
    if (page && page > 0) {
        params = { ...params, page };
    }
    if (debouncedKeyword.value && debouncedKeyword.value.trim().length > 0) {
        params = { ...params, keyword: debouncedKeyword.value };
    }
    if (props.service_params) {
        params = { ...params, ...props.service_params };
    }
    return params;
});

// Chua check:
const onSelectionChange = (val) => {
    selectedItems.value = val;
};

const onRowClick = (row, column, event) => {
    const { id } = row;
    const { property } = column;
    if (property && id) {
        navigateTo(`${route.path}/${id}`);
    }
};

const onCurrentPageChange = (page) => {
    data.value.page = page;
};

const onDeleteItem = async (item) => {
    deletingItem.value = item;
    confirmDeleteDialog.value = true;
};

const deleteItem = async () => {
    if (!deletingItem.value) {
        return;
    }
    error.value = null;
    const { id } = deletingItem.value
    props.service.delete(id)
        .then((response: any) => {
            const { page, results } = data.value;
            const newResults = results.filter(i => i.id !== id);
            if (newResults.length === 0 && page > 0) {
                data.value.page = page - 1;
            } else {
                data.value.results = newResults;
            }
        })
        .catch((e) => {
            const { data } = e;
            let errorMessage = null;
            if (data) {
                const { error: message, detail } = data;
                errorMessage = message ? message : detail;
            }
            error.value = errorMessage ? errorMessage : t('an_error_occurred');
        })
        .finally(() => {
            confirmDeleteDialog.value = false;
        })
};
const cancelDeletingItem = () => {
    confirmDeleteDialog.value = false;
    deletingItem.value = null;
};

const onMultipleDelete = () => {
    confirmMultipleDeleteDialog.value = true;
};

const multipleDelete = () => {
    const items = selectedItems.value;
    if (!items || items.length == 0) {
        return;
    }
    const ids = items.map(item => item.id);
    error.value = null;
    props.service.multipleDelete(ids)
        .then((response: any) => {
            const { page, results } = data.value;
            const newResults = results.filter(i => ids.indexOf(i.id) == -1);
            if (newResults.length === 0 && page > 0) {
                data.value.page = page - 1;
            } else {
                data.value.results = newResults;
            }
        })
        .catch((e) => {
            const { data } = e;
            let errorMessage = null;
            if (data) {
                const { error: message, detail } = data;
                errorMessage = message ? message : detail;
            }
            error.value = errorMessage ? errorMessage : t('an_error_occurred');
        })
        .finally(() => {
            confirmMultipleDeleteDialog.value = false;
        })
};

const cancelMultipleDeleting = () => {
    confirmMultipleDeleteDialog.value = false;
};
const fetchData = async () => {
    const { page_size } = query.value;
    loading.value = true;
    error.value = null;

    try {
        // Check if a custom fetch function is provided
        if (typeof props.customFetchData === 'function') {
            // Call customFetchData and await its response
            const response = await props.customFetchData(query.value);
            if (page_size) {
                // If paginated, destructure response into pagination data
                const { page, num_pages, count, results } = response;
                data.value = {
                    ...data.value,
                    page,
                    num_pages,
                    count,
                    results
                };
                console.log(1);
                
            } else {
                // Otherwise, just set results
                data.value = {
                    ...data.value,
                    results: response
                };
                console.log(2);
            }
        } else {
            // Fallback to the default service fetch if customFetchData is not provided
            const response = await props.service.gets(query.value);
            if (page_size) {
                const { page, num_pages, count, results } = response;
                data.value = {
                    ...data.value,
                    page,
                    num_pages,
                    count,
                    results
                };
                console.log(3);
            } else {
                data.value = {
                    ...data.value,
                    results: response
                };
                console.log(4);
            }
        }
    } catch (e) {
        // Set error if there's an issue in the fetching process
        error.value = getErrorMessage(e, e.statusCode ? t('an_error_occurred') : t('connection_corrupted'));
    } finally {
        loading.value = false;
    }
};
watch(tokenInfo, () => {
    fetchData();
});

const editItem = (id) => {
    navigateTo(`${route.path}/${id}?edit=true`);
};

const onAdd = () => {
    navigateTo(`${route.path}/new`);
};


const exportToExcel = () => {
    const { results } = data.value;
    if (results) {
        toExcel(
            results,
            props.excelSheetName,
            props.excelFileName,
            props.exportFields,
            t
        );
    }
};

const exportToJson = () => {
    const { results } = data.value;
    if (results) {
        toJson(results, props.jsonFileName);
    }
};

onMounted(() => {
    fetchData();
});

watch(query, async (newValue, oldValue) => {
    const different = diff(newValue, oldValue);
    if (different) {
        fetchData();
    }
});

</script>
<style lang="css" scoped>
table.el-table__header {
    @apply bg-primary
}

.el-table__header-wrapper {
    @apply bg-primary;
}

/* Apply background color to individual header cells */
.el-table th.el-table__cell {
    @apply bg-primary;
    color: white;
    /* Optional: set text color */
}
</style>
