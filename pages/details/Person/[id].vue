<template>
  <!-- <UserEditor/> -->
  <section v-if="person" class="mb-6">
    <h2 class="text-2xl font-bold text-green-600 mb-3">{{ $t('person_info') }}</h2>
    <DetailsCard :title="$t('person_details')">
      <template #labels>
        <p>{{ $t('user_id') }}:</p>
        <p>{{ $t('first_name') }}:</p>
        <p>{{ $t('last_name') }}:</p>
        <p>{{ $t('email') }}:</p>
        <p>{{ $t('roles') }}:</p>
        <p>{{ $t('date_of_birth') }}:</p>
        <p>{{ $t('degree') }}:</p>
        <p>{{ $t('academic_title') }}:</p>
        <p>{{ $t('biography') }}:</p>
      </template>
      <template #data>
        <p>{{ person.id }}</p>
        <p>{{ person.first_name }}</p>
        <p>{{ person.last_name }}</p>
        <p>{{ person.email }}</p>
        <p>{{ person.roles[0].name }}</p>
        <p>{{ person.user_detail.date_of_birth }}</p>
        <p>{{ person.user_detail.degree }}</p>
        <p>{{ person.user_detail.academic_title }}</p>
        <p>{{ person.user_detail.biography }}</p>
      </template>
    </DetailsCard>
  </section>
</template>

<script setup lang="ts">
import UserService from '@/services/user';
const route = useRoute();
const {t} = useI18n();
definePageMeta({
  layout: 'adminlayout'
});

const person = ref<any>(null);
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

      person.value = _cloneDeep(data);
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
