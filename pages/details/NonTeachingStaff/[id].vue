<template>
  <!-- <UserEditor/> -->
  <section v-if="nonTeachingStaff" class="mb-6">
    <h2 class="text-2xl font-bold text-green-600 mb-3">{{ $t('non_teaching_staff_info') }}</h2>
    <DetailsCard :title="$t('non_teaching_staff_details')">
      <template #labels>
        <p>{{ $t('user_id') }}:</p>
        <p>{{ $t('first_name') }}:</p>
        <p>{{ $t('last_name') }}:</p>
        <p>{{ $t('email') }}:</p>
        <p>{{ $t('roles') }}:</p>
      </template>
      <template #data>
        <p>{{ nonTeachingStaff.id }}</p>
        <p>{{ nonTeachingStaff.first_name }}</p>
        <p>{{ nonTeachingStaff.last_name }}</p>
        <p>{{ nonTeachingStaff.email }}</p>
        <p>
          {{ nonTeachingStaff.roles && nonTeachingStaff.roles.length > 0 ? nonTeachingStaff.roles[0].name :
            $t('no_roles_assigned') }}
        </p>
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

const nonTeachingStaff = ref<any>(null);
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

      nonTeachingStaff.value = _cloneDeep(data);
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
