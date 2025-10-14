<template>
  <v-container>
    <div class="text-h3 mb-4">Financial</div>
    <v-row class="ma-n2">
      <v-col class="pa-2" :cols="12" :lg="2" :md="3">
        <v-row class="ma-n2">
          <v-col
            v-for="item, idx in revenues"
            :key="idx"
            class="pa-2"
            :cols="6"
            :md="12"
          >
            <div
              :class="['bg-surface-container', 'text-on-surface', 'rounded-lg',
                       'text-center', 'px-3', 'py-6', 'h-100', 'd-flex',
                       'flex-column', 'justify-center']"
            >
              <div class="text-h4">{{ item.value }}</div>
              <div class="text-body-2">{{ item.title }}</div>
            </div>
          </v-col>
        </v-row>
      </v-col>

      <v-col class="pa-2">
        <v-row class="ma-n2">
          <v-col class="pa-2" :cols="12" :sm="6">
            <div
              :class="['bg-surface-container', 'text-on-surface', 'rounded-lg',
                       'text-center', 'pa-2']"
            >
              <div class="text-body-2 mb-2">Revenue 3PL</div>
              <div class="chart-wrapper">
                <Bar v-bind="revenue3pl" />
              </div>
            </div>
          </v-col>
          <v-col class="pa-2" :cols="12" :sm="6">
            <div
              :class="['bg-surface-container', 'text-on-surface', 'rounded-lg',
                       'text-center', 'pa-2']"
            >
              <div class="text-body-2 mb-2">Revenue FF</div>
              <div class="chart-wrapper">
                <Bar v-bind="revenueFf" />
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row class="mx-n2 mt-2">
          <v-col
            v-for="item, idx in items"
            :key="idx"
            class="pa-2"
            :cols="6"
            :md="3"
          >
            <div
              :class="['bg-surface-container', 'text-on-surface', 'rounded-lg',
                       'text-center', 'px-3', 'py-6', 'h-100', 'd-flex',
                       'flex-column', 'justify-center']"
            >
              <div class="text-h4">{{ item.value }}</div>
              <div class="text-body-2">{{ item.title }}</div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'
  import { Bar } from 'vue-chartjs'

  import type { BarType } from '@/types/chartjs'

  const now = dayjs()
  const data = [
    { month: now.month(0).format('MMMM'), revenue3pl: 1, revenueFf: 1 },
    { month: now.month(1).format('MMMM'), revenue3pl: 1, revenueFf: 1 },
    { month: now.month(2).format('MMMM'), revenue3pl: 1, revenueFf: 1 },
    { month: now.month(3).format('MMMM'), revenue3pl: 1, revenueFf: 1 },
    { month: now.month(4).format('MMMM'), revenue3pl: 1, revenueFf: 1.1 },
    { month: now.month(5).format('MMMM'), revenue3pl: 1, revenueFf: 1.2 },
    { month: now.month(6).format('MMMM'), revenue3pl: 1, revenueFf: 1.3 },
    { month: now.month(7).format('MMMM'), revenue3pl: 1, revenueFf: 1.4 },
    { month: now.month(8).format('MMMM'), revenue3pl: 1.1, revenueFf: 1.5 },
    { month: now.month(9).format('MMMM'), revenue3pl: 1.3, revenueFf: 1.6 },
    { month: now.month(10).format('MMMM'), revenue3pl: 1.5, revenueFf: 1.7 },
    { month: now.month(11).format('MMMM'), revenue3pl: 1.6, revenueFf: 1.7 },
  ]
  const latestData = data[data.length - 1]

  const revenues = [
    { title: 'Revenue 3PL', value: `${latestData.revenue3pl} M` },
    { title: 'Revenue FF', value: `${latestData.revenueFf} M` },
  ]

  const items = [
    { title: 'Outstanding Invoice', value: '1 M' },
    { title: 'Paid Invoice', value: '1 M' },
  ]

  const revenue3pl: BarType = {
    data: {
      datasets: [{ data, backgroundColor: '#118dff' }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      parsing: {
        xAxisKey: 'month',
        yAxisKey: 'revenue3pl',
      },
      scales: {
        y: {
          ticks: {
            stepSize: 0.5,
          },
        },
        x: {
          ticks: {
            autoSkip: false,
            minRotation: 30,
            font: { size: 10 },
          },
        },
      },
      plugins: {
        legend: { display: false },
      },
    },
  }

  const revenueFf: BarType = {
    data: {
      datasets: [{ data, backgroundColor: '#118dff' }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      parsing: {
        xAxisKey: 'month',
        yAxisKey: 'revenueFf',
      },
      scales: {
        y: {
          ticks: {
            stepSize: 0.5,
          },
        },
        x: {
          ticks: {
            autoSkip: false,
            minRotation: 30,
            font: { size: 10 },
          },
        },
      },
      plugins: {
        legend: { display: false },
      },
    },
  }
</script>

<style lang="sass" scoped>
.chart-wrapper
  height: 196px
</style>
