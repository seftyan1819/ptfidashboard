<script setup lang="ts">
  import { useCurrentTime } from '@/composables/useCurrentTime';
  import KpiCard from '@/components/KpiCard.vue';

  const yearly1 = [
    { label: 2021, value: 100 },
    { label: 2022, value: 90 },
    { label: 2023, value: 90 },
    { label: 2024, value: 85 },
    { label: 2025, value: 85 },
  ]
  const yearly2 = [
    { label: 2021, value: 100 },
    { label: 2022, value: 90 },
    { label: 2023, value: 40 },
    { label: 2024, value: 70 },
    { label: 2025, value: 85 },
  ]
  const items: InstanceType<typeof KpiCard>['$props'][] = [
    {
      title: 'Safety and Environment',
      percentage: 88,
      values: yearly1,
      xAxisTitle: 'Year',
    },
    {
      title: 'On Time Shipment Loading',
      percentage: 95,
      values: yearly2,
      xAxisTitle: 'Year',
      color: 'tertiary',
    },
    {
      title: 'In Full Shipment Loading',
      percentage: 75,
      values: yearly2,
      xAxisTitle: 'Year',
    },
    {
      title: 'Damage Shipment',
      percentage: 95,
      values: yearly2,
      xAxisTitle: 'Year',
    },
    {
      title: 'Shipment Handling Cost Accuracy',
      percentage: 55,
      values: yearly2,
      xAxisTitle: 'Year',
      color: 'tertiary',
    },
    {
      title: 'Government Compliance',
      percentage: 98,
      values: yearly1,
      xAxisTitle: 'Year',
    },
    {
      title: 'PTFI Compliance',
      percentage: 95,
      values: yearly2,
      xAxisTitle: 'Year',
    },
    {
      title: 'Due Diligence and Data Integrity',
      percentage: 55,
      values: yearly2,
      xAxisTitle: 'Year',
      color: 'tertiary',
    },
  ]

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
      <VSpacer />
      <div>
        <WorkerCard />
      </div>
    </div>

    <VRow>
      <VCol
        v-for="item in items"
        :key="item.title"
        :md="4"
        :sm="6"
        :xl="3"
      >
        <KpiCard v-bind="item" />
      </VCol>
    </VRow>
  </VContainer>
</template>

<style lang="sass" scoped>
:deep(.v-field__input)
  font-weight: bold

.input-center :deep(.v-field__input)
  text-align: center
</style>
