<script setup lang="ts">
  import { useCurrentTime } from '@/composables/useCurrentTime';

  const { datetime } = useCurrentTime()
</script>

<template>
  <VContainer>
    <div class="d-flex mb-6">
      <div>
        <VTextField
          class="flex-0-1 input-center"
          density="compact"
          hide-details="auto"
          label="Current Date"
          :model-value="datetime.format('ddd DD/MM/YYYY')"
          readonly
          rounded="pill"
          :width="200"
        />
      </div>
      <div>
        <VTextField
          class="flex-0-1 ml-3 input-center"
          density="compact"
          hide-details="auto"
          label="Current Time"
          :model-value="datetime.format('HH:mm:ss')"
          readonly
          rounded="pill"
          :width="150"
        />
      </div>
    </div>

    <DocumentCard title="SPPB" />
    <DocumentCard class="mt-4" title="WO" />
  </VContainer>
</template>

<style lang="sass" scoped>
  :deep(.v-field__input)
    font-weight: bold
  :deep(.v-table .v-field__input)
    font-weight: normal
</style>
