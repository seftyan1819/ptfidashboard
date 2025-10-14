<template>
  <v-container>
    <div class="text-h3 mb-4">Operation and Safety</div>
    <v-row class="ma-n2">
      <v-col class="pa-2" :cols="12" :md="6">
        <v-row class="ma-n2">
          <v-col class="pa-2">
            <div
              :class="['bg-surface-container', 'text-on-surface', 'pa-4',
                       'rounded-lg']"
            >
              <v-row class="text-body-2">
                <v-col :cols="4">
                  <div>We currently have</div>
                  <div class="d-flex align-center text-deep-purple">
                    <span class="text-h4 mx-2">{{ forkliftCount.total }}</span>
                    <span>forklifts</span>
                  </div>
                  <div>to be monitored regularly</div>
                </v-col>
                <v-col class="pa-0" :cols="3">
                  <v-img id="img-forklift" class="h-100" :src="forkliftImage" />
                </v-col>
                <v-col :cols="5">
                  <div>Overal Conclusion</div>
                  <div class="d-flex align-center text-blue">
                    <div class="text-h4 mr-2">{{ forkliftCount.good }}</div>
                    <div>forklifts are in <br> GOOD CONDITION</div>
                  </div>
                  <div class="d-flex align-center text-purple">
                    <div class="text-h4 mr-2">{{ forkliftCount.maintenance }}</div>
                    <div>forklifts is <br> UNDER MAINTENANCE</div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>

        <v-row class="mx-n2 mt-2 mb-n2">
          <v-col class="pa-2">
            <div
              :class="['bg-surface-container', 'text-on-surface', 'pa-4',
                       'rounded-lg']"
            >
              <div class="text-body-1 mb-2">Forklifts' Daily Usage in Kilometers</div>
              <div class="forklift-chart-wrapper">
                <Line v-bind="forkliftDailyUsage" />
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>

      <v-col class="pa-2">
        <v-row class="ma-n2">
          <v-col class="pa-2">
            <div
              :class="['bg-surface-container', 'text-on-surface', 'rounded-lg',
                       'pa-4']"
            >
              <v-row>
                <v-col class="text-body-1" :cols="6">
                  <div class="text-primary">Total Manpower</div>
                  <div class="text-primary text-h3 font-weight-bold ml-10">
                    {{ manpower.total }}
                  </div>
                  <div class="text-light-blue-lighten-1 text-h4 font-weight-bold mt-4">
                    {{ manpower.shift1 }} workers
                  </div>
                  <div>
                    are now working at
                    <br>
                    {{ manpower.shift1Start }} to {{ manpower.shift1End }}
                  </div>
                  <div class="text-blue-darken-1 text-h4 font-weight-bold mt-4">
                    {{ manpower.shift2 }} workers
                  </div>
                  <div>
                    are now working at
                    <br>
                    {{ manpower.shift2Start }} to {{ manpower.shift2End }}
                  </div>
                </v-col>
                <v-col :cols="6">
                  <div class="manpower-chart-wrapper">
                    <Pie v-bind="manpowerShift" />
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>

        <v-row class="mx-n2 mt-2 mb-n2">
          <v-col class="pa-2">
            <div class="bg-surface-container rounded-lg text-center pa-4">
              <div class="text-blue-darken-1">
                <div class="text-h3 font-weight-bold">
                  {{ manpower.hour.toLocaleString('id') }}
                </div>
                <div>Hour</div>
              </div>
            </div>
          </v-col>
          <v-col class="pa-2">
            <div class="bg-surface-container rounded-lg text-center pa-4">
              <div class="text-deep-purple-lighten-2">
                <div class="text-h3 font-weight-bold">
                  {{ manpower.accident.toLocaleString('id') }}
                </div>
                <div>Accident This Year</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { Line, Pie } from 'vue-chartjs'

  import colors from 'vuetify/util/colors'

  import forkliftImage from '@/assets/forklift.png'
  import type { LineType, PieType } from '@/types/chartjs'

  const forkliftCount = {
    total: 6,
    good: 6,
    maintenance: 0,
  }

  const forkliftDailyUsage: LineType = {
    data: {
      labels: ['13/5/24', '14/5/24', '16/5/24', '17/5/24', '18/5/24'],
      datasets: [
        {
          label: 'FL 6',
          data: [51, 51, 60, 51, 54],
          borderColor: colors.purple.base,
          backgroundColor: colors.purple.base,
        },
        {
          label: 'FL 5',
          data: [60, 65, 67, 49, 50],
          borderColor: colors.deepPurple.base,
          backgroundColor: colors.deepPurple.base,
        },
        {
          label: 'FL 4',
          data: [61, 62, 58, 66, 68],
          borderColor: colors.indigo.base,
          backgroundColor: colors.indigo.base,
        },
        {
          label: 'FL 3',
          data: [61, 65, 63, 66, 58],
          borderColor: colors.blue.base,
          backgroundColor: colors.blue.base,
        },
        {
          label: 'FL 2',
          data: [59, 55, 60, 57, 66],
          borderColor: colors.lightBlue.lighten1,
          backgroundColor: colors.lightBlue.lighten1,
        },
        {
          label: 'FL 1',
          data: [60, 55, 69, 65, 61],
          borderColor: colors.cyan.lighten2,
          backgroundColor: colors.cyan.lighten2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 0,
          ticks: {
            stepSize: 10,
          },
        },
        x: {
          ticks: {
            autoSkip: false,
          },
        },
      },
      plugins: {
        legend: { reverse: true },
      },
    },
  }

  const manpower = {
    total: 53,
    shift1: 21,
    shift1Start: '05:00',
    shift1End: '13:00',
    shift2: 21,
    shift2Start: '12:00',
    shift2End: '20:00',
    shiftOff: 6,
    shiftNo: 6,
    hour: 5760,
    accident: 0,
  }

  const manpowerShift: PieType = {
    data: {
      labels: ['Shift 1', 'Shift 2', 'Off', 'No Shift'],
      datasets: [
        {
          data: [
            manpower.shift1,
            manpower.shift2,
            manpower.shiftOff,
            manpower.shiftNo,
          ],
          borderWidth: 0,
          backgroundColor: [
            colors.cyan.lighten2,
            colors.lightBlue.lighten1,
            colors.blue.base,
            colors.indigo.base,
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '50%',
      plugins: {
        datalabels: {
          display: true,
          color: 'white',
        },
      },
    },
  }
</script>

<style lang="sass" scoped>
#img-forklift
  max-height: 140px

.forklift-chart-wrapper
  height: 200px

.manpower-chart-wrapper
  height: 250px
</style>
