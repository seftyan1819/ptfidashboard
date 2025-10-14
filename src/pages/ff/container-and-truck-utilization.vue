<script setup lang="ts">
  import { getContainerUtilization, getTruckUtilization, getTruckUtilizationDaily } from '@/api/freightForwarding.api'
  import { useCurrentTime } from '@/composables/useCurrentTime'
  import type { ChartData, ChartOptions } from 'chart.js'
  import { Doughnut, Line } from 'vue-chartjs'

  const { datetime } = useCurrentTime()

  // queries
  const containerDaily = useQuery({
    key: () => ['ff/cont-util/daily'],
    query: async () => await getContainerUtilization('daily'),
  })
  const containerMonthly = useQuery({
    key: () => ['ff/cont-util/monthly'],
    query: async () => await getContainerUtilization('monthly'),
  })
  const containerYearly = useQuery({
    key: () => ['ff/cont-util/yearly'],
    query: async () => await getContainerUtilization('yearly'),
  })
  const truckDaily = useQuery({
    key: () => ['truck/util'],
    query: async () => await getTruckUtilizationDaily(),
  })
  const truckMonthly = useQuery({
    key: () => ['truck/util/monthly'],
    query: async () => await getTruckUtilization('monthly'),
  })
  const truckYearly = useQuery({
    key: () => ['truck/util/yearly'],
    query: async () => await getTruckUtilization('yearly'),
  })

  const containerDailyChart = computed<ChartData<'line'>>(() => ({
    labels: containerDaily.data.value?.chart.map(d => d.label),
    datasets: [
      {
        data: containerDaily.data.value?.chart.map(d => d.value) ?? [0],
        borderColor: '#FF00EA',
        backgroundColor: '#FF00EA',
      },
    ],
  }))
  const containerMonthlyChart = computed<ChartData<'line'>>(() => ({
    labels: containerMonthly.data.value?.chart.map(d => d.label),
    datasets: [
      {
        data: containerMonthly.data.value?.chart.map(d => d.value) ?? [0],
        borderColor: 'black',
        backgroundColor: 'black',
      },
    ],
  }))
  const containerYearlyChart = computed<ChartData<'line'>>(() => ({
    labels: containerYearly.data.value?.chart.map(d => d.label),
    datasets: [
      {
        data: containerYearly.data.value?.chart.map(d => d.value) ?? [0],
        borderColor: '#FF00EA',
        backgroundColor: '#FF00EA',
      },
    ],
  }))

  const getChartOptions = (title: string): ChartOptions<'line'> => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        grid: { display: false },
        title: { display: true, text: 'Trips' },
      },
      x: {
        grid: { display: false },
        title: { display: true, text: title },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  })
  const chartOptions = {
    daily: getChartOptions('Daily'),
    monthly: getChartOptions('Monthly'),
    yearly: getChartOptions('Yearly'),
  }

  // truck
  const truckTripColors = ['#006251', '#26A28C', '#C5E6E1']
  const truckDailyChart = computed<{
    data: ChartData<'doughnut'>
    options: ChartOptions<'doughnut'>
  }>(() => ({
    data: {
      datasets: [
        {
          data: truckDaily.data.value?.todayResults.map(x => x.truckCount) ?? [0],
          backgroundColor: truckTripColors,
        },
      ],
    },
    options: {
      cutout: '70%',
      responsive: true,
      maintainAspectRatio: false,
      circumference: 180,
      rotation: -90,
    },
  }))

  const vehicleColors = [
    '#0000FF',
    '#0D5EFF',
    '#0D99FF',
    '#0DD7FF',
    '#0DFBFF',
    '#0DFFC7',
    '#15FF0D',
    '#DFFF0D',
    '#FFBA0D',
    '#FF5A0D',
  ]
  const truckMonthlyChart = computed<ChartData<'line'>>(() => ({
    labels: truckMonthly.data.value?.chart[0].data.map(d => d.label),
    datasets: truckMonthly.data.value?.chart.map((item, idx) => ({
      label: item.vehicle_id,
      data: item.data.map(d => d.value),
      borderColor: vehicleColors[idx % vehicleColors.length],
      backgroundColor: vehicleColors[idx % vehicleColors.length],
    })) ?? [],
  }))

  const truckYearlyChart = computed<ChartData<'line'>>(() => ({
    labels: truckYearly.data.value?.chart[0].data.map(d => d.label),
    datasets: truckYearly.data.value?.chart.map((item, idx) => ({
      label: item.vehicle_id,
      data: item.data.map(d => d.value),
      borderColor: vehicleColors[idx % vehicleColors.length],
      backgroundColor: vehicleColors[idx % vehicleColors.length],
    })) ?? [],
  }))
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
    </div>

    <VRow>
      <VCol :md="6">
        <VCard class="position-relative overflow-visible px-3 pb-3 pt-8" :elevation="4">
          <div
            :class="[
              'title-center',
              'position-absolute',
              'bg-background',
              'px-2',
              'font-weight-bold',
              'text-h5',
              'text-primary',
            ]"
          >
            Container Utilization
          </div>

          <VRow>
            <VCol>
              <CardWithTitle title="Daily">
                <Line class="util-chart mt-4" :data="containerDailyChart" :options="chartOptions.daily" />
                <ChipDiff
                  class="position-absolute top-0 right-0 pt-2 pr-4"
                  :percentage="containerDaily.data.value?.diff ?? 0"
                  unit="day"
                />
              </CardWithTitle>
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <CardWithTitle title="Monthly">
                <Line class="util-chart mt-4" :data="containerMonthlyChart" :options="chartOptions.monthly" />
                <ChipDiff
                  class="position-absolute top-0 right-0 pt-2 pr-4"
                  :percentage="containerMonthly.data.value?.diff ?? 0"
                  unit="month"
                />
              </CardWithTitle>
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <CardWithTitle title="Yearly">
                <Line class="util-chart mt-4" :data="containerYearlyChart" :options="chartOptions.yearly" />
                <ChipDiff
                  class="position-absolute top-0 right-0 pt-2 pr-4"
                  :percentage="containerYearly.data.value?.diff ?? 0"
                  unit="year"
                />
              </CardWithTitle>
            </VCol>
          </VRow>
        </VCard>
      </VCol>

      <VCol :md="6">
        <VCard class="position-relative overflow-visible px-3 pb-3 pt-8" :elevation="4">
          <div
            :class="[
              'title-center',
              'position-absolute',
              'bg-background',
              'px-2',
              'font-weight-bold',
              'text-h5',
              'text-primary',
            ]"
          >
            Truck Utilization
          </div>

          <VRow>
            <VCol>
              <CardWithTitle title="Daily">
                <div class="d-flex ma-n2">
                  <div class="pa-2">
                    <VImg :height="48" src="@/assets/icon/truck-check.svg" :width="60" />
                  </div>
                  <div class="text-center py-1 pr-2">
                    <div class="text-caption">Truck Owned</div>
                    <div class="text-secondary text-h4 font-weight-bold">{{ truckDaily.data.value?.count }}</div>
                  </div>

                  <div class="bg-outline ma-2" style="width: 1px" />

                  <div class="px-2 my-n2">
                    <Doughnut v-bind="truckDailyChart" style="height: 80px; width: 110px;" />
                  </div>
                  <div class="text-center py-1 pr-2">
                    <div class="text-secondary text-h4 font-weight-bold">{{ truckDaily.data.value?.todayCount }}</div>
                    <div class="text-caption">were used</div>
                  </div>

                  <div>
                    <div v-for="item, idx in truckDaily.data.value?.todayResults" :key="idx">
                      <b>{{ item.truckCount }} truck</b>
                      made
                      <VChip
                        class="font-weight-bold"
                        :color="truckTripColors[idx % truckTripColors.length]"
                        density="comfortable"
                        rounded="pill"
                        size="x-small"
                        variant="flat"
                      >
                        {{ item.tripCount }} Trips
                      </VChip>
                    </div>
                  </div>
                </div>
              </CardWithTitle>
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <CardWithTitle title="Monthly">
                <Line class="util-chart mt-4" :data="truckMonthlyChart" :options="chartOptions.monthly" />
                <ChipDiff
                  class="position-absolute top-0 right-0 pt-2 pr-4"
                  :percentage="truckMonthly.data.value?.diff ?? 0"
                  unit="month"
                />
              </CardWithTitle>
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <CardWithTitle title="Yearly">
                <Line class="util-chart mt-4" :data="truckYearlyChart" :options="chartOptions.yearly" />
                <ChipDiff
                  class="position-absolute top-0 right-0 pt-2 pr-4"
                  :percentage="truckYearly.data.value?.diff ?? 0"
                  unit="year"
                />
              </CardWithTitle>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style lang="sass" scoped>
  .title-center
    top: 0
    left: 50%
    transform: translate(-50%, -50%)

  :deep(.v-field__input)
    font-weight: bold

  .util-chart
    height: 120px
</style>
