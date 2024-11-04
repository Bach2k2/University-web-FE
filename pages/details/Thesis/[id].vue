<template>
  <section v-if="thesis" class="mb-6">
    <h2 class="text-2xl font-bold text-green-600 mb-3">{{ $t('thesis_info') }}</h2>
    <DetailsCard :title="$t('thesis_details')">
      <template #labels>
        <p>{{ $t('thesis_id') }}:</p>
        <p>{{ $t('author') }}:</p>
        <p>{{ $t('title') }}:</p>
        <p>{{ $t('description') }}:</p>
        <p>{{ $t('submission_date') }}:</p>
      </template>
      <template #data>
        <p>{{ thesis.id }}</p>
        <p>{{ thesis.user?.first_name }} {{ thesis.user?.last_name }}</p>
        <p>{{ thesis.title }}</p>
        <p>{{ thesis.description }}</p>
        <p>{{ thesis.submission_date }}</p>
      </template>
    </DetailsCard>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ThesisService from '@/services/thesis';
import UserService from '@/services/user';
import { useI18n } from 'vue-i18n';
import { getErrorMessage } from '@/utils/error'; // Adjust the import based on your project structure

const route = useRoute();
const { t } = useI18n();
definePageMeta({
  layout: 'detail'
});

const thesis = ref<any>(null);
const error = ref(null);
const loading = ref(false);

const fetchData = async () => {
  const { id } = route.params;
  console.log('THESIS::', id);
  if (!id) {
    return;
  }
  error.value = null;
  loading.value = true;

  try {
    const thesisResponse = await ThesisService.get(id);
    thesis.value = _cloneDeep(thesisResponse);

    // Fetch user information for the thesis
    const userResponse = await UserService.get(thesisResponse.user_id);
    thesis.value.user = userResponse;
    console.log(thesis.value);
    
  } catch (e:any) {
    error.value = getErrorMessage(e, e.statusCode ? t('an_error_occurred') : t('connection_corrupted'));
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>
