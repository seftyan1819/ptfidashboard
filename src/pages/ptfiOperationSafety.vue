<script setup lang="ts">
  import { useCurrentTime } from '@/composables/useCurrentTime'
  import OperationCard from '@/components/OperationCard.vue'
  import { Doughnut, Line } from 'vue-chartjs'
  import type { ChartData, ChartOptions } from 'chart.js'
  import imgForklift from '@/assets/forklift.png'
  import imgMiner from '@/assets/icon/healthicons_miner-worker.svg'

  const { datetime } = useCurrentTime()

  // forklift usage
  const forkliftUsageProps : InstanceType<typeof OperationCard>['$props'] = {
    title: 'Forklift Usage',
    color: 'primary',
    image: imgForklift,
    amounts: [
      { label: 'Current Unit', value: 6, type: 'outlined' },
      { label: 'Good Condition', value: 6, type: 'outlined' },
      { label: 'Bad Condition', value: 0, type: 'outlined' },
    ],
  }
  const forkliftUsageChartData: ChartData<'line'> = {
    labels: [...Array(7).keys()].map(x => x + 1),
    datasets: [
      {
        label: 'Forklift 1',
        data: [0, 4, 4, 5, 6, 5, 6],
        borderColor: '#48FF06',
        backgroundColor: '#48FF06',
      },
      {
        label: 'Forklift 2',
        data: [1, 5, 5, 6, 7, 6, 7],
        borderColor: '#BE25FF',
        backgroundColor: '#BE25FF',
      },
      {
        label: 'Forklift 3',
        data: [10, 5, 7, 7, 9, 4, 8],
        borderColor: '#4D4194',
        backgroundColor: '#4D4194',
      },
      {
        label: 'Forklift 4',
        data: [3, 7, 8, 8, 7, 7, 9],
        borderColor: '#700101',
        backgroundColor: '#700101',
      },
      {
        label: 'Forklift 5',
        data: [5, 9, 9, 10, 11, 10, 11],
        borderColor: '#06FFFF',
        backgroundColor: '#06FFFF',
      },
    ],
  }
  const forkliftUsageChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: { display: true, text: 'KM' },
        grid: { display: false },
        ticks: { stepSize: 5 },
      },
      x: { title: { display: true, text: 'Day' } },
    },
    plugins: {
      legend: { position: 'bottom' },
    },
  }

  // manpower
  const manpowerProps : InstanceType<typeof OperationCard>['$props'] = {
    title: 'Manpower',
    color: 'amber-darken-1',
    image: imgMiner,
    amounts: [
      { label: 'Total Manpower', value: 35, type: 'outlined' },
      { label: 'Shift 1', value: 14, type: 'separated' },
      { label: 'Shift 2', value: 16, type: 'separated-highlight' },
    ],
  }
  const manpowerChartData: ChartData<'doughnut'> = {
    labels: ['Shift 2', 'Shift 1'],
    datasets: [
      {
        backgroundColor: ['#FFDB0C', '#FFFDC9'],
        data: [16, 14],
      },
    ],
  }
  const manpowerChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    rotation: 90,
    plugins: {
      legend: { position: 'bottom' },
    },
  }
</script>

<template>
  <VContainer>
    <div class="d-flex mb-8">
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
      <VCard class="pa-2 d-flex align-end mr-2" :elevation="4">
        <div class="pa-1 primary-shadow rounded-circle">
          <VImg src="@/assets/icon/mingcute_time-fill.svg" :width="28" />
        </div>
        <div class="text-h4 font-weight-bold text-primary pl-2">5000</div>
        <div class="text-uppercase text-body-2 pl-2 pr-1 pb-1">Hour</div>
      </VCard>
      <VCard class="pa-2 d-flex align-end" :elevation="4">
        <div class="pa-1 error-shadow rounded-circle">
          <VImg src="@/assets/icon/material-symbols_fmd-bad-outline-rounded_error.svg" :width="28" />
        </div>
        <div class="text-h4 font-weight-bold text-error pl-2">0</div>
        <div class="text-uppercase text-body-2 pl-2 pr-1 pb-1">Accident</div>
      </VCard>
      <VSpacer />
      <div>
        <WorkerCard />
      </div>
    </div>

    <VRow>
      <VCol :cols="12" :lg="6">
        <OperationCard v-bind="forkliftUsageProps">
          <template #chart>
            <VCard class="pa-2" rounded="xl">
              <Line
                :data="forkliftUsageChartData"
                :options="forkliftUsageChartOptions"
                style="height: 250px"
              />
            </VCard>
          </template>
        </OperationCard>
      </VCol>
      <VCol :cols="12" :lg="6">
        <OperationCard v-bind="manpowerProps">
          <template #chart>
            <VCard class="pa-2" rounded="xl">
              <Doughnut
                :data="manpowerChartData"
                :options="manpowerChartOptions"
                style="height: 250px"
              />
            </VCard>
          </template>
        </OperationCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
