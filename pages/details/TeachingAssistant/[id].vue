<template>
  <!-- <teachingAssistantEditor/> -->
  <section v-if="teachingAssistant" class="mb-6">
    <h2 class="text-2xl font-bold text-green-600 mb-3">{{ $t('teaching_assistant_info') }}</h2>
    <DetailsCard :title="$t('teaching_assistant_details')">
      <template #labels>
        <p>{{ $t('user_id') }}:</p>
        <p>{{ $t('first_name') }}:</p>
        <p>{{ $t('last_name') }}:</p>
        <p>{{ $t('email') }}:</p>
        <p>{{ $t('roles') }}:</p>
      </template>
      <template #data>
        <p>{{ teachingAssistant.id }}</p>
        <p>{{ teachingAssistant.first_name }}</p>
        <p>{{ teachingAssistant.last_name.title }}</p>
        <p>{{ teachingAssistant.email }}</p>
        <p>{{ teachingAssistant.roles[0].name }}</p>
      </template>
    </DetailsCard>
  </section>
</template>

<script setup lang="ts">
import UserService from '@/services/user';
const route = useRoute();
const { t } = useI18n();
definePageMeta({
  layout: 'adminlayout'
});

const teachingAssistant = ref<any>(null);
const error = ref(null);
const loading = ref(false);

const fetchData = async () => {
  const { id } = route.params;
  console.log('teachingAssistant::', id);
  if (!id) {
    return;
  }
  error.value = null;
  loading.value = true;
  UserService.get(id)
    .then((response) => {
      let data = response;
      console.log(response);

      teachingAssistant.value = _cloneDeep(data);
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
