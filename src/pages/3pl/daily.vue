<script setup lang="ts">
  import { useCurrentTime } from '@/composables/useCurrentTime';
  import AmountCard from '@/components/AmountCard.vue';
  import svgRefinery from '@/assets/icon/game-icons_refinery.svg'
  import svgHome from '@/assets/icon/lsicon_warehouse-pre-filled.svg'
  import svgPoint from '@/assets/icon/material-symbols_fmd-bad-outline-rounded.svg'
  import svgTruck from '@/assets/icon/mdi_truck-check-outline.svg'

  const products = [
    'Copper Cathode',
    'Precious Metal',
    'Gold',
  ]
  const { datetime } = useCurrentTime()

  const amounts: InstanceType<typeof AmountCard>['$props'][] = [
    {
      img: svgRefinery,
      title: 'Outbound Factory',
      amount: '2000 T',
    },
    {
      img: svgHome,
      title: 'Incoming Tonnage',
      amount: '1985 T',
      percentage: 99,
      percentageColor: 'primary',
    },
    {
      img: svgPoint,
      title: 'Rejected',
      amount: '15 T',
      percentage: 1,
      percentageColor: 'error',
    },
    {
      img: svgTruck,
      title: 'Outbound 3PL',
      amount: '1700 T',
      percentage: 85,
      percentageColor: 'tertiary',
    },
  ]
</script>

<template>
  <VContainer>
    <div class="d-flex mb-6">
      <div>
        <VSelect
          class="flex-0-1"
          density="compact"
          hide-details="auto"
          :items="products"
          label="Product"
          rounded="pill"
          :width="210"
        />
      </div>
      <div>
        <VTextField
          class="flex-0-1 ml-3"
          density="compact"
          hide-details="auto"
          label="Date"
          rounded="pill"
          type="date"
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
      <VCol v-for="data, idx in amounts" :key="idx">
        <AmountCard v-bind="data" />
      </VCol>
    </VRow>
    <VRow>
      <VCol :md="9">
        <OutboundPresentCard />
      </VCol>
      <VCol :md="3">
        <WaterConsumptionCard class="h-100" />
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
