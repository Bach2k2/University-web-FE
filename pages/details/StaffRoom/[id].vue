<template>
  <!-- <RoomEditor/> -->
  <section v-if="staffRoom" class="mb-6">
    <h2 class="text-2xl font-bold text-green-600 mb-3">{{ $t('staff_room_info') }}</h2>
    <DetailsCard :title="$t('staff_room_details')">
      <template #labels>
        <p>{{ $t('room_id') }}:</p>
        <p>{{ $t('title') }}:</p>
        <p>{{ $t('room_type') }}:</p>
        <p>{{ $t('capacity') }}:</p>
        <p>{{ $t('location') }}:</p>
      </template>
      <template #data>
        <p>{{ staffRoom.id }}</p>
        <p>{{ staffRoom.title }}</p>
        <p>{{ staffRoom.room_type.title }}</p>
        <p>{{ staffRoom.capacity }}</p>
        <p>{{ staffRoom.location }}</p>
      </template>
    </DetailsCard>
  </section>
</template>

<script setup lang="ts">
import RoomService from '@/services/room';
const route = useRoute();
const { t } = useI18n();
definePageMeta({
  layout: 'adminlayout'
});

const staffRoom = ref<any>(null);
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

      staffRoom.value = _cloneDeep(data);
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
