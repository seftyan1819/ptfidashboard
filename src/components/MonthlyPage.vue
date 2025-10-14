<template>
  <v-container>
    <div class="text-h3 mb-4">{{ title }}</div>
    <v-row class="pa-1">
      <MonthlyBarChart
        :bar-chart="totalCargoTonnage"
        title="Total Cargo Tonnage"
      />
      <MonthlyBarChart
        :bar-chart="cargoTonnageByYears"
        title="Cargo Tonnage by Years"
      />
      <MonthlyBarChart
        :bar-chart="totalShipmentsInCurrentYear"
        :title="`Total Shipments in ${now.year()} by Destination Country`"
      />
      <MonthlyBarChart
        :bar-chart="totalShipmentsInCurrentMonth"
        :title="`Total Shipments in ${now.format('MMMM')} by Destination Country`"
      />
      <v-col class="pa-2" :cols="12">
        <div class="bg-surface-container text-on-surface rounded-lg pa-4">
          <div class="text-body-2 mb-2">List of Shipments in Progress</div>
          <v-row>
            <v-col :cols="8">
              <v-data-table
                density="compact"
                fixed-header
                :headers="shipmentProgressHeaders"
                :height="200"
                hide-default-footer
                :items="shipmentProgressFiltered"
                :items-per-page="-1"
              />
            </v-col>
            <v-col :cols="4">
              <v-checkbox
                v-for="status, i in shipmentStatus"
                :key="i"
                v-model="shipmentStatusSelected"
                density="compact"
                hide-details
                :label="status"
                :value="status"
              />
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import type { Context } from 'chartjs-plugin-datalabels'
  import dayjs from 'dayjs'

  import type { BarType } from '@/types/chartjs'

  withDefaults(defineProps<{
    title?: string
  }>(), {
    title: 'Monthly',
  })

  const now = dayjs()

  const totalCargoTonnage: BarType = {
    data: {
      labels: [...Array(12).keys()]
        .map(i => now.month(11).add(i, 'month').format('MMM')),
      datasets: [{
        label: 'Tonnage',
        data: [
          1890, 1890, 1800, 1800, 1800, 1780, 1700, 1677, 1600, 1560, 1550, 1500,
        ],
        backgroundColor: '#c499ca',
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          title: {
            display: true,
            text: 'Tons',
          },
          grid: { display: false },
          ticks: { display: false },
        },
        x: {
          grid: { display: false },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        datalabels: {
          display: true,
          color: 'black',
          rotation: -90,
        },
      },
    },
  }

  const cargoTonnageByYears: BarType = {
    data: {
      labels: [...Array(5).keys()]
        .map(i => now.add(i, 'year').year()),
      datasets: [{
        data: [20457, 20458, 20647, 20547, 20456],
        backgroundColor: '#a0a7d8',
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 20000,
          title: {
            display: true,
            text: 'Tons',
          },
          grid: { display: false },
        },
        x: {
          grid: { display: false },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        datalabels: {
          display: true,
          anchor: 'end',
          align: 'bottom',
          color: 'white',
        },
      },
    },
  }

  const shipmentStatus = [
    'AT WAREHOUSE',
    'ON THE WAY',
    'POD',
    'PRECEIVED AT THE PORT',
  ]
  const shipmentStatusSelected = ref(shipmentStatus)

  const shipmentProgressHeaders = [
    { value: 'destCountry', title: 'Destination Country' },
    { value: 'shipment', title: 'Shipment' },
    { value: 'status', title: 'Shipment Status' },
  ].map(i => ({ ...i, sortable: true }))
  const shipmentProgress = [
    { destCountry: 'China', shipment: 'Shipment A', status: 'AT WAREHOUSE' },
    { destCountry: 'China', shipment: 'Shipment G', status: 'AT WAREHOUSE' },
    { destCountry: 'Egypt', shipment: 'Shipment R', status: 'AT WAREHOUSE' },
    { destCountry: 'Egypt', shipment: 'Shipment V', status: 'POD' },
    { destCountry: 'China', shipment: 'Shipment A', status: 'AT WAREHOUSE' },
    { destCountry: 'China', shipment: 'Shipment A', status: 'AT WAREHOUSE' },
  ]
  const shipmentProgressFiltered = computed(
    () => shipmentProgress.filter(
      s => shipmentStatusSelected.value.indexOf(s.status) >= 0
    )
  )

  const totalShipmentCountries = [
    'China', 'Malaysia', 'Taiwan', 'Vietnam', 'Thailand', 'Saudi Arabia',
    'Egypt', 'South Korea', 'United Kingdom', 'Turkey', 'Italy', 'Qatar',
  ]
  const totalShipmentsInCurrentYear: BarType = {
    data: {
      labels: totalShipmentCountries,
      datasets: [{
        data: [550, 370, 220, 198, 88, 78, 66, 55, 55, 44, 19, 15],
        backgroundColor: c => {
          const value = Number(c.dataset.data[c.dataIndex])
          if (value >= 100) {
            return '#c499ca'
          } else if (value >= 60) {
            return '#ccac0e'
          } else {
            return '#ca0000'
          }
        },
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          grid: { display: false },
          ticks: { display: false },
        },
        x: {
          grid: { display: false },
          ticks: {
            autoSkip: false,
            minRotation: 30,
            font: { size: 9 },
          },
        },
      },
      plugins: {
        legend: { display: false },
        datalabels: {
          display: true,
          anchor: 'end',
          color: 'black',
          align: (context: Context) => {
            const value = context.dataset.data[context.dataIndex]
            return Number(value) > 500 ? 'bottom' : 'top'
          },
        },
      },
    },
  }

  const totalShipmentsInCurrentMonth: BarType = {
    data: {
      labels: totalShipmentCountries,
      datasets: [{
        data: [67, 32, 22, 19, 8, 7, 6, 5, 5, 4, 0, 0],
        backgroundColor: c => {
          const value = Number(c.dataset.data[c.dataIndex])
          if (value >= 10) {
            return '#c499ca'
          } else if (value >= 7) {
            return '#ccac0e'
          } else {
            return '#ca0000'
          }
        },
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          grid: { display: false },
          ticks: { display: false },
        },
        x: {
          grid: { display: false },
          ticks: {
            autoSkip: false,
            minRotation: 30,
            font: { size: 9 },
          },
        },
      },
      plugins: {
        legend: { display: false },
        datalabels: {
          display: true,
          anchor: 'end',
          color: 'black',
          align: (context: Context) => {
            const value = context.dataset.data[context.dataIndex]
            return Number(value) > 50 ? 'bottom' : 'top'
          },
        },
      },
    },
  }
</script>

<style lang="sass" scoped>
.chart-wrapper
  height: 150px
</style>
