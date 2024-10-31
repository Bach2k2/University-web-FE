<template>
    <!-- <MajorEditor/> -->
</template>

<script setup lang="ts">
import MajorService from '@/services/major';
const route = useRoute();
const {t} = useI18n();
definePageMeta({
  layout: 'adminlayout'
});

const Major = ref<any>(null);
const error = ref(null);
const loading = ref(false);

const fetchData = async () => {
  const { id } = route.params;
  console.log('MAJOR::', id);
  if (!id) {
    return;
  }
  error.value = null;
  loading.value = true;
  MajorService.get(id)
    .then((response) => {
      let data = response;
      console.log(response);

      Major.value = _cloneDeep(data);
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
