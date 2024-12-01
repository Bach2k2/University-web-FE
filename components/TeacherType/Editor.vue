<template>
    <div class="flex flex-col justify-center pt-20 px-5 gap-2">
        <BackButton />
        <ModelForm v-if="canEdit || (!defaultData && canView)" :title="$t('teacher_type_title')" :collapsible="true"
            :service="TeacherTypeService" :rules="rules" :default="defaultData" :editable="canEdit" 
             :useParentHandlers="false" :customHandleResponse="customHandleResponse" :nestedFields="['user', 'user.user_detail']">
            <template #default="scope">
                <div class="flex flex-col gap-2">
                    <el-form-item :label="$t('name')" prop="name">
                        <el-input v-if="scope.editing" v-model="scope.current.name" :placeholder="$t('name')" />
                        <span v-else>{{ scope.current.name }}</span>
                    </el-form-item>
                </div>
            </template>
        </ModelForm>
        <span v-else class="text-center">{{ $t('dont_have_permission') }}</span>
    </div>
</template>

<script setup lang="ts">
import { useOauthStore } from '@/stores/oauth';
// import { useServicesStore } from '@/stores/subscriptions/services';
import TeacherTypeService from '@/services/teacher_type'
import UserService from '@/services/user'
import RoleService from '@/services/role'
import { useRolesStore } from '@/stores/roles';
const props = defineProps({
    defaultData: {
        type: Object,
        default: null
    },
});

const { t } = useI18n();

// const servicesStore = useServicesStore();
const oauthStore = useOauthStore();
const roleStore = useRolesStore();
const canEdit = computed(() => {
    return true;
    // return oauthStore.hasOneOfScopes(["admin:teacher_types:edit"]);
});
const canView = computed(() => {
    return true;
    //return oauthStore.hasOneOfScopes(["admin:teacher_types:view"]);
});

const fetchData = async () => {
    RoleService.fetch()
};

const customHandleResponse = (data:any)=>{
    return TeacherTypeService.get(data?.id)
}

const rules = {
    name: [
        { required: true, message: t('validate_error_required'), trigger: 'blur' },
        { min: 1, max: 20, message: t('validate_error_min_max', { min: 1, max: 20 }), trigger: 'blur' },
    ],
    description: [
        { max: 255, message: t('validate_error_min_max', { min: 0, max: 255 }), trigger: 'blur' },
    ],
};

onMounted(() => {
    fetchData();
})


// const addTeacherType = async (data) => {

//     try {
//         const teacher_typeRole = roleStore.allRoles.data.find((role: any) => role.name === "TeacherType")
//         console.log("teacher_type role", teacher_typeRole);
//         const userFormData = {
//             ...data.user,
//             roles_ids: [teacher_typeRole.id],
//             is_active: true
//         };
//         console.log('form_data', userFormData);
//         const userResponse = await UserService.create(userFormData);
//         console.log('userResponse', userResponse);

//         if (userResponse) {
//             const teacher_typeFormData = {
//                 user_id: userResponse.id,
//                 enrollment_year: data.enrollment_year !== null
//                     ? data.enrollment_year
//                     : new Date().getFullYear()
//             };
//             const teacher_typeResponse = await TeacherTypeService.create(teacher_typeFormData);
//             // const custom
//             // customHandleResponse(teacher_typeResponse)
//             console.log('teacher_typeResponse', teacher_typeResponse);
//             return TeacherTypeService.get(teacher_typeResponse?.id)
//         }

//     } catch (error) {
//         console.error("Error adding teacher_type:", error);
//     }
// };

// const updateTeacherType = async (data) => {
//     try {
//         await TeacherTypeService.update(data);
//     } catch (error) {
//         console.error("Error updating teacher_type:", error);
//     }
// };
</script>
