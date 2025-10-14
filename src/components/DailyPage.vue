<template>
  <v-container>
    <div class="text-h3 mb-4">Daily</div>
    <v-container class="pa-1">
      <v-row>
        <v-col
          v-for="(v, i) in summaryValues"
          :key="i"
          class="pa-2"
          :cols="6"
          :md="3"
        >
          <div
            :class="['bg-primary-container', 'text-on-primary-container',
                     'rounded-lg', 'text-center', 'px-3', 'py-6', 'd-flex',
                     'flex-column', 'justify-center', 'h-100']"
          >
            <div class="text-h4">{{ v.value }}</div>
            <p class="text-body-2">{{ v.label }}</p>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="pa-2" :cols="12" :md="8">
          <div
            :class="['bg-surface-container', 'text-on-surface', 'rounded-lg',
                     'text-center', 'pa-2']"
          >
            <div class="text-h6">Outbound Presented</div>
            <div class="chart-wrapper">
              <Line :data="outboundData" :options="outboundOptions" />
            </div>
          </div>
        </v-col>
        <v-col class="pa-2" :cols="12" :md="4">
          <div
            :class="['bg-surface-container', 'text-on-surface', 'rounded-lg',
                     'text-center', 'pa-2']"
          >
            <div class="text-h6 mb-2">Water Consumption (Litre)</div>
            <div class="chart-wrapper">
              <Pie :data="waterConsumtionData" :options="waterConsumtionOptions" />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
  import { Line, Pie } from 'vue-chartjs'

  import type { LineType, PieType } from '@/types/chartjs'

  const summaryValues = [
    { label: 'Outbound 3PL', value: '1315 T' },
    { label: 'Outbound Factory', value: '1415 T' },
    { label: 'Incoming Tonnage', value: '2000 T' },
    { label: 'Rejected Cargo', value: '10 T' },
  ]

  // Outbound Presented
  const outboundData: LineType['data'] = {
    labels: [...Array(15).keys()].map(i => i + 1),
    datasets: [
      {
        label: 'Outbound 3PL',
        data: [15, 16, 14, 15, 15,
               15, 15, 15, 15, 15,
               15, 16, 16, 19, 19].map(i => i * 100),
        borderColor: '#118dff',
      },
      {
        label: 'Outbound Factory',
        data: [16, 15, 15, 15, 15,
               15, 15, 20, 15, 15,
               15, 16, 29, 45, 17].map(i => i * 100),
        borderColor: '#12239e',
      },
    ],
  }
  const outboundOptions: LineType['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  }

  // Water Consumption
  const waterConsumtionData: PieType['data'] = {
    datasets: [
      {
        backgroundColor: ['#118dff', '#12239e', '#118dff', 'white'],
        data: [51, 1, 3, 45].map(i => i * 2),
        borderWidth: 0,
      },
    ],
  }
  const waterConsumtionOptions: PieType['options'] = {
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
    circumference: 180,
    rotation: -90,
    plugins: {
      legend: { display: false },
    },
  }
</script>

<style lang="sass" scoped>
.chart-wrapper
  height: 200px
</style>
