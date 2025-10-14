<template>
  <v-col class="pa-2" :cols="12" :md="6">
    <div
      :class="['bg-surface-container', 'text-on-surface', 'rounded-lg',
               'text-center', 'pa-2']"
    >
      <div class="text-body-2 mb-2">{{ title }}</div>
      <div class="chart-wrapper">
        <Bar v-bind="barChart" />
      </div>
    </div>
  </v-col>
</template>

<script setup lang="ts">
  import { Bar } from 'vue-chartjs'

  import type { BarType } from '@/types/chartjs'

  defineProps<{
    title: string
    barChart: BarType
  }>()
</script>
