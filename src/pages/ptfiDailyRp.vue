<script setup lang="ts">
  import { useCurrentTime } from '@/composables/useCurrentTime'
  import { 
    getShipmentOfTheDay,
    getAggregateShipment,
  } from '@/api/threePL.api'
  import dayjs from 'dayjs'
  import type { VDataTable } from 'vuetify/components'
  import truckIcon from '@/assets/icon/mdi_truck-check-outline.svg';

  const { datetime } = useCurrentTime()
  // const firstDateOfMonth = '2025-08-01';
  const firstDateOfMonth = dayjs(new Date()).startOf('month').format('YYYY-MM-DD');
  const currentDate = dayjs(new Date()).format('YYYY-MM-DD');

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
    key: () => ['shipment-of-the-day', tableFilter],
    query: async () => await getShipmentOfTheDay(),
  })

  const shipmentOfTheDayHeader: VDataTable['$props']['headers'] = [
    { key: 'items', title: 'Items', align: 'center', sortable: false },
    { key: 'grand_total', title: 'Grand Total', align: 'center', sortable: false },
    { key: 'copper_cathode_amount', title: 'Copper Cathode', align: 'center', sortable: false },
    { key: 'slag_amount', title: 'Slag', align: 'center', sortable: false },
    { key: 'gypsum_amount', title: 'Gypsum', align: 'center', sortable: false },
    { key: 'acid_amount', title: 'Acid', align: 'center', sortable: false },
  ]

const getRowProps = ({ item }: { item: Record<string, any> }) => {
  if (
      item.items === 'Shipment Of The Day' 
      || item.items === 'Aggregate Of Shipment' 
      || item.items === 'In Transit'
      || item.items === 'Delivered'
    ) {
    return {
      class: 'bg-green-lighten-5',
    };
  }
  return {};
};

const cellProps = ({ item, column }: { item: Record<string, any>, column: any }) => {
  // Only apply to specific column(s) - adjust 'items' to match your column key
  if (
      (column.key === 'slag_amount' && item.slag_amount == null)
      || (column.key === 'gypsum_amount' && item.gypsum_amount == null)
      || (column.key === 'acid_amount' && item.acid_amount == null)
    ) {
    return {
      class: 'bg-white',
    };
  }
};

// AGGREGATE SHIPMENT TABLE
  const tableFilterAggregateShipment = reactive({
    itemsPerPage: 10,
    page: 1,
    search: '',
    startDate: firstDateOfMonth,
    endDate: currentDate
  })

  const onUpdateTableOptionsAggregateShipment = (options: typeof tableFilterAggregateShipment) => {
    tableFilterAggregateShipment.itemsPerPage = options.itemsPerPage
    tableFilterAggregateShipment.page = options.page
  }

  const tableAggregateShipment = useQuery({
    key: () => ['aggregate-shipment', tableFilterAggregateShipment],
    query: async () => await getAggregateShipment({
      limit: tableFilterAggregateShipment.itemsPerPage,
      offset: (tableFilterAggregateShipment.page - 1) * tableFilterAggregateShipment.itemsPerPage,
      search: tableFilterAggregateShipment.search,
      startDate: tableFilterAggregateShipment.startDate,
      endDate: tableFilterAggregateShipment.endDate,
    }),
  })

  const aggregateShipmentHeader: VDataTable['$props']['headers'] = [
    { key: 'items', title: 'Items', align: 'center', sortable: false },
    { key: 'grand_total', title: 'Grand Total', align: 'center', sortable: false },
    { 
      key: 'copper_cathode_amount', 
      title: 'Copper Cathode', 
      align: 'center', 
      sortable: false,
      value: (item) => Number(item.copper_cathode_amount).toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })
    },
    { 
      key: 'slag_amount', 
      title: 'Slag', 
      align: 'center', 
      sortable: false,
      value: (item) => Number(item.slag_amount).toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })
    },
    { 
      key: 'gypsum_amount', 
      title: 'Gypsum', 
      align: 'center', 
      sortable: false,
      value: (item) => Number(item.gypsum_amount).toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })
    },
    { 
      key: 'acid_amount', 
      title: 'Acid', 
      align: 'center', 
      sortable: false,
      value: (item) => Number(item.acid_amount).toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })
    },
  ]
  // AGGREGATE SHIPMENT TABLE

</script>

<template>
  <VContainer>
    <div class="d-flex mb-6">
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
        <CardWithTitleImage 
          title="Report Shipment" 
          color="light" 
          titleClass="title-center"
          :image=truckIcon
        >
          <div class="d-flex align-end">
            <VCard class="d-flex pa-1" :elevation="2">
              <div class="pa-2 text-h7 align-center text-black font-weight-bold">Shipment of The Day</div>
            </VCard> 
          </div>

          <VCard class="mt-3" :elevation="2">
            <VDataTableServer
              :header-props="{ class: 'font-weight-bold text-primary' }"
              :headers="shipmentOfTheDayHeader"
              :items="table.data.value?.results"
              :items-length="table.data.value?.count ?? 0"
              :items-per-page= -1
              hide-default-footer
              :loading="table.isLoading.value"
              @update:options="onUpdateTableOptions"
              :row-props="getRowProps"
            >
              <!-- Custom header template for grouped headers -->
              <template #headers="{ columns }">
                <tr>
                  <th class="text-left font-weight-bold bg-green-darken-3 text-white border border-black" rowspan="2">
                    Items
                  </th>
                  <th class="text-center font-weight-bold bg-green-darken-3 text-white border border-black" rowspan="2">
                    Grand Total
                  </th>
                  <th class="text-center font-weight-bold bg-green-darken-3 text-white border border-black" colspan="4">
                    Product Group
                  </th> 
                </tr>
                <tr>
                  <th class="text-center font-weight-bold bg-green-darken-2 text-white border border-black">
                    Copper Cathode
                  </th>
                  <th class="text-center font-weight-bold bg-green-darken-2 text-white border border-black">
                    Slag
                  </th>
                  <th class="text-center font-weight-bold bg-green-darken-2 text-white border border-black">
                    Gypsum
                  </th>
                  <th class="text-center font-weight-bold bg-green-darken-2 text-white border border-black">
                    Acid
                  </th>
                </tr>
              </template>
              <template #item.grand_total="{ item }">
                  {{ ( (Number(item.copper_cathode_amount) || 0) 
                        + (Number(item.slag_amount) || 0) 
                        + (Number(item.gypsum_amount) || 0) 
                        + (Number(item.acid_amount) || 0) 
                    ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
              </template>
            </VDataTableServer>
          </VCard>

          <VSpacer/>
          <VSpacer/>

          <div class="d-flex align-end pt-2">
            <VCard class="d-flex pa-1" :elevation="2">
              <div class="pa-2 text-h7 align-center text-black font-weight-bold">Aggregate Shipment</div>
            </VCard>
          </div>

          <VRow> 
            <VCol>
              <div class="d-flex align-end">
                <div class="d-flex pa-1">
                </div> 
              <VSpacer />

              <div class="d-flex">
                <VTextField
                  class="flex-0-1 ml-3"
                  density="compact"
                  hide-details="auto"
                  label="Start Date"
                  v-model="tableFilterAggregateShipment.startDate"
                  rounded="pill"
                  type="date"
                  :width="200"
                />
                <VTextField
                  class="flex-0-1 ml-3"
                  density="compact"
                  hide-details="auto"
                  label="End Date"
                  v-model="tableFilterAggregateShipment.endDate"
                  rounded="pill"
                  type="date"
                  :width="200"
                />
              </div>
            </div>
            </VCol>
          </VRow>

          <VCard class="mt-3" :elevation="2">
            <VDataTableServer
              :header-props="{ class: 'font-weight-bold text-primary' }"
              :headers="aggregateShipmentHeader"
              :items="tableAggregateShipment.data.value?.results"
              :items-length="tableAggregateShipment.data.value?.count ?? 0"
              :items-per-page= -1
              hide-default-footer
              :loading="tableAggregateShipment.isLoading.value"
              @update:options="onUpdateTableOptionsAggregateShipment"
              :row-props="getRowProps"
              :cell-props="cellProps"
            >
              <!-- Custom header template for grouped headers -->
              <template #headers="{ columns }">
                <tr>
                  <th class="text-left font-weight-bold bg-green-darken-3 text-white border border-black" rowspan="2">
                    Items
                  </th>
                  <th class="text-center font-weight-bold bg-green-darken-3 text-white border border-black" rowspan="2">
                    Grand Total
                  </th>
                  <th class="text-center font-weight-bold bg-green-darken-3 text-white border border-black" colspan="4">
                    Product Group
                  </th> 
                </tr>
                <tr>
                  <th class="text-center font-weight-bold bg-green-darken-2 text-white border border-black">
                    Copper Cathode
                  </th>
                  <th class="text-center font-weight-bold bg-green-darken-2 text-white border border-black">
                    Slag
                  </th>
                  <th class="text-center font-weight-bold bg-green-darken-2 text-white border border-black">
                    Gypsum
                  </th>
                  <th class="text-center font-weight-bold bg-green-darken-2 text-white border border-black">
                    Acid
                  </th>
                </tr>
              </template>

              <template #item.grand_total="{ item }">
                  {{ ( 
                        (Number(item.copper_cathode_amount) || 0) 
                        + (Number(item.slag_amount) || 0) 
                        + (Number(item.gypsum_amount) || 0) 
                        + (Number(item.acid_amount) || 0) 
                    ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}
              </template>
            </VDataTableServer>
          </VCard>
        </CardWithTitleImage> 
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
