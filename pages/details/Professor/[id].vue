<template>
  <!-- <TeacherEditor/> -->
  <section v-if="professor" class="mb-6">
    <h2 class="text-2xl font-bold text-green-600 mb-3">{{ $t('professor_info') }}</h2>
    <DetailsCard :title="$t('professor_details')">
      <template #labels>
        <p>{{ $t('professor_id') }}:</p>
        <p>{{ $t('first_name') }}:</p>
        <p>{{ $t('last_name') }}:</p>
        <p>{{ $t('email') }}:</p>
        <p>{{ $t('roles') }}:</p>
      </template>
      <template #data>
        <p>{{ professor.id }}</p>
        <p>{{ professor.first_name }}</p>
        <p>{{ professor.last_name }}</p>
        <p>{{ professor.email }}</p>
        <p>{{ professor.roles[0].name }}</p>
      </template>
    </DetailsCard>
  </section>
</template>

<script setup lang="ts">
import UserService from '@/services/user';
const route = useRoute();
const { t } = useI18n();
definePageMeta({
  layout: 'adminlayout'
});

const professor = ref<any>(null);
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

      professor.value = _cloneDeep(data);
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
