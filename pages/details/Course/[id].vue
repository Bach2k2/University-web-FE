<template>
  <!-- <CourseEditor/> -->
  <section v-if="course" class="mb-6">
    <h2 class="text-2xl font-bold text-green-600 mb-3">{{ $t('course_info') }}</h2>
    <DetailsCard :title="$t('course_info')">
      <template #labels>
        <p>{{ $t('id') }}</p>
        <p>{{ $t('title') }}:</p>
        <p>{{ $t('subject') }}:</p>
        <p>{{ $t('credit') }}:</p>
        <p>{{ $t('room') }}:</p>
        <p>{{ $t('start_date') }}:</p>
        <p>{{ $t('end_date') }}:</p>
      </template>
      <template #data>
        <p>{{ course.id }}</p>
        <p>{{ course.title }}</p>
        <p>{{ course.subject.title }}</p>
        <p>{{ course.subject.credit }}</p>
        <p>{{ course.room.title }}</p>
        <p>{{ course.start_date }}</p>
        <p>{{ course.end_date }}</p>
      </template>
    </DetailsCard>
  </section>
</template>

<script setup lang="ts">
import CourseService from '@/services/course';
const route = useRoute();
const { t } = useI18n();
definePageMeta({
  layout: 'adminlayout'
});

const course = ref<any>(null);
const error = ref(null);
const loading = ref(false);

const fetchData = async () => {
  const { id } = route.params;
  console.log('COURSE::', id);
  if (!id) {
    return;
  }
  error.value = null;
  loading.value = true;
  CourseService.get(id)
    .then((response) => {
      let data = response;
      console.log(response);

      course.value = _cloneDeep(data);
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
