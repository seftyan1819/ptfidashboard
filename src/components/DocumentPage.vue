<template>
  <v-container>
    <div class="text-h3 mb-6">Documents</div>
    <v-row class="ma-n2">
      <v-col class="pa-2" :cols="12" :md="6">
        <div class="bg-surface-container rounded-lg pa-4">
          <v-data-table
            class=""
            density="compact"
            fixed-header
            :headers="outstandingAndSppbHeaders"
            :height="240"
            hide-default-footer
            :items="outstandingAndSppbTable"
            :items-per-page="-1"
          >
            <template #body.append>
              <tr class="font-weight-bold">
                <td colspan="3">Total</td>
                <td class="text-end">{{ outstandingAndSppbSums?.outstanding }}</td>
                <td class="text-end">{{ outstandingAndSppbSums?.sppb }}</td>
              </tr>
            </template>
          </v-data-table>
        </div>
      </v-col>

      <v-col class="pa-2" :cols="12" :md="6">
        <div class="bg-surface-container rounded-lg text-center pa-4">
          <div class="mb-4">SPPB by Date</div>
          <div class="chart-wrapper">
            <Line v-if="sppbByDate" v-bind="sppbByDate" />
          </div>
        </div>
      </v-col>

      <v-col class="pa-2" :cols="12" :md="6">
        <div class="bg-surface-container rounded-lg pa-4">
          <v-data-table
            class=""
            density="compact"
            fixed-header
            :headers="workOrderHeaders"
            :height="240"
            hide-default-footer
            :items="workOrderTable"
            :items-per-page="-1"
          >
            <template #body.append>
              <tr class="font-weight-bold">
                <td colspan="3">Total</td>
                <td class="text-end">{{ workOrderSums?.fullApproved }}</td>
                <td class="text-end">{{ workOrderSums?.outstanding }}</td>
              </tr>
            </template>
          </v-data-table>
        </div>
      </v-col>

      <v-col class="pa-2" :cols="12" :md="6">
        <div class="bg-surface-container rounded-lg text-center pa-4">
          <div class="mb-4">WO Full Approved by Date</div>
          <div class="chart-wrapper">
            <Line v-if="workOrderFullApprovedByDate" v-bind="workOrderFullApprovedByDate" />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'
  import { Line } from 'vue-chartjs'
  import colors from 'vuetify/util/colors'

  import type { LineType } from '@/types/chartjs'
  import { VDataTable } from 'vuetify/components'
  import { type DocumentCount, getDocuments } from '@/api/freightForwarding.api'

  const dataSppb = ref<DocumentCount[] | null>(null)
  const dataWorkOrder = ref<DocumentCount[] | null>(null)

  const fetchDocument = async (type: Parameters<typeof getDocuments>[0], dataRef: Ref<DocumentCount[] | null>) => {
    try {
      const response = await getDocuments(type, dayjs('2024-09-01'), dayjs('2024-09-31'))
      dataRef.value = response.data
    } catch (err) {
      console.error(err)
    }
  }

  onMounted(async () => {
    fetchDocument('spbb', dataSppb)
    fetchDocument('work-order', dataWorkOrder)
  })

  function calculateSum<T> (data: T[], predicate: (i: T) => number) {
    return data.reduce((prev, curr) => prev + predicate(curr), 0)
  }

  const outstandingAndSppb = computed(() => dataSppb.value?.map(
    d => ({ date: d.date, outstanding: d.outstanding, sppb: d.completed })
  ))

  const outstandingAndSppbHeaders
    : InstanceType<typeof VDataTable>['$props']['headers'] =
    [
      { value: 'year', title: 'Year' },
      { value: 'month', title: 'Month' },
      { value: 'day', title: 'Day' },
      { value: 'outstanding', title: 'Outstanding Document', align: 'end' },
      { value: 'sppb', title: 'SPPB', align: 'end' },
    ]
  const outstandingAndSppbTable = computed(() => (
    outstandingAndSppb.value?.map(x => {
      const date = dayjs(x.date)
      return {
        ...x,
        year: date.year(),
        month: date.format('MMM'),
        day: date.date(),
      }
    })
  ))

  const outstandingAndSppbSums = computed(
    () => outstandingAndSppb.value && {
      outstanding: calculateSum(outstandingAndSppb.value, x => x.outstanding),
      sppb: calculateSum(outstandingAndSppb.value, x => x.sppb),
    }
  )

  // Work Order
  const workOrder = computed(() => dataWorkOrder.value?.map(
    x => ({ date: x.date, fullApproved: x.completed, outstanding: x.outstanding })
  ))

  const workOrderHeaders
    : InstanceType<typeof VDataTable>['$props']['headers'] =
    [
      { value: 'year', title: 'Year' },
      { value: 'month', title: 'Month' },
      { value: 'day', title: 'Day' },
      { value: 'fullApproved', title: 'Full Approved', align: 'end' },
      { value: 'outstanding', title: 'Outstanding', align: 'end' },
    ]
  const workOrderTable = computed(() => workOrder.value?.map(x => {
    const date = dayjs(x.date)
    return {
      ...x,
      year: date.year(),
      month: date.format('MMM'),
      day: date.date(),
    }
  }))
  const workOrderSums = computed(() => workOrder.value && {
    fullApproved: calculateSum(workOrder.value, x => x.fullApproved),
    outstanding: calculateSum(workOrder.value, x => x.outstanding),
  })

  // Charts
  const sppbByDate = computed<LineType | undefined>(
    () => outstandingAndSppb.value && {
      data: {
        labels: outstandingAndSppb.value.map(x => dayjs(x.date).date()),
        datasets: [
          {
            data: outstandingAndSppb.value.map(x => x.sppb),
            borderColor: colors.blue.base,
            backgroundColor: colors.blue.base,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 24,
          },
        },
        scales: {
          x: {
            grid: { display: false },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
          datalabels: {
            display: true,
            align: 'top',
          },
        },
      },
    }
  )

  const workOrderFullApprovedByDate = computed<LineType | undefined>(
    () => workOrder.value && {
      data: {
        labels: workOrder.value.map(x => dayjs(x.date).date()),
        datasets: [
          {
            data: workOrder.value.map(x => x.fullApproved),
            borderColor: colors.blue.base,
            backgroundColor: colors.blue.base,
          },
        ],
      },
      options: sppbByDate.value?.options,
    }
  )
</script>

<style lang="sass" scoped>
.chart-wrapper
  height: 200px
</style>
