<script setup lang="ts">
  import { useCurrentTime } from '@/composables/useCurrentTime'
  import { getGradient } from '@/helpers/chart'
  import { getByDestination, getMonthly, getOngoingShipmentCount, getOngoingShipments, getYearly } from '@/api/freightForwarding.api'
  import type { BarType } from '@/types/chartjs'
  import dayjs from 'dayjs'
  import type { VDataTable } from 'vuetify/components'

  const products = [
    'Copper Cathode',
    'Precious Metal',
    'Gold',
  ]
  const { datetime } = useCurrentTime()

  // Ongoing Shipment
  const countData = ref()
  onMounted(async () => {
    countData.value = await getOngoingShipmentCount()
  })
  const filterByOptions = [
    { value: 'booking_request_status', title: 'Last Status' },
    { value: 'booking_no', title: 'Booking Request' },
  ]
  const sortByOptions = [
    { value: 'desc', title: 'Newest' },
    { value: 'asc', title: 'Oldest' },
  ]
  const tableFilter = reactive({
    itemsPerPage: 10,
    page: 1,
    search: '',
    filterBy: filterByOptions[0].value,
    sortBy: sortByOptions[0].value,
  })

  const onUpdateTableOptions = (options: typeof tableFilter) => {
    tableFilter.itemsPerPage = options.itemsPerPage
    tableFilter.page = options.page
  }
  const table = useQuery({
    key: () => ['ff', tableFilter],
    query: async () => await getOngoingShipments({
      limit: tableFilter.itemsPerPage,
      offset: (tableFilter.page - 1) * tableFilter.itemsPerPage,
      search: tableFilter.search,
      filter_by: tableFilter.filterBy,
      order_by: tableFilter.sortBy,
    }),
  })
  const ongoingShipmentHeaders: VDataTable['$props']['headers'] = [
    { key: 'booking_no', title: 'Booking Request', sortable: false },
    { key: 'nomination_data', title: 'Nomination', sortable: false },
    { key: 'sales_order', title: 'PO/SO', sortable: false },
    { key: 'quantity', title: 'Qty', align: 'end', sortable: false },
    {
      key: 'destination_country',
      title: 'Destination Country',
      value: item => item.destination + ', ' + item.country,
      sortable: false,
    },
    { key: 'last_activities', title: 'Last Activity', sortable: false },
    {
      key: 'booking_request_status',
      title: 'Last Status',
      align: 'center',
      sortable: false,
    },
  ]

  const now = dayjs()
  const monthOptions = [...Array(12).keys()]
    .map(i => {
      const date = now.subtract(11 - i, 'month')
      return {
        value: date.format('YYYY-MM'),
        title: date.format("MMM 'YY"),
      }
    })
  const yearOptions = [...Array(5).keys()].map(i => now.year() - 4 + i)

  // monthly
  const monthlyData = useQuery({
    key: () => ['ff/monthly'],
    query: async () => await getMonthly(),
  })
  const monthlyChart = computed<BarType>(() => ({
    data: {
      labels: monthlyData.data.value?.chart.map(d => d.label),
      datasets: [
        {
          data: monthlyData.data.value?.chart.map(d => d.value) ?? [0],
          type: 'line' as 'bar',
          borderColor: 'black',
          borderWidth: 1,
        },
        {
          data: monthlyData.data.value?.chart.map(d => d.value) ?? [0],
          backgroundColor: ctx => {
            return getGradient(ctx, ['#0D99FF'])
          },
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { title: { display: true, text: 'Tons' }, grid: { display: false } },
        x: { title: { display: true, text: 'Month' }, grid: { display: false } },
      },
      plugins: { legend: { display: false } },
    },
  })
  )
  const monthlyDiff = computed(() => {
    return Math.round((monthlyData.data.value?.diff ?? 0) * 100)
  })

  // yearly
  const yearlyData = useQuery({
    key: () => ['ff/yearly'],
    query: async () => await getYearly(),
  })
  const yearlyChart = computed<BarType>(() => ({
    data: {
      labels: yearlyData.data.value?.chart.map(d => d.label),
      datasets: [
        {
          data: yearlyData.data.value?.chart.map(d => d.value) ?? [0],
          type: 'line' as 'bar',
          borderColor: 'black',
          borderWidth: 1,
        },
        {
          data: yearlyData.data.value?.chart.map(d => d.value) ?? [0],
          backgroundColor: ctx => {
            return getGradient(ctx, ['#0D99FF', '#14AE5C', '#FFDD00', '#ED6C30', '#FFEAEA'])
          },
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { title: { display: true, text: 'Tons' }, grid: { display: false } },
        x: { title: { display: true, text: 'Year' }, grid: { display: false } },
      },
      plugins: { legend: { display: false } },
    },
  })
  )
  const yearlyDiff = computed(() => {
    return Math.round((yearlyData.data.value?.diff ?? 0) * 100)
  })

  const chartDestColors = [
    '#0000FF',
    '#0D5EFF',
    '#0D99FF',
    '#0DD7FF',
    '#0DFBFF',
    '#0DFFC7',
    '#15FF0D',
    '#DFFF0D',
    '#FFBA0D',
    '#FF5A0D',
  ]
  // monthly dest
  const monthlyDest = ref(monthOptions[11].value)
  const monthlyDestQuery = useQuery({
    key: () => ['ff/by-dest', monthlyDest.value],
    query: async () => await getByDestination({ month: monthlyDest.value }),
  })
  const monthlyDestChart = computed<BarType>(() => ({
    data: {
      labels: monthlyDestQuery.data.value?.map(d => d.label) ?? [0],
      datasets: [
        {
          data: monthlyDestQuery.data.value?.map(d => d.sum) ?? [0],
          backgroundColor: ctx => {
            return getGradient(ctx, chartDestColors)
          },
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { title: { display: true, text: 'Tons' }, grid: { display: false } },
        x: { grid: { display: false } },
      },
      plugins: { legend: { display: false } },
    },
  }))

  // monthly dest
  const yearlyDest = ref(yearOptions[4])
  const yearlyDestQuery = useQuery({
    key: () => ['ff/by-dest', yearlyDest.value],
    query: async () => await getByDestination({ year: yearlyDest.value }),
  })
  const yearlyDestChart = computed<BarType>(() => ({
    data: {
      labels: yearlyDestQuery.data.value?.map(d => d.label) ?? [0],
      datasets: [
        {
          data: yearlyDestQuery.data.value?.map(d => d.sum) ?? [0],
          backgroundColor: ctx => {
            return getGradient(ctx, chartDestColors)
          },
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { title: { display: true, text: 'Tons' }, grid: { display: false } },
        x: { grid: { display: false } },
      },
      plugins: { legend: { display: false } },
    },
  }))
</script>

<template>
  <VContainer>
    <div class="d-flex mb-6">
      <div>
        <VSelect
          class="flex-0-1"
          density="compact"
          hide-details="auto"
          :items="products"
          label="Product"
          rounded="pill"
          :width="210"
        />
      </div>
      <div>
        <VTextField
          class="flex-0-1 input-center ml-3"
          density="compact"
          hide-details="auto"
          label="Current Date"
          :model-value="datetime.format('ddd DD/MM/YYYY')"
          readonly
          rounded="pill"
          :width="200"
        />
      </div>
      <div>
        <VTextField
          class="flex-0-1 ml-3 input-center"
          density="compact"
          hide-details="auto"
          label="Current Time"
          :model-value="datetime.format('HH:mm:ss')"
          readonly
          rounded="pill"
          :width="150"
        />
      </div>
      <VSpacer />
    </div>

    <VRow>
      <VCol>
        <VCard class="position-relative overflow-visible px-3 pb-3 pt-4" :elevation="4">
          <div
            :class="[
              'title-center',
              'position-absolute',
              'bg-background',
              'px-2',
              'font-weight-bold',
              'text-h5',
              'text-primary',
            ]"
          >
            Ongoing Shipment
          </div>

          <div class="d-flex align-end">
            <VCard class="d-flex pa-1" :elevation="2">
              <div class="pa-2">
                <VImg :height="48" src="@/assets/icon/ship-green.svg" :width="48" />
              </div>
              <div class="text-center py-1 pr-2">
                <div class="text-caption">Booking Request</div>
                <div class="text-secondary text-h4 font-weight-bold">{{ countData?.bookingRequest }}</div>
              </div>

              <div class="bg-outline ma-2" style="width: 1px" />

              <div class="pa-2 my-n1">
                <VImg :height="64" src="@/assets/icon/ph_shipping-container-fill.svg" :width="64" />
              </div>
              <div class="text-center py-1 pr-2">
                <div class="text-caption">Container</div>
                <div class="text-secondary text-h4 font-weight-bold">{{ countData?.container }}</div>
              </div>
            </VCard>
            <VSpacer />

            <div class="d-flex">
              <VTextField
                v-model="tableFilter.search"
                density="compact"
                hide-details="auto"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                rounded="pill"
                :width="210"
              />
              <VSelect
                v-model="tableFilter.filterBy"
                class="pl-3"
                density="compact"
                hide-details="auto"
                :items="filterByOptions"
                label="Filter by"
                rounded="pill"
              />
              <VSelect
                v-model="tableFilter.sortBy"
                class="pl-3"
                density="compact"
                hide-details="auto"
                :items="sortByOptions"
                label="Sort by"
                rounded="pill"
              />
            </div>
          </div>

          <VCard class="mt-3" :elevation="2">
            <VDataTableServer
              :header-props="{ class: 'font-weight-bold text-primary' }"
              :headers="ongoingShipmentHeaders"
              :items="table.data.value?.results"
              :items-length="table.data.value?.count ?? 0"
              :items-per-page="tableFilter.itemsPerPage"
              :loading="table.isLoading.value"
              :page="tableFilter.page"
              @update:options="onUpdateTableOptions"
            >
              <template #item.booking_request_status="{ item }">
                <VChip
                  :class="[
                    'rounded',
                    'pa-2',
                    'text-center',
                  ]"
                  :color="item.booking_request_status === 'Pickup Container' ? 'yellow-darken-4' : 'primary'"
                >
                  {{ item.booking_request_status }}
                </VChip>
              </template>
            </VDataTableServer>
          </VCard>
        </VCard>
      </VCol>
    </VRow>

    <VRow>
      <VCol :md="6">
        <BarChartCard
          :chart="monthlyChart"
          title="Total Cargo Tonnages Monthly"
        >
          <template #detail>
            <div class="mt-2 mr-2">
              <VChip
                class="mx-1"
                :color="monthlyDiff >= 0 ? 'primary' : 'error'"
                density="compact"
                rounded="pill"
                size="small"
                :text="(monthlyDiff > 0 ? '+' : '') + monthlyDiff + '%'"
              />
              <span class="text-outline text-caption font-italic">vs last month</span>
            </div>
          </template>
        </BarChartCard>
      </VCol>
      <VCol :md="6">
        <BarChartCard
          :chart="yearlyChart"
          title="Total Cargo Tonnages Yearly"
        >
          <template #detail>
            <div class="mt-2 mr-2">
              <VChip
                class="mx-1"
                :color="yearlyDiff >= 0 ? 'primary' : 'error'"
                density="compact"
                rounded="pill"
                size="small"
                :text="(yearlyDiff > 0 ? '+' : '') + yearlyDiff + '%'"
              />
              <span class="text-outline text-caption font-italic">vs last year</span>
            </div>
          </template>
        </BarChartCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol :md="6">
        <BarChartCard
          :chart="monthlyDestChart"
          :disabled="(monthlyDestQuery.data.value?.length ?? 0) === 0"
          :loading="monthlyDestQuery.isLoading.value"
          title="Top 10 Total Cargo Tonnages by Destination"
        >
          <template #detail>
            <div class="mt-2 mr-2">
              <VSelect
                v-model="monthlyDest"
                class="flex-0-1"
                density="compact"
                hide-details="auto"
                :items="monthOptions"
                label="Month"
                rounded="pill"
                :width="130"
              />
            </div>
          </template>
        </BarChartCard>
      </VCol>
      <VCol :md="6">
        <BarChartCard
          :chart="yearlyDestChart"
          :disabled="(yearlyDestQuery.data.value?.length ?? 0) === 0"
          title="Top 10 Total Cargo Tonnages by Destination"
        >
          <template #detail>
            <div class="mt-2 mr-2">
              <VSelect
                v-model="yearlyDest"
                class="flex-0-1"
                density="compact"
                hide-details="auto"
                :items="yearOptions"
                label="Year"
                rounded="pill"
                :width="120"
              />
            </div>
          </template>
        </BarChartCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style lang="sass" scoped>
  .title-center
    top: 0
    left: 50%
    transform: translate(-50%, -50%)

  :deep(.v-field__input)
    font-weight: bold
</style>
