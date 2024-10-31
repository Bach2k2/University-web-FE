<template>
  <!-- <TeacherEditor/> -->
</template>

<script setup lang="ts">
import TeacherService from '@/services/teacher';
import UserService from '@/services/user';
const route = useRoute();
const { t } = useI18n();
definePageMeta({
  layout: 'adminlayout'
});

const User = ref<any>(null);
const Teacher = ref<any>(null);
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
  TeacherService.get(id)
    .then((response) => {
      let data = response;
      console.log(response);

      Teacher.value = _cloneDeep(data);
      //GET USER FROM TEACHER
      UserService.get(Teacher.value.user_id)
        .then((response) => {
          let data = response;
          console.log(response);

          User.value = _cloneDeep(data);
        })
        .catch((e) => {
          error.value = getErrorMessage(e, e.statusCode ? t('an_error_occurred') : t('connection_corrupted'));
        })
        .finally(() => {
          loading.value = false;
        });
      //GET USER FROM TEACHER
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
