<template>
  <!-- <StudentEditor/> -->
</template>

<script setup lang="ts">
import StudentService from '@/services/student';
import UserService from '@/services/user';
const route = useRoute();
const { t } = useI18n();
definePageMeta({
  layout: 'adminlayout'
});

const User = ref<any>(null);
const Student = ref<any>(null);
const error = ref(null);
const loading = ref(false);

const fetchData = async () => {
  const { id } = route.params;
  console.log('STUDENT::', id);
  if (!id) {
    return;
  }
  error.value = null;
  loading.value = true;
  StudentService.get(id)
    .then((response) => {
      let data = response;
      console.log(response);

      Student.value = _cloneDeep(data);
      //GET USER FROM STUDENT
      UserService.get(Student.value.user_id)
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
      //GET USER FROM STUDENT
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
