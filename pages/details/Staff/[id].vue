<template>
  <!-- <UserEditor/> -->
  <section v-if="staff" class="mb-6">
    <h2 class="text-2xl font-bold text-green-600 mb-3">{{ $t('staff_info') }}</h2>
    <DetailsCard :title="$t('staff_details')">
      <template #labels>
        <p>{{ $t('staff_id') }}:</p>
        <p>{{ $t('first_name') }}:</p>
        <p>{{ $t('last_name') }}:</p>
        <p>{{ $t('email') }}:</p>
        <p>{{ $t('roles') }}:</p>
      </template>
      <template #data>
        <p>{{ staff.id }}</p>
        <p>{{ staff.first_name }}</p>
        <p>{{ staff.last_name }}</p>
        <p>{{ staff.email }}</p>
        <p>{{ staff.roles[0].name }}</p>
      </template>
    </DetailsCard>
  </section>
</template>

<script setup lang="ts">
import UserService from '@/services/user';
const route = useRoute();
const { t } = useI18n();
definePageMeta({
  layout: 'detail'
});

const staff = ref<any>(null);
const error = ref(null);
const loading = ref(false);

const fetchData = async () => {
  const { id } = route.params;
  console.log('PERSON::', id);
  if (!id) {
    return;
  }
  error.value = null;
  loading.value = true;
  UserService.get(id)
    .then((response) => {
      let data = response;
      console.log(response);

      staff.value = _cloneDeep(data);
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
