<template>
  <!-- <SubjectEditor/> -->
  <section v-if="subject" class="mb-6">
    <h2 class="text-2xl font-bold text-green-600 mb-3">{{ $t('subject_info') }}</h2>
    <DetailsCard :title="$t('subject_details')">
      <template #labels>
        <p>{{ $t('subject_id') }}:</p>
        <p>{{ $t('title') }}:</p>
        <p>{{ $t('credit') }}:</p>
      </template>
      <template #data>
        <p>{{ subject.id }}</p>
        <p>{{ subject.title }}</p>
        <p>{{ subject.credit }}</p>
      </template>
    </DetailsCard>
  </section>
</template>

<script setup lang="ts">
import SubjectService from '@/services/subject';
const route = useRoute();
const { t } = useI18n();
definePageMeta({
  layout: 'adminlayout'
});

const subject = ref<any>(null);
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

      subject.value = _cloneDeep(data);
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
