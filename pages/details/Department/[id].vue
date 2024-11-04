<template>
  <!-- <DepartmentEditor/> -->
  <section v-if="department" class="mb-6">
    <h2 class="text-2xl font-bold text-green-600 mb-3">{{ $t('department_info') }}</h2>
    <DetailsCard :title="$t('department_info')">
      <template #labels>
        <p>{{ $t('id') }}</p>
        <p>{{ $t('name') }}:</p>
        <p>{{ $t('head') }}:</p>
        <p>{{ $t('location') }}:</p>
        <p>{{ $t('department_type') }}:</p>
        <p>{{ $t('description') }}:</p>
      </template>
      <template #data>
        <p>{{ department.id }}</p>
        <p>{{ department.name }}</p>
        <p>{{ department.more_info.head }}</p>
        <p>{{ department.more_info.location  }}</p>
        <p>{{ department.department_type }}</p>
        <p>{{ department.description }}</p>
      </template>
    </DetailsCard>
  </section>
</template>

<script setup lang="ts">
import DepartmentService from '@/services/department';
const route = useRoute();
const { t } = useI18n();
definePageMeta({
  layout: 'detail'
});

const department = ref<any>(null);
const error = ref(null);
const loading = ref(false);

const fetchData = async () => {
  const { id } = route.params;
  console.log('DEPARTMENT::', id);
  if (!id) {
    return;
  }
  error.value = null;
  loading.value = true;
  DepartmentService.get(id)
    .then((response) => {
      let data = response;
      console.log(response);

      department.value = _cloneDeep(data);
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
