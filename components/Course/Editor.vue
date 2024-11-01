<template>
    <div class="flex flex-col justify-center pt-20 px-5 gap-2">
        <BackButton />
        <ModelForm v-if="canEdit || (!defaultData && canView)" :title="$t('course_title')" :collapsible="true"
            :service="CourseService" :rules="rules" :default="defaultData" :editable="canEdit" :addFn="addCourse"
            :updateFn="updateCourse" :useParentHandlers="true" :nestedFields="['subject', 'room', 'room.room_type']">
            <template #default="scope">
                <div class="flex flex-col gap-2">

                    <el-form-item :label="$t('subject')" prop="subject">
                        <el-select v-if="scope.editing" collapse-tags value-key="id" v-model="scope.current.subject"
                            :placeholder="$t('pick_roles')">
                            <el-option v-for="item in subjectStore.allSubjects" :key="item.id" :label="item.title"
                                :value="item" />
                        </el-select>
                        <span v-else>
                            {{ scope.current.subject.title }}
                        </span>
                    </el-form-item>

                    <el-form-item :label="$t('room')" prop="room">
                        <el-select v-if="scope.editing" collapse-tags value-key="id" v-model="scope.current.room"
                            :placeholder="$t('pick_roles')">
                            <el-option v-for="item in roomStore.allRooms" :key="item.id" :label="item.title"
                                :value="item" />
                        </el-select>
                        <span v-else>
                            {{ scope.current.room.title }}
                        </span>
                    </el-form-item>


                    <el-form-item :label="$t('title')" prop="title">
                        <el-input v-if="scope.editing" v-model="scope.current.title" :placeholder="$t('title')"
                            type="text" />
                        <span v-else>{{ scope.current.title }}</span>
                    </el-form-item>

                    <!-- <el-form-item :label="$t('start_date')" prop="start_date">
                        <el-date-picker v-if="scope.editing" type="date"
                            :placeholder="$t('pick_a_day')" />
                        <span v-else>{{ scope.current.start_date }}</span>
                    </el-form-item>

                    <el-form-item :label="$t('end_date')" prop="end_date">
                        <el-date-picker v-if="scope.editing" type="date"
                            :placeholder="$t('pick_a_day')" />
                        <span v-else>{{ scope.current.end_date }}</span>
                    </el-form-item> -->

                    <!-- <el-form-item :label="$t('join_date')" prop="end_date">
                        <el-date-picker v-if="scope.editing" v-model="scope.current.end_date" type="date"
                            :placeholder="$t('pick_a_day')" :format="dateFormat" :value-format="dateFormat" />
                        <span v-else>{{ scope.current.end_date }}</span>
                    </el-form-item> -->

                    <!-- Role using pinia -->

                </div>
            </template>
        </ModelForm>
        <span v-else class="text-center">{{ $t('dont_have_permission') }}</span>
    </div>
</template>

<script setup lang="ts">
// import { FORMAT } from '@/utils/time';
import CourseService from '@/services/course'
import SubjectService from '@/services/subject'
import { useSubjectsStore } from '@/stores/subject';
import RoomService from '@/services/room'
import { useRoomsStore } from '@/stores/room';
const props = defineProps({
    defaultData: {
        type: Object,
        default: null
    },
});

const { t } = useI18n();
// const dateFormat = FORMAT.DATE;

const subjectStore = useSubjectsStore();
const roomStore = useRoomsStore();
const canEdit = computed(() => {
    // return oauthStore.hasOneOfScopes(["admin:students:edit"]);
    return true;
});
const canView = computed(() => {
    return true;
});

const fetchData = async () => {
    SubjectService.fetch();
    RoomService.fetch();
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

const addCourse = async (data) => {

    try {
        const formData = {
            ...data,
            is_active: true
        };
        console.log('form_data', formData);
        // const userResponse = await UserService.create(userFormData);
        // console.log('userResponse', userResponse);

        // if (userResponse) {
        //     const studentFormData = {
        //         user_id: userResponse.id,
        //         enrollment_year: data.enrollment_year !== null
        //             ? data.enrollment_year
        //             : new Date().getFullYear()
        //     };
        //     const studentResponse = await StudentService.create(studentFormData);
        //     // const custom
        //     // customHandleResponse(studentResponse)
        //     console.log('studentResponse', studentResponse);
        //     return StudentService.get(studentResponse?.id)
        // }

    } catch (error) {
        console.error("Error adding student:", error);
    }
};

const updateCourse = async (data) => {
    // try {
    //     await StudentService.update(data);
    // } catch (error) {
    //     console.error("Error updating student:", error);
    // }
};
</script>
