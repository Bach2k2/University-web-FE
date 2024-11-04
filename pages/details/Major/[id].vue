<template>
  <!-- <MajorEditor/> -->
  <section v-if="major" class="mb-6">
    <h2 class="text-2xl font-bold text-green-600 mb-3">Major Information</h2>
    <DetailsCard title="Major Details">
      <template #labels>
        <p>Major ID:</p>
        <p>Name:</p>
        <p>Department:</p>
        <p>Credit:</p>
        <p>Duration:</p>
        <p>Description:</p>
      </template>
      <template #data>
        <p>{{ major.id }}</p>
        <p>{{ major.name }}</p>
        <p>{{ major.department.name }}</p>
        
        <p>{{ major.more_info.credits }}</p>
        <p>{{ major.more_info.duration  }}</p>
        <p>{{ major.description  }}</p>
      </template>
    </DetailsCard>
  </section>
</template>

<script setup lang="ts">
import MajorService from '@/services/major';
import DetailsCard from '~/components/DetailsCard.vue';
const route = useRoute();
const { t } = useI18n();
definePageMeta({
  layout: 'detail'
});

const major = ref<any>(null);
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
      major.value = _cloneDeep(data);
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
