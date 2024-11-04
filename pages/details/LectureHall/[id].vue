<template>
  <!-- <RoomEditor/> -->
  <!-- Room Section -->
  <section v-if="lectureHall" class="mb-6">
    <h2 class="text-2xl font-bold text-green-600 mb-3">{{ $t('lecture_hall_info') }}</h2>
    <DetailsCard :title="$t('lecture_hall_details')">
      <template #labels>
        <p>{{ $t('room_id') }}:</p>
        <p>{{ $t('title') }}:</p>
        <p>{{ $t('room_type') }}:</p>
        <p>{{ $t('capacity') }}:</p>
        <p>{{ $t('location') }}:</p>
      </template>
      <template #data>
        <p>{{ lectureHall.id }}</p>
        <p>{{ lectureHall.title }}</p>
        <p>{{ lectureHall.room_type.title }}</p>
        <p>{{ lectureHall.capacity }}</p>
        <p>{{ lectureHall.location }}</p>
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
  layout: 'detail'
});

const lectureHall = ref<any>(null);
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

      lectureHall.value = _cloneDeep(data);
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
