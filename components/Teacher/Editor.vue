<template>
    <div class="flex flex-col justify-center pt-20 px-5 gap-2">
        <BackButton />
        <ModelForm 
            v-if="canEdit || (!defaultData && canView)" 
            :title="$t('teacher_title')" 
            :collapsible="true"
            :service="TeacherService" 
            :rules="rules" 
            :default="defaultData" 
            :editable="canEdit" 
            :addFn="addTeacher"
            :updateFn="updateTeacher" 
            :useParentHandlers="true" 
            :customHandleResponse="customHandleResponse" 
            :nestedFields="['user', 'user.user_detail']"
        >
            <template #default="scope">
                <div class="flex flex-col gap-2">
                    <!-- User Details -->
                    <el-form-item :label="$t('email')" prop="email">
                        <el-input 
                            v-if="scope.editing" 
                            v-model="scope.current.user.email" 
                            :placeholder="$t('email')" 
                        />
                        <span v-else>{{ scope.current.user.email }}</span>
                    </el-form-item>
                    <el-form-item :label="$t('first_name')" prop="first_name">
                        <el-input 
                            v-if="scope.editing" 
                            v-model="scope.current.user.first_name" 
                            :placeholder="$t('first_name')" 
                        />
                        <span v-else>{{ scope.current.user.first_name }}</span>
                    </el-form-item>
                    <el-form-item :label="$t('last_name')" prop="last_name">
                        <el-input 
                            v-if="scope.editing" 
                            v-model="scope.current.user.last_name" 
                            :placeholder="$t('last_name')" 
                        />
                        <span v-else>{{ scope.current.user.last_name }}</span>
                    </el-form-item>
    
                    <!-- Teacher Type -->
                    <el-form-item :label="$t('teacher_type')" prop="teacher_type">
                        <el-select 
                            v-if="scope.editing" 
                            v-model="scope.current.teacher_type" 
                            :options="teacherTypesStore.allTeacherTypes" 
                            placeholder="Select Teacher Type"
                        />
                        <span v-else>{{ scope.current.teacher_type.name }}</span>
                    </el-form-item>
    
                    <!-- Departments -->
                    <el-form-item :label="$t('departments')" prop="departments">
                        <el-select 
                            v-if="scope.editing" 
                            v-model="scope.current.department_ids" 
                            multiple 
                            :options="departmentStore.allDepartments" 
                            placeholder="Select Departments"
                        />
                        <ul v-else>
                            <li v-for="department in scope.current.departments" :key="department.id">
                                {{ department.name }} ({{ department.department_type }})
                            </li>
                        </ul>
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
import TeacherService from '@/services/teacher'
import UserService from '@/services/user'
import RoleService from '@/services/role'
import TeacherTypeService from '@/services/teacher_type'
import DepartmentService from '@/services/department'
import { useRolesStore } from '@/stores/roles';
import { useDepartmentsStore } from "~/stores/departments";
import { useTeacherTypesStore } from '~/stores/teacher_types';
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

const departmentStore = useDepartmentsStore();
const teacherTypesStore = useTeacherTypesStore();

const canEdit = computed(() => {
    return oauthStore.hasOneOfScopes(["admin:teachers:edit"]);
});
const canView = computed(() => {
    return oauthStore.hasOneOfScopes(["admin:teachers:view"]);
});

const fetchData = async () => {
    RoleService.fetch()
};

const customHandleResponse = (data:any)=>{
    return TeacherService.get(data?.id)
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
    DepartmentService.fetch(true)
    TeacherTypeService.fetch(true)
})

// const addTeacher = async () => {
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
//     const teacher = {
//         "user_id": props.defaultData,
//         "enrollment_year": "2023-05-20"
//     }
// }
const addTeacher = async (data) => {

    try {
        const teacherRole = roleStore.allRoles.data.find((role: any) => role.name === "Teacher")
        console.log("teacher role", teacherRole);
        const userFormData = {
            ...data.user,
            roles_ids: [teacherRole.id],
            is_active: true
        };
        console.log('form_data', userFormData);
        const userResponse = await UserService.create(userFormData);
        console.log('userResponse', userResponse);

        if (userResponse) {
            const teacherFormData = {
                user_id: userResponse.id,
                enrollment_year: data.enrollment_year !== null
                    ? data.enrollment_year
                    : new Date().getFullYear()
            };
            const teacherResponse = await TeacherService.create(teacherFormData);
            // const custom
            // customHandleResponse(teacherResponse)
            console.log('teacherResponse', teacherResponse);
            return TeacherService.get(teacherResponse?.id)
        }

    } catch (error) {
        console.error("Error adding teacher:", error);
    }
};

const updateTeacher = async (data) => {
    try {
        await TeacherService.update(data);
    } catch (error) {
        console.error("Error updating teacher:", error);
    }
};
</script>
