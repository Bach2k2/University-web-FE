<template>
  <!-- <TeacherEditor/> -->
  <section v-if="teacher" class="mb-6">
    <h2 class="text-2xl font-bold text-green-600 mb-3">{{ $t('teacher_info') }}</h2>
    <DetailsCard :title="$t('teacher_details')">
      <template #labels>
        <p>{{ $t('teacher_id') }}:</p>
        <p>{{ $t('first_name') }}:</p>
        <p>{{ $t('last_name') }}:</p>
        <p>{{ $t('email') }}:</p>
        <p>{{ $t('roles') }}:</p>
      </template>
      <template #data>
        <p>{{ teacher.id }}</p>
        <p>{{ teacher.first_name }}</p>
        <p>{{ teacher.last_name }}</p>
        <p>{{ teacher.email }}</p>
        <p>{{ teacher.roles[0].name }}</p>
      </template>
    </DetailsCard>
  </section>
</template>

<script setup lang="ts">
import UserService from '@/services/user';
const route = useRoute();
const { t } = useI18n();
definePageMeta({
  layout: 'detail'
});

const teacher = ref<any>(null);
const error = ref(null);
const loading = ref(false);

const fetchData = async () => {
  const { id } = route.params;
  console.log('TEACHER::', id);
  if (!id) {
    return;
  }
  error.value = null;
  loading.value = true;
  UserService.get(id)
    .then((response) => {
      let data = response;
      console.log(response);

      teacher.value = _cloneDeep(data);
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
