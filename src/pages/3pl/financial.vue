<script setup lang="ts">
  import type AmountCard from '@/components/AmountCard.vue'
  import { useCurrentTime } from '@/composables/useCurrentTime'
  import svgWarehouse from '@/assets/icon/lsicon_warehouse-pre-filled.svg'
  import svgShip from '@/assets/icon/uil_ship.svg'
  import svgMoney from '@/assets/icon/tdesign_money.svg'
  import svgPointError from '@/assets/icon/material-symbols_fmd-bad-outline-rounded_error.svg'
  import type { BarType } from '@/types/chartjs'
  import dayjs from 'dayjs'
  import { getGradient } from '@/helpers/chart'
  import type { ChartDataset } from 'chart.js'

  const { datetime } = useCurrentTime()

  const amounts: InstanceType<typeof AmountCard>['$props'][] = [
    {
      img: svgWarehouse,
      title: 'Revenue 3PL',
      amount: '150 M',
      percentage: 70,
      percentageColor: 'secondary',
    },
    {
      img: svgShip,
      title: 'Revenue FF',
      amount: '150  M',
      percentage: 99,
      percentageColor: 'primary',
    },
    {
      img: svgPointError,
      title: 'Outst. Invoice',
      amount: '50 M',
      percentage: 17,
      color: 'error',
      percentageColor: 'error',
    },
    {
      img: svgMoney,
      title: 'Paid Invoice',
      amount: '250 M',
      percentage: 83,
      percentageColor: 'tertiary',
    },
  ]

  const now = dayjs()
  const monthOptions = [...Array(12).keys()]
    .map(i => now.month(0).add(i, 'month').format('MMM'))
  const chartMonthly: BarType = {
    data: {
      labels: monthOptions,
      datasets: [
        {
          type: 'line',
          data: [...Array(12)].map(() => 50),
          borderColor: '#0EFF36',
          borderWidth: 1,
          borderDash: [10, 10],
        } as ChartDataset<'line'> as ChartDataset<'bar'>,
        {
          data: [25, 26, 60, 40, 70],
          type: 'line' as 'bar',
          borderColor: 'black',
          borderWidth: 1,
        },
        {
          data: [25, 26, 60, 40, 70],
          backgroundColor: ctx => {
            return getGradient(ctx, ['#0D99FF'])
          },
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          grid: { display: false },
          ticks: { stepSize: 25, callback: value => value + 'M' },
        },
        x: { title: { display: true, text: 'Month' }, grid: { display: false } },
      },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: item => item.raw + 'M' },
        },
      },
      elements: { point: { radius: 0 } },
    },
  }
  const chartMonthlyDiff = 50
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
      <VCol v-for="data, idx in amounts" :key="idx">
        <AmountCard v-bind="data" />
      </VCol>
    </VRow>
    <VRow>
      <VCol :md="6">
        <BarChartCard
          :chart="chartMonthly"
          title="Revenue FF"
        >
          <template #detail>
            <div class="mt-2 mr-2">
              <VChip
                class="mx-1"
                :color="chartMonthlyDiff >= 0 ? 'primary' : 'error'"
                density="compact"
                rounded="pill"
                size="small"
                :text="(chartMonthlyDiff > 0 ? '+' : '') + chartMonthlyDiff + '%'"
              />
              <span class="text-outline text-caption font-italic">vs last month</span>
            </div>
          </template>

          <template #bottom>
            <div class="text-caption text-outline pl-2">
              <span style="color: #0EFF36">- - -</span> Target
            </div>
          </template>
        </BarChartCard>
      </VCol>
      <VCol :md="6">
        <BarChartCard
          :chart="chartMonthly"
          title="Revenue 3PL"
        >
          <template #detail>
            <div class="mt-2 mr-2">
              <VChip
                class="mx-1"
                :color="chartMonthlyDiff >= 0 ? 'primary' : 'error'"
                density="compact"
                rounded="pill"
                size="small"
                :text="(chartMonthlyDiff > 0 ? '+' : '') + chartMonthlyDiff + '%'"
              />
              <span class="text-outline text-caption font-italic">vs last month</span>
            </div>
          </template>

          <template #bottom>
            <div class="text-caption text-outline pl-2">
              <span style="color: #0EFF36">- - -</span> Target
            </div>
          </template>
        </BarChartCard>
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
