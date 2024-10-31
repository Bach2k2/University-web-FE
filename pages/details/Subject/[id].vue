<template>
  <!-- <SubjectEditor/> -->
</template>

<script setup lang="ts">
import SubjectService from '@/services/subject';
const route = useRoute();
const { t } = useI18n();
definePageMeta({
  layout: 'adminlayout'
});

const Subject = ref<any>(null);
const error = ref(null);
const loading = ref(false);

const fetchData = async () => {
  const { id } = route.params;
  console.log('SUBJECT::', id);
  if (!id) {
    return;
  }
  error.value = null;
  loading.value = true;
  SubjectService.get(id)
    .then((response) => {
      let data = response;
      console.log(response);

      Subject.value = _cloneDeep(data);
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
