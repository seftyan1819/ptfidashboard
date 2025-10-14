<script lang="ts">
  import { getGradient } from '@/helpers/chart';
  import type { BarType } from '@/types/chartjs';
  import { Bar } from 'vue-chartjs';

  export type ChartValues = { label: string | number, value: number }[]
</script>

<script setup lang="ts">

  const props = withDefaults(defineProps<{
    title: string
    percentage: number
    values: ChartValues
    xAxisTitle: string
    color?: string
  }>(), {
    color: 'primary',
  })

  const chartColors = ['#0D99FF', '#14AE5C', '#FFDD00', '#ED6C30', '#FFEAEA']
  const chart = computed<BarType>(() => ({
    data: {
      labels: props.values.map(y => y.label),
      datasets: [
        {
          data: props.values.map(y => y.value),
          type: 'line' as 'bar',
          borderColor: 'black',
          borderWidth: 1,
        },
        {
          data: props.values.map(y => y.value),
          backgroundColor: ctx => {
            return getGradient(ctx, chartColors)
          },
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { grid: { display: false }, min: 0, max: 100, ticks: { stepSize: 50, callback: value => value + '%' } },
        x: {
          title: { display: true, text: props.xAxisTitle },
          grid: { display: false },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: item => item.raw + '%' } },
      },
      elements: { point: { radius: 0 } },
    },

  }))
</script>

<template>
  <VCard class="pa-2" :elevation="3">
    <div
      :class="[
        'rounded-xl',
        'elevation-3',
        'text-center',
        `text-${color}`,
        'font-weight-bold',
      ]"
    >
      {{ title }}
    </div>
    <div class="d-flex align-center mt-3">
      <VProgressLinear
        :color="color"
        :height="20"
        :model-value="percentage"
        rounded="pill"
      >
        <template v-if="percentage > 20" #default>
          <div
            class="font-weight-bold text-center mr-auto text-caption text-white"
            :style="{width: percentage + '%'}"
          >
            {{ percentage }}%
          </div>
        </template>
      </VProgressLinear>
      <div class="text-body-2 px-2">100%</div>
    </div>

    <div class="position-relative mt-3">
      <div
        class="rounded-xl border-md mt-2 px-2 pt-2"
        style="height: 140px"
      >
        <Bar v-bind="chart" />
      </div>
      <div
        :class="[
          'position-absolute',
          'bg-surface',
          'text-caption',
          'text-outline',
          'text-center',
          'mx-auto',
          'px-1',
          'mt-n2'
        ]"
        :style="{
          top: 0,
          left: 0,
          right: 0,
          width: 'fit-content',
        }"
      >
        Historical
      </div>
    </div>
  </VCard>
</template>
