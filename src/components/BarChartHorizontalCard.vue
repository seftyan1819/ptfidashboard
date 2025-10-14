<script setup lang="ts">
  import svgBarChart from '@/assets/icon/noto-v1_bar-chart.svg'
  import type { BarType } from '@/types/chartjs';
  import { Bar } from 'vue-chartjs';

  defineProps<{
    title: string
    chart: BarType
    loading?: boolean
    disabled?: boolean
  }>()
</script>

<template>
  <VCard class="pa-2" :elevation="4" :loading="loading">
    <div class="d-flex pa-1">
      <div class="text-left text-body-2">
        <slot name="detail" />
      </div>
    </div>

    <div v-if="!disabled" class="pa-2" style="height: 400px">
      <Bar v-bind="chart" />
    </div>
    <div v-else class="pa-2">No Data</div>
    <slot name="bottom" />
  </VCard>
</template>
