<template>
    <div class="flex flex-col justify-center pt-20 px-5 gap-2">
        <BackButton />
        <ModelForm v-if="canEdit || (!defaultData && canView)" :title="$t('student_title')" :collapsible="true"
            :service="StudentService" :rules="rules" :default="defaultData" :editable="canEdit">
            <template #default="scope">
                <div class="flex flex-col gap-2">
                    <el-form-item :label="$t('email')" prop="email">
                        <el-input v-if="scope.editing" v-model="scope.current.user.email"
                            :placeholder="$t('Enter name')" />
                        <span v-else>{{ scope.current.user.email}}</span>
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

                    <el-form-item :label="$t('is_active')" prop="is_active">
                        <el-input v-if="scope.editing" v-model="scope.current.user.is_active"
                            :placeholder="$t('max_num_of_employees')" />
                        <span v-else>{{ scope.current.user.is_active }}</span>
                    </el-form-item>

                    <el-form-item :label="$t('price')" prop="price">
                        <el-input v-if="scope.editing" v-model="scope.current.price" :placeholder="$t('price')" />
                        <span v-else>{{ scope.current.price }}</span>
                    </el-form-item>

                    <el-form-item :label="$t('no_of_trial_days')" prop="no_of_trial_days">
                        <el-input v-if="scope.editing" v-model="scope.current.no_of_trial_days"
                            :placeholder="$t('no_of_trial_days')" />
                        <span v-else>{{ scope.current.no_of_trial_days }}</span>
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

const props = defineProps({
    defaultData: {
        type: Object,
        default: null
    },
});

const { t } = useI18n();

// const servicesStore = useServicesStore();
const oauthStore = useOauthStore();
const canEdit = computed(() => {
    // return oauthStore.hasOneOfScopes(["admin:students:edit"]);
    return true;
});
const canView = computed(() => {
    return true;
});

const fetchData = async () => {
    // ServicePackageService.fetch();
};

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

const addStudent = () => {
    const user={
        "email": "teacher3@email.com",
        "first_name": "Teacher",
        "last_name": "Three",
        "is_active": true,
        "roles_ids": [
            "edba2a3a-b665-4701-9569-56d3b16b3ab2"
        ],
        "user_detail": {
            "id": "877ca24c-3bff-4294-9c83-2da30d2da3ff",
            "date_of_birth": "1997-05-15",
            "degree": "Bachelor of Science in Computer Science",
            "academic_title": "Software Engineer",
            "biography": "Passionate about developing innovative software solutions."
        }
    }
    const student = {
        "user_id": props.defaultData,
        "enrollment_year": "2023-05-20"
    }
}

</script>
