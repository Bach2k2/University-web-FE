<template>
  <!-- <RoomEditor/> -->
  <!-- Room Section -->
  <section v-if="library" class="mb-6">
    <h2 class="text-2xl font-bold text-green-600 mb-3">{{ $t('library_info') }}</h2>
    <DetailsCard :title="$t('library_details')">
      <template #labels>
        <p>{{ $t('room_id') }}:</p>
        <p>{{ $t('title') }}:</p>
        <p>{{ $t('room_type') }}:</p>
        <p>{{ $t('capacity') }}:</p>
        <p>{{ $t('location') }}:</p>
      </template>
      <template #data>
        <p>{{ library.id }}</p>
        <p>{{ library.title }}</p>
        <p>{{ library.room_type.title }}</p>
        <p>{{ library.capacity }}</p>
        <p>{{ library.location }}</p>
      </template>
    </DetailsCard>
  </section>
</template>

<script setup lang="ts">
import RoomService from '@/services/room';
import DetailsCard from '~/components/DetailsCard.vue';
const route = useRoute();
const { t } = useI18n();
definePageMeta({
  layout: 'adminlayout'
});

const library = ref<any>(null);
const error = ref(null);
const loading = ref(false);

const fetchData = async () => {
  const { id } = route.params;
  console.log('ROOM::', id);
  if (!id) {
    return;
  }
  error.value = null;
  loading.value = true;
  RoomService.get(id)
    .then((response) => {
      let data = response;
      console.log(response);

      library.value = _cloneDeep(data);
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
