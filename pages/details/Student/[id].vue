<template>
  <!-- <StudentEditor/> -->
  <section v-if="student" class="mb-6">
    <h2 class="text-2xl font-bold text-green-600 mb-3">{{ $t('student_info') }}</h2>
    <DetailsCard :title="$t('student_details')">
      <template #labels>
        <p>{{ $t('student_id') }}:</p>
        <p>{{ $t('first_name') }}:</p>
        <p>{{ $t('last_name') }}:</p>
        <p>{{ $t('email') }}:</p>
        <p>{{ $t('roles') }}:</p>
      </template>
      <template #data>
        <p>{{ student.id }}</p>
        <p>{{ student.first_name }}</p>
        <p>{{ student.last_name.title }}</p>
        <p>{{ student.email }}</p>
        <p>{{ student.roles[0].name }}</p>
      </template>
    </DetailsCard>
  </section>
</template>

<script setup lang="ts">
// import UserService from '@/services/user';
import StudentService from '@/services/student';
const route = useRoute();
const { t } = useI18n();
definePageMeta({
  layout: 'adminlayout'
});

const student = ref<any>(null);
const error = ref(null);
const loading = ref(false);

const fetchData = async () => {
  const { id } = route.params;
  console.log('STUDENT::', id);
  if (!id) {
    return;
  }
  error.value = null;
  loading.value = true;
  StudentService.get(id)
    .then((response) => {
      let data = response;
      console.log(response);

      student.value = _cloneDeep(data);
    })
    .catch((e) => {
      error.value = getErrorMessage(e, e.statusCode ? t('an_error_occurred') : t('connection_corrupted'));
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(() => {
  fetchData();
});

</script>
