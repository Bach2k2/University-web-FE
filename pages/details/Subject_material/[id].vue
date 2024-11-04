<template>
  <!-- <SubjectMaterialEditor/> -->
  <section v-if="subjectMaterial" class="mb-6">
    <h2 class="text-2xl font-bold text-green-600 mb-3">{{ $t('subject_material_info') }}</h2>
    <DetailsCard :title="$t('subject_material_details')">
      <template #labels>
        <p>{{ $t('subject_id') }}:</p>
        <p>{{ $t('title') }}:</p>
        <p>{{ $t('file_path') }}:</p>
        <p>{{ $t('description') }}:</p>
      </template>
      <template #data>
        <p>{{ subjectMaterial.id }}</p>
        <p>{{ subjectMaterial.title }}</p>
        <p>{{ subjectMaterial.file_path }}</p>
        <p>{{ subjectMaterial.description }}</p>
      </template>
    </DetailsCard>
  </section>
</template>

<script setup lang="ts">
import SubjectMaterialService from '@/services/subject_material';
const route = useRoute();
const { t } = useI18n();
definePageMeta({
  layout: 'detail'
});

const subjectMaterial = ref<any>(null);
const error = ref(null);
const loading = ref(false);

const fetchData = async () => {
  const { id } = route.params;
  console.log('SUBJECT_MATERIAL::', id);
  if (!id) {
    return;
  }
  error.value = null;
  loading.value = true;
  SubjectMaterialService.get(id)
    .then((response) => {
      let data = response;
      console.log(response);

      subjectMaterial.value = _cloneDeep(data);
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
