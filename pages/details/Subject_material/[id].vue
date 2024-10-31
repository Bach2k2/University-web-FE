<template>
  <!-- <SubjectMaterialEditor/> -->
</template>

<script setup lang="ts">
import SubjectMaterialService from '@/services/subject_material';
const route = useRoute();
const { t } = useI18n();
definePageMeta({
  layout: 'adminlayout'
});

const SubjectMaterial = ref<any>(null);
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

      SubjectMaterial.value = _cloneDeep(data);
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
