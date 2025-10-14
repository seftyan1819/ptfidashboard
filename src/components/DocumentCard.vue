<script setup lang="ts">
  import type { ChartData, ChartOptions } from 'chart.js';
  import { Line } from 'vue-chartjs';
  import type { VDataTable } from 'vuetify/components';

  defineProps<{ title: string }>()

  const filterOptions = ['Last Status', 'Booking Request']
  const sortByOptions = ['Newest', 'Oldest']

  const headers : InstanceType<typeof VDataTable>['$props']['headers'] = [
    { value: 'year', title: 'Year' },
    { value: 'month', title: 'Month' },
    { value: 'day', title: 'Day' },
    { value: 'outstanding', title: 'Outstanding', align: 'end' },
    { value: 'sppb', title: 'SPPB', align: 'end' },
  ]
  const chartData: ChartData<'line'> = {
    labels: [...Array(7).keys()].map(x => x + 1),
    datasets: [
      {
        label: 'SPPB',
        data: [5, 9, 9, 10, 11, 10, 11].map(x => x * 6),
        borderColor: '#0CAEFF',
        backgroundColor: '#0CAEFF',
      },
      {
        label: 'Outstanding',
        data: [0, 4, 4, 5, 6, 5, 6].map(x => x * 6),
        borderColor: '#FF0000',
        backgroundColor: '#FF0000',
      },
    ],
  }
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        grid: { display: false },
        ticks: { stepSize: 50 },
      },
    },
    plugins: {
      legend: { position: 'right', align: 'end' },
    },
  }
</script>

<template>
  <VCard :elevation="4">
    <VCardText>
      <VRow>
        <VCol :cols="6">
          <div class="d-flex">
            <VSelect
              density="compact"
              hide-details="auto"
              :items="filterOptions"
              label="Filter by"
              :model-value="filterOptions[0]"
              rounded="pill"
            />
            <VSelect
              class="pl-3"
              density="compact"
              hide-details="auto"
              :items="sortByOptions"
              label="Sort by"
              :model-value="sortByOptions[0]"
              rounded="pill"
            />
            <VSpacer />
          </div>
          <VDataTable
            class="mt-3"
            density="compact"
            fixed-header
            :header-props="{ class: 'font-weight-bold text-primary' }"
            :headers="headers"
            :height="160"
          />
        </VCol>
        <VCol :cols="6">
          <p class="text-h4 text-primary font-weight-bold">{{ title }}</p>
          <div class="mt-4">
            <Line
              :data="chartData"
              :options="chartOptions"
              style="height: 210px"
            />
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
