<template>
    <div class="flex flex-col justify-center pt-20 px-5 gap-2">
        <BackButton />
        <ModelForm v-if="canEdit || (!defaultData && canView)" :title="$t('student_title')" :collapsible="true"
            :service="StudentService" :rules="rules" :default="defaultData" :editable="canEdit" :addFn="addStudent"
            :updateFn="updateStudent" :useParentHandlers="true" :customHandleResponse="customHandleResponse" :nestedFields="['user', 'user.user_detail']">
            <template #default="scope">
                <div class="flex flex-col gap-2">
                    <el-form-item :label="$t('email')" prop="email">
                        <el-input v-if="scope.editing" v-model="scope.current.user.email" :placeholder="$t('email')" />
                        <span v-else>{{ scope.current.user.email }}</span>
                    </el-form-item>

                    <el-form-item :label="$t('first_name')" prop="first_name">
                        <el-input v-if="scope.editing" v-model="scope.current.user.first_name"
                            :placeholder="$t('first_name')" type="text" />
                        <span v-else>{{ scope.current.user.first_name }}</span>
                    </el-form-item>
                    <el-form-item :label="$t('last_name')" prop="last_name">
                        <el-input v-if="scope.editing" v-model="scope.current.user.last_name"
                            :placeholder="$t('first_name')" type="text" />
                        <span v-else>{{ scope.current.user.last_name }}</span>
                    </el-form-item>

                    <!-- Role using pinia -->

                </div>
            </template>
        </ModelForm>
        <span v-else class="text-center">{{ $t('dont_have_permission') }}</span>
    </div>
</template>

<script setup lang="ts">
import { useOauthStore } from '@/stores/oauth';
// import { useServicesStore } from '@/stores/subscriptions/services';
import StudentService from '@/services/student'
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
    return oauthStore.hasOneOfScopes(["admin:students:edit"]);
});
const canView = computed(() => {
    return oauthStore.hasOneOfScopes(["admin:students:view"]);
});

const fetchData = async () => {
    RoleService.fetch()
};

const customHandleResponse = (data:any)=>{
    return StudentService.get(data?.id)
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

// const addStudent = async () => {
//     const user={
//         "email": "teacher3@email.com",
//         "first_name": "Teacher",
//         "last_name": "Three",
//         "is_active": true,
//         "roles_ids": [
//             "edba2a3a-b665-4701-9569-56d3b16b3ab2"
//         ],
//         "user_detail": {
//             "id": "877ca24c-3bff-4294-9c83-2da30d2da3ff",
//             "date_of_birth": "1997-05-15",
//             "degree": "Bachelor of Science in Computer Science",
//             "academic_title": "Software Engineer",
//             "biography": "Passionate about developing innovative software solutions."
//         }
//     }
//     const student = {
//         "user_id": props.defaultData,
//         "enrollment_year": "2023-05-20"
//     }
// }
const addStudent = async (data) => {

    try {
        const studentRole = roleStore.allRoles.data.find((role: any) => role.name === "Student")
        console.log("student role", studentRole);
        const userFormData = {
            ...data.user,
            roles_ids: [studentRole.id],
            is_active: true
        };
        console.log('form_data', userFormData);
        const userResponse = await UserService.create(userFormData);
        console.log('userResponse', userResponse);

        if (userResponse) {
            const studentFormData = {
                user_id: userResponse.id,
                enrollment_year: data.enrollment_year !== null
                    ? data.enrollment_year
                    : new Date().getFullYear()
            };
            const studentResponse = await StudentService.create(studentFormData);
            // const custom
            // customHandleResponse(studentResponse)
            console.log('studentResponse', studentResponse);
            return StudentService.get(studentResponse?.id)
        }

    } catch (error) {
        console.error("Error adding student:", error);
    }
};

const updateStudent = async (data) => {
    try {
        await StudentService.update(data);
    } catch (error) {
        console.error("Error updating student:", error);
    }
};
</script>
