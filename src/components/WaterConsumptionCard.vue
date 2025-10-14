<script setup lang="ts">
  import { Doughnut } from 'vue-chartjs';
  import svgWater from '@/assets/icon/material-symbols-light_water-full-rounded.svg'

  const data = {
    datasets: [
      {
        backgroundColor: ['#0CAEFF', '#C9E8FF'],
        data: [24, 6],
        borderWidth: 0,
      },
    ],
  }
  const options: InstanceType<typeof Doughnut>['$props']['options'] = {
    cutout: '65%',
    responsive: true,
    maintainAspectRatio: false,
    rotation: 90,
    plugins: {
      legend: { display: false },
      tooltip: {
        xAlign: 'center',
        callbacks: {
          label: tooltipItem => {
            return ' ' + tooltipItem.parsed + ' L'
          },
        },
      },
    },
  }
</script>

<template>
  <VCard class="pa-2" :elevation="4">
    <div class="primary-shadow rounded-xl px-4 d-flex align-center mb-6">
      <div>
        <VImg :src="svgWater" :width="36" />
      </div>
      <div class="py-3 pl-2 font-weight-bold">Water Consumption</div>
    </div>
    <div class="position-relative" style="height: 150px">
      <Doughnut
        :data="data"
        :options="options"
      />
      <div
        class="position-absolute"
        :style="{
          top: '50%',
          marginTop: '-15px',
          width: '100%',
          textAlign: 'center',
          color: '#0CAEFF',
          fontWeight: 'bold',
          fontSize: '20px',
        }"
      >
        80%
      </div>
    </div>
    <div class="pt-6 pl-2 text-caption">
      <span
        class="rounded-circle mr-1"
        :style="{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          backgroundColor: data.datasets[0].backgroundColor[1],
        }"
      />
      Target: 30 Liter
    </div>
  </VCard>
</template>
