<script setup lang="ts">
  import { getGradient } from '@/helpers/chart';
  import type { BarType } from '@/types/chartjs';
  import dayjs from 'dayjs';

  const products = [
    'Copper Cathode',
    'Precious Metal',
    'Gold',
  ]
  const stages = [
    'Outbound Factory',
    'Incoming Tonnage',
    'Outbound 3PL',
  ]

  const now = dayjs()
  const monthOptions = [...Array(12).keys()]
    .map(i => now.month(11).add(i, 'month').format('MMM'))
  const yearOptions = [...Array(5).keys()].map(i => 2021 + i)

  const chartMonthly: BarType = {
    data: {
      labels: monthOptions,
      datasets: [
        {
          label: 'Tonnage',
          data: [1200, 1500, 1300, 800, 1500],
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
        y: { title: { display: true, text: 'Tons' }, grid: { display: false } },
        x: { title: { display: true, text: 'Month' }, grid: { display: false } },
      },
      plugins: { legend: { display: false } },
    },
  }
  const chartMonthlyDiff = 5

  const chartYearly: BarType = {
    data: {
      labels: yearOptions,
      datasets: [
        {
          label: 'Tonnage',
          data: [50000, 145000, 40000, 80000, 50000],
          backgroundColor: ctx => {
            return getGradient(ctx, ['#0D99FF', '#14AE5C', '#FFDD00', '#ED6C30', '#FFEAEA'])
          },
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { title: { display: true, text: 'Tons' }, grid: { display: false } },
        x: { title: { display: true, text: 'Year' }, grid: { display: false } },
      },
      plugins: { legend: { display: false } },
    },
  }
  const chartYearlyDiff = -5

  const dummyDestinationData: { code: string, total: number, color: string }[] = [
    { code: 'INA', total: 6000, color: '#0000FF' },
    { code: 'GUA', total: 5000, color: '#0D5EFF' },
    { code: 'HOU', total: 4500, color: '#0D99FF' },
    { code: 'ITA', total: 3000, color: '#0DD7FF' },
    { code: 'MLY', total: 2800, color: '#0DFBFF' },
    { code: 'VIE', total: 2500, color: '#0DFFC7' },
    { code: 'SIN', total: 2000, color: '#15FF0D' },
    { code: 'THA', total: 1200, color: '#DFFF0D' },
    { code: 'EGY', total: 900, color: '#FFBA0D' },
    { code: 'QAT', total: 800, color: '#FF5A0D' },
  ]
  const chartDestinationColors = dummyDestinationData.map(d => d.color)
  const chartDestinationMonthly: BarType = {
    data: {
      labels: dummyDestinationData.map(d => d.code),
      datasets: [
        {
          data: dummyDestinationData.map(d => d.total),
          backgroundColor: ctx => {
            return getGradient(ctx, chartDestinationColors)
          },
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { title: { display: true, text: 'Tons' }, grid: { display: false } },
        x: { title: { display: true, text: 'Country' }, grid: { display: false } },
      },
      plugins: { legend: { display: false } },
    },
  }
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
      <div class="ml-3">
        <VSelect
          class="flex-0-1"
          density="compact"
          hide-details="auto"
          :items="stages"
          label="Stage"
          rounded="pill"
          :width="210"
        />
      </div>
      <VSpacer />
      <div>
        <WorkerCard />
      </div>
    </div>

    <VRow>
      <VCol :md="6">
        <BarChartCard
          :chart="chartMonthly"
          title="Total Cargo Tonnages Monthly"
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
        </BarChartCard>
      </VCol>
      <VCol :md="6">
        <BarChartCard
          :chart="chartYearly"
          title="Total Cargo Tonnages Yearly"
        >
          <template #detail>
            <div class="mt-2 mr-2">
              <VChip
                class="mx-1"
                :color="chartYearlyDiff >= 0 ? 'primary' : 'error'"
                density="compact"
                rounded="pill"
                size="small"
                :text="(chartYearlyDiff > 0 ? '+' : '') + chartYearlyDiff + '%'"
              />
              <span class="text-outline text-caption font-italic">vs last year</span>
            </div>
          </template>
        </BarChartCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol :md="6">
        <BarChartCard
          :chart="chartDestinationMonthly"
          title="Top 10 Total Cargo Tonnages by Destination"
        >
          <template #detail>
            <div class="mt-2 mr-2">
              <VSelect
                class="flex-0-1"
                density="compact"
                hide-details="auto"
                :items="monthOptions"
                label="Month"
                rounded="pill"
                :width="120"
              />
            </div>
          </template>
        </BarChartCard>
      </VCol>
      <VCol :md="6">
        <BarChartCard
          :chart="chartDestinationMonthly"
          title="Top 10 Total Cargo Tonnages by Destination"
        >
          <template #detail>
            <div class="mt-2 mr-2">
              <VSelect
                class="flex-0-1"
                density="compact"
                hide-details="auto"
                :items="yearOptions"
                label="Year"
                rounded="pill"
                :width="120"
              />
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
</style>
