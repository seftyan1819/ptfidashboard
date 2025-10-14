<template>
  <v-container>
    <div class="text-h3 mb-6">Container and Truck Utilization</div>
    <v-row class="ma-n2">
      <!-- Truck -->
      <v-col class="pa-2" :cols="12" :md="6">
        <v-container class="pa-0">
          <v-row class="ma-n2">
            <v-col class="pa-2" :cols="6">
              <div
                :class="['bg-surface-container', 'rounded-lg', 'text-center',
                         'pa-4','h-100', 'd-flex', 'flex-column',
                         'justify-center']"
              >
                <div class="mb-4">Average Daily Truck Usage</div>
                <div class="chart-wrapper">
                  <Pie v-bind="truckDailyUsage" />
                </div>
              </div>
            </v-col>
            <v-col class="pa-2 font-weight-bold" :cols="6">
              <div
                :class="['bg-surface-container', 'rounded-lg', 'text-center',
                         'pa-4','h-100', 'd-flex', 'flex-column',
                         'justify-center']"
              >
                <div>We have {{ truck.conditionGood }} trucks</div>
                <div class="text-uppercase">in Good Condition</div>
                <div class="mt-2">Average in 1 day:</div>
                <div
                  v-for="(tripNum, truckNum, i) in truck.averageTripToTruck"
                  :key="i"
                >
                  {{ truckNum }} Trucks have made {{ tripNum }} trip
                </div>
                <div>
                  <v-icon
                    color="cyan-darken-3"
                    icon="mdi-truck-cargo-container"
                    size="100"
                  />
                </div>
              </div>
            </v-col>
          </v-row>

          <v-row class="mx-n2 my-2">
            <v-col class="pa-2">
              <div class="bg-surface-container rounded-lg text-center pa-4">
                <div class="mb-4">Truck Utilization by Month</div>
                <div class="chart-wrapper">
                  <Pie v-bind="truckUtilizationByMonth" />
                </div>
              </div>
            </v-col>
          </v-row>

          <v-row class="ma-n2">
            <v-col class="pa-2">
              <div class="bg-surface-container rounded-lg text-center pa-4">
                <div class="mb-4">Truck Utilization by Year</div>
                <div class="chart-wrapper">
                  <Pie v-bind="truckUtilizationByYear" />
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <!-- Container -->
      <v-col class="pa-2" :cols="12" :md="6">
        <v-container class="pa-0">
          <v-row class="ma-n2">
            <v-col class="pa-2">
              <div class="bg-surface-container rounded-lg text-center pa-4">
                <div class="mb-4">Container Used for Shipping by Day</div>
                <div class="chart-wrapper">
                  <Line v-bind="containerByDay" />
                </div>
              </div>
            </v-col>
          </v-row>

          <v-row class="mx-n2 my-2">
            <v-col class="pa-2">
              <div class="bg-surface-container rounded-lg text-center pa-4">
                <div class="mb-4">Container Used for Shipping by Month</div>
                <div class="chart-wrapper">
                  <Bar v-bind="containerByMonth" />
                </div>
              </div>
            </v-col>
          </v-row>

          <v-row class="ma-n2">
            <v-col class="pa-2">
              <div class="bg-surface-container rounded-lg text-center pa-4">
                <div class="mb-4">Container Used for Shipping by Year</div>
                <div class="chart-wrapper">
                  <Bar v-bind="containerByYear" />
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'
  import { Bar, Line, Pie } from 'vue-chartjs'
  import colors from 'vuetify/util/colors'

  import type { BarType, LineType, PieType } from '@/types/chartjs'

  const now = dayjs()

  const DAY_NUM = 7
  const MONTH_NUM = 12
  const YEAR_NUM = 5

  const truck = {
    dailyUsage: 17,
    dailyNoUsage: 2,
    conditionGood: 19,
    averageTripToTruck: {
      1: 10,
      2: 7,
    },
  }

  const truckDailyUsage: PieType = {
    data: {
      datasets: [
        {
          data: [truck.dailyUsage, truck.dailyNoUsage],
          backgroundColor: [colors.cyan.darken3, 'white'],
        },
      ],
    },
    options: {
      cutout: '70%',
      responsive: true,
      maintainAspectRatio: false,
      circumference: 180,
      rotation: -90,
      plugins: {
        tooltip: { enabled: false },
        datalabels: {
          display: true,
          color: ['white', colors.cyan.darken3],
        },
      },
    },
  }

  const truckUtilizationByMonth: PieType = {
    data: {
      labels: [...Array(MONTH_NUM).keys()].map(
        x => now.month(0).add(x, 'month').format('MMM YYYY')
      ),
      datasets: [
        {
          data: [137, 134, 133, 127, 127, 127, 125, 122, 118, 116, 108, 107],
          backgroundColor: [
            colors.cyan.darken3,
            colors.green.darken2,
            colors.blue.darken2,
          ],
        },
      ],
    },
    options: {
      cutout: '60%',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 10,
            boxHeight: 10,
          },
        },
        datalabels: {
          display: true,
          color: 'white',
        },
      },
    },
  }

  const truckUtilizationByYear: PieType = {
    data: {
      labels: [...Array(YEAR_NUM).keys()].map(
        x => now.subtract(x, 'year').format('YYYY')
      ),
      datasets: [
        {
          data: [1400, 1350, 1315, 1300, 1215],
          backgroundColor: [
            colors.cyan.darken3,
            colors.green.darken2,
            colors.blue.darken2,
          ],
        },
      ],
    },
    options: {
      cutout: '60%',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 10,
            boxHeight: 10,
          },
        },
        datalabels: {
          display: true,
          color: 'white',
        },
      },
    },
  }

  const containerByDay: LineType = {
    data: {
      labels: [...Array(DAY_NUM).keys()].map(
        x => now.subtract(DAY_NUM - x - 1, 'day').format('dddd')
      ),
      datasets: [
        {
          data: [28, 26, 24, 23, 22, 22, 22],
          borderColor: colors.cyan.darken1,
          backgroundColor: colors.cyan.darken1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
    },
  }

  const containerByMonth: BarType = {
    data: {
      labels: [...Array(MONTH_NUM).keys()].map(
        x => now.subtract(MONTH_NUM - x - 1, 'month').format("MMM 'YY")
      ),
      datasets: [
        {
          data: [172, 172, 166, 160, 156, 155, 154, 150, 149, 145, 135, 128],
          borderColor: colors.cyan.darken1,
          backgroundColor: colors.cyan.darken1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { display: false },
        x: {
          grid: { display: false },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        datalabels: {
          display: true,
          color: 'white',
          rotation: -90,
        },
      },
    },
  }

  const containerByYear: BarType = {
    data: {
      labels: [...Array(YEAR_NUM).keys()].map(
        x => now.subtract(YEAR_NUM - x - 1, 'year').format('YYYY')
      ),
      datasets: [
        {
          data: [1836, 1845, 1901, 1888, 1890],
          borderColor: colors.cyan.darken1,
          backgroundColor: colors.cyan.darken1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { min: 1700 },
        x: {
          grid: { display: false },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        datalabels: {
          display: true,
          color: 'white',
          anchor: 'end',
          align: 'bottom',
        },
      },
    },
  }
</script>

<style lang="sass" scoped>
.chart-wrapper
  height: 200px
</style>
