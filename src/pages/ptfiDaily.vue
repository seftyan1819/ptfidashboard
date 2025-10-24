<script setup lang="ts">
  import { useCurrentTime } from '@/composables/useCurrentTime'
  import { getGradient } from '@/helpers/chart'
  import { 
    getShipmentOfTheDay,
    getAggregateShipment,
    getCustomInProgress,
    getCustomInProgressCount,
    getCustomInProgressByProduct,
    getCustomInProgressByProductCount,
    getAnalyticCopperCathodeCount,
    getAnalyticCopperCathodeChart,
    getAnalyticByProductCount,
    getAnalyticByProductChart,
  } from '@/api/threePL.api'
  import type { BarType } from '@/types/chartjs'
  import dayjs from 'dayjs'
  import type { VDataTable } from 'vuetify/components'
  import type AmountCardWithBackground from '@/components/AmountCardWithBackground.vue'
  import emailIcon from '@/assets/icon/email.svg'
  import truckIcon from '@/assets/icon/mdi_truck-check-outline.svg';
  import warehouseIcon from '@/assets/icon/warehouse.svg';
  import documentIcon from '@/assets/icon/file-document.svg';
  import customClearanceIcon from '@/assets/icon/custom-clearance.svg';
  import analyticsIcon from '@/assets/icon/analytics.svg';
  import checkIcon from '@/assets/icon/check.svg';
  import orderIcon from '@/assets/icon/shopping.svg';
  import containerIcon from '@/assets/icon/container.svg';
  import documentEditIcon from '@/assets/icon/file-document-edit.svg';
  import messageCheckIcon from '@/assets/icon/message-check.svg';

  const { datetime } = useCurrentTime()
  // const firstDateOfMonth = '2025-08-01';
  const firstDateOfMonth = dayjs(new Date()).startOf('month').format('YYYY-MM-DD');
  const currentDate = dayjs(new Date()).format('YYYY-MM-DD');

  const countDataCustomInProgress = ref()
  const countDataCustomInProgressBP = ref()
  const countAnalyticCopperCathode = ref()
  const countAnalyticByProduct = ref()

  const chartKeyCC = ref(0);
  const chartKeyBP = ref(0);

  const customInProgressAmount = computed<InstanceType<typeof AmountCardWithBackground>['$props'][]>(() => [
    {
      img: emailIcon,
      title: 'Receive Email SO',
      amount: countDataCustomInProgress.value?.receive_email_so ? countDataCustomInProgress.value?.receive_email_so : 0,
      cardType: "yellow",
    },
    {
      img: truckIcon,
      title: '3PL receive .txt file',
      amount: countDataCustomInProgress.value?.threepl_receive_txt_file ? countDataCustomInProgress.value?.threepl_receive_txt_file : 0,
      cardType: "blue",
    },
    {
      img: warehouseIcon,
      title: 'Pick and Post',
      amount: countDataCustomInProgress.value?.pick_and_post ? countDataCustomInProgress.value?.pick_and_post : 0,
      cardType: "green",
    },
    {
      img: documentIcon,
      title: 'EXIM Receive Supporting Document',
      amount: countDataCustomInProgress.value?.exim_receive_supporting_document ? countDataCustomInProgress.value?.exim_receive_supporting_document : 0,
      cardType: "red",
    },
    {
      img: customClearanceIcon,
      title: 'Submit Custom Clearance',
      amount: countDataCustomInProgress.value?.submit_custom_clearance ? countDataCustomInProgress.value?.submit_custom_clearance : 0,
      cardType: "purple",
    },
    {
      img: analyticsIcon,
      title: 'Analyzing Point',
      amount: countDataCustomInProgress.value?.analyzing_point ? countDataCustomInProgress.value?.analyzing_point : 0,
      cardType: "orange",
    },
    {
      img: checkIcon,
      title: 'Cleared Analyzing Point',
      amount: countDataCustomInProgress.value?.cleared_analyzing_point ? countDataCustomInProgress.value?.cleared_analyzing_point : 0,
      cardType: "lightgreen",
    },
  ]);

  const customInProgressByProductAmount = computed<InstanceType<typeof AmountCardWithBackground>['$props'][]>(() => [
    {
      img: emailIcon,
      title: 'Receive Suppdoc',
      amount: countDataCustomInProgressBP.value?.receive_supdoc ? countDataCustomInProgressBP.value?.receive_supdoc : 0,
      cardType: "orange",
    },
    {
      img: documentEditIcon,
      title: 'Drafting BC 4.1/PPKEK',
      amount: countDataCustomInProgressBP.value?.drafting_bc_41_ppkek ? countDataCustomInProgressBP.value?.drafting_bc_41_ppkek : 0,
      cardType: "purple",
    },
    {
      img: messageCheckIcon,
      title: 'Draft BC 4.1/PPKEK Reviewed',
      amount: countDataCustomInProgressBP.value?.draft_bc_41_ppkek_reviewed ? countDataCustomInProgressBP.value?.draft_bc_41_ppkek_reviewed : 0,
      cardType: "yellow",
    },
    {
      img: checkIcon,
      title: 'SPPB',
      amount: countDataCustomInProgressBP.value?.sppb ? countDataCustomInProgressBP.value?.sppb : 0,
      cardType: "green",
    },
    {
      img: truckIcon,
      title: 'Gate Out',
      amount: countDataCustomInProgressBP.value?.gate_out ? countDataCustomInProgressBP.value?.gate_out : 0,
      cardType: "blue",
    },
    {
      img: documentEditIcon,
      title: 'Permohonan Pembetulan Data BC',
      amount: countDataCustomInProgressBP.value?.permohonan_pembetulan_data_bc ? countDataCustomInProgressBP.value?.permohonan_pembetulan_data_bc : 0,
      cardType: "darkpurple",
    },
    {
      img: checkIcon,
      title: 'SKEP Release',
      amount: countDataCustomInProgressBP.value?.skep_release ? countDataCustomInProgressBP.value?.skep_release : 0,
      cardType: "lightblue",
    },
    {
      img: documentEditIcon,
      title: 'Pembetulan Data di CEISA/PPKEK',
      amount: countDataCustomInProgressBP.value?.pembetulan_data_di_ceisa_ppkek ? countDataCustomInProgressBP.value?.pembetulan_data_di_ceisa_ppkek : 0,
      cardType: "lightorange",
    },
    {
      img: customClearanceIcon,
      title: 'SPPD',
      amount: countDataCustomInProgressBP.value?.sppd ? countDataCustomInProgressBP.value?.sppd : 0,
      cardType: "darkgreen",
    },
  ]);
  
  const shipmentTypes = [
    'All',
    'Domestic',
    'Export',
  ]

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


  // CUSTOM IN PROGRESS COPPER CATHODE
  const filterByOptionsCustomInProgress = [
    { value: 'sales_order', title: 'Sales Order' },
    { value: 'shipment_type', title: 'Shipment Type' },
  ]

  const tableFilterCustomInProgress = reactive({
    itemsPerPage: 10,
    page: 1,
    search: '',
    filterBy: filterByOptionsCustomInProgress[0].value,
  })

  const onUpdateTableOptionsCustomInProgress = (options: typeof tableFilterCustomInProgress) => {
    tableFilter.itemsPerPage = options.itemsPerPage
    tableFilter.page = options.page
  }

  const tableCustomInProgress = useQuery({
    key: () => ['custom-in-progress', tableFilterCustomInProgress],
    query: async () => await getCustomInProgress({
      limit: tableFilterCustomInProgress.itemsPerPage,
      offset: (tableFilterCustomInProgress.page - 1) * tableFilterCustomInProgress.itemsPerPage,
      search: tableFilterCustomInProgress.search,
      filter_by: tableFilterCustomInProgress.filterBy,
    }),
  })
  
  const customInProgressHeader: VDataTable['$props']['headers'] = [
    { key: 'sales_order', title: 'Sales Order', sortable: false },
    { key: 'qty', title: 'Qty', sortable: false },
    { key: 'shipment_type', title: 'Shipment Type', sortable: false },
    { 
      key: 'receive_email_so_to_threepl_receive_txt_file_hso',
      title: 'A -> B',
      value: (item) => item.receive_email_so_to_threepl_receive_txt_file_hso != null 
      ? parseFloat(item.receive_email_so_to_threepl_receive_txt_file_hso).toFixed() + ' Hrs'
      : ''
    },
    { 
      key: 'threepl_receive_txt_file_to_pick_and_post_hcontainer',
      title: 'B -> C',
      value: (item) => item.threepl_receive_txt_file_to_pick_and_post_hcontainer != null 
      ? parseFloat(item.threepl_receive_txt_file_to_pick_and_post_hcontainer).toFixed() + ' Hrs'
      : ''
    },
    { 
      key: 'pick_and_post_to_exim_receive_suporting_document_hso',
      title: 'C -> D',
      value: (item) => item.pick_and_post_to_exim_receive_suporting_document_hso != null 
      ? parseFloat(item.pick_and_post_to_exim_receive_suporting_document_hso).toFixed() + ' Hrs'
      : ''
    },
    { 
      key: 'exim_receive_suporting_document_to_submit_custom_clearance_hso',
      title: 'D -> E',
      value: (item) => item.exim_receive_suporting_document_to_submit_custom_clearance_hso != null 
      ? parseFloat(item.exim_receive_suporting_document_to_submit_custom_clearance_hso).toFixed() + ' Hrs'
      : ''
    },
    { 
      key: 'submit_custom_clearance_to_analyzing_point_hso',
      title: 'E -> F',
      value: (item) => item.submit_custom_clearance_to_analyzing_point_hso != null 
      ? parseFloat(item.submit_custom_clearance_to_analyzing_point_hso).toFixed() + ' Hrs'
      : ''
    },
    { 
      key: 'analyzing_point_to_cleared_analyzing_point_hso',
      title: 'F -> G',
      value: (item) => item.analyzing_point_to_cleared_analyzing_point_hso != null 
      ? parseFloat(item.analyzing_point_to_cleared_analyzing_point_hso).toFixed() + ' Hrs'
      : ''
    },
    { key: 'last_status', title: 'Last Status', sortable: false },
    { key: 'last_date',
      title: 'Last Update',
      sortable: false,
      value: (item) => dayjs(item.last_date).format('MM/DD/YYYY')
    },
  ]
  // CUSTOM IN PROGRESS COPPER CATHODE


  // CUSTOM IN PROGRESS BY PRODUCTS
  const filterByOptionsCustomInProgressBP = [
    { value: 'sales_order', title: 'Sales Order' },
    { value: 'shipment_type', title: 'Shipment Type' },
  ]

  const tableFilterCustomInProgressBP = reactive({
    itemsPerPage: 10,
    page: 1,
    search: '',
    filterBy: filterByOptionsCustomInProgressBP[0].value,
  })

  const onUpdateTableOptionsCustomInProgressBP = (options: typeof tableFilterCustomInProgressBP) => {
    tableFilterCustomInProgressBP.itemsPerPage = options.itemsPerPage
    tableFilterCustomInProgressBP.page = options.page
  }

  const tableCustomInProgressBP = useQuery({
    key: () => ['custom-in-progress-by-product', tableFilterCustomInProgressBP],
    query: async () => await getCustomInProgressByProduct({
      limit: tableFilterCustomInProgressBP.itemsPerPage,
      offset: (tableFilterCustomInProgressBP.page - 1) * tableFilterCustomInProgressBP.itemsPerPage,
      search: tableFilterCustomInProgressBP.search,
      filter_by: tableFilterCustomInProgressBP.filterBy,
    }),
  })
  
  const customInProgressBPHeader: VDataTable['$props']['headers'] = [
    { key: 'sales_order', title: 'Sales Order', sortable: false },
    { key: 'qty', title: 'Qty', sortable: false },
    { key: 'shipment_type', title: 'Shipment Type', sortable: false },
    { 
      key: 'receive_supdoc_to_drafting_bc_41_PPKEK_hso',
      title: 'A -> B',
      value: (item) => item.receive_supdoc_to_drafting_bc_41_PPKEK_hso != null 
      ? parseFloat(item.receive_supdoc_to_drafting_bc_41_PPKEK_hso).toFixed() + ' Hrs'
      : ''
    },
    { 
      key: 'drafting_bc_41_ppkek_to_draft_bc_41_ppkek_reviewed_hso',
      title: 'B -> C',
      value: (item) => item.drafting_bc_41_ppkek_to_draft_bc_41_ppkek_reviewed_hso != null 
      ? parseFloat(item.drafting_bc_41_ppkek_to_draft_bc_41_ppkek_reviewed_hso).toFixed() + ' Hrs'
      : ''
    },
    { 
      key: 'draft_bc_41_ppkek_reviewed_to_sppb_hso',
      title: 'C -> D',
      value: (item) => item.draft_bc_41_ppkek_reviewed_to_sppb_hso != null 
      ? parseFloat(item.draft_bc_41_ppkek_reviewed_to_sppb_hso).toFixed() + ' Hrs'
      : ''
    },
    { 
      key: 'sppb_to_gate_out_hso',
      title: 'D -> E',
      value: (item) => item.sppb_to_gate_out_hso != null 
      ? parseFloat(item.sppb_to_gate_out_hso).toFixed() + ' Hrs'
      : ''
    },
    { 
      key: 'gate_out_to_permohonan_pembetulan_databc_hso',
      title: 'E -> F',
      value: (item) => item.gate_out_to_permohonan_pembetulan_databc_hso != null 
      ? parseFloat(item.gate_out_to_permohonan_pembetulan_databc_hso).toFixed() + ' Hrs'
      : ''
    },
    { 
      key: 'permohonan_pembetulan_data_bc_to_skep_release_hso',
      title: 'F -> G',
      value: (item) => item.permohonan_pembetulan_data_bc_to_skep_release_hso != null 
      ? parseFloat(item.permohonan_pembetulan_data_bc_to_skep_release_hso).toFixed() + ' Hrs'
      : ''
    },
    {   
      key: 'skep_release_to_pembetulan_data_di_ceisa_ppkek_hso',
      title: 'G -> H',
      value: (item) => item.skep_release_to_pembetulan_data_di_ceisa_ppkek_hso != null 
      ? parseFloat(item.skep_release_to_pembetulan_data_di_ceisa_ppkek_hso).toFixed() + ' Hrs'
      : ''
    }, 
    {   
      key: 'pembetulan_data_di_ceisa_ppkek_to_sppd_hso',
      title: 'H -> I',
      value: (item) => item.pembetulan_data_di_ceisa_ppkek_to_sppd_hso != null 
      ? parseFloat(item.pembetulan_data_di_ceisa_ppkek_to_sppd_hso).toFixed() + ' Hrs'
      : ''
    },
    { key: 'last_status', title: 'Last Status', sortable: false },
    { key: 'last_date',
      title: 'Last Update',
      sortable: false,
      value: (item) => dayjs(item.last_date).format('MM/DD/YYYY')
    },
  ]
  // CUSTOM IN PROGRESS BY PRODUCTS


  // ANALYTIC COPPER CATHODE
  const filterAnalyticCopperCathode = reactive({
    types: shipmentTypes[0],
    startDate: firstDateOfMonth,
    endDate: currentDate
  })

  const analyticsCopperChatodeAmount = computed<InstanceType<typeof AmountCardWithBackground>['$props'][]>(() => [
    {
      img: orderIcon,
      title: 'Sales Order',
      amount: countAnalyticCopperCathode.value?.sales_order ? countAnalyticCopperCathode.value?.sales_order : 0,
      cardType: "grey",
    },
    {
      img: containerIcon,
      title: 'Container',
      amount: countAnalyticCopperCathode.value?.container ? countAnalyticCopperCathode.value?.container : 0,
      cardType: "grey",
    },
  ]);

  // Custom plugin to display values at the end of bars
  const customDataLabelsPlugin = {
    id: 'customDataLabels',
    afterDatasetsDraw(chart: any) {
      const { ctx, data, scales: { x, y } } = chart
      
      ctx.save()
      ctx.font = 'bold 12px Arial'
      ctx.fillStyle = '#333'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      
      data.datasets[0].data.forEach((value: number, index: number) => {
        const barEnd = x.getPixelForValue(value)
        const yPos = y.getPixelForValue(index)
        
        ctx.fillText(value, barEnd + 8, yPos)
      })
      
      ctx.restore()
    }
  }

  // Make chart config reactive
  const ChartAnalyticsChoperChatode = ref<BarType>({
    data: {
      labels: [
        'Receive Email SO - 3PL receive txt file',
        '3PL receive txt file - Pick and Post',
        'Pick and Post - Supporting Document',
        'Supporting Document - Submit CC',
        'Submit CC - AP',
        'AP - Cleared AP'
      ],
      datasets: [
        {
          label: 'Days',
          data: [],
          backgroundColor: [
            'rgba(135, 184, 222, 0.8)',
            'rgba(144, 238, 144, 0.8)',
            'rgba(255, 160, 160, 0.8)',
            'rgba(255, 182, 222, 0.8)',
            'rgba(255, 218, 140, 0.8)',
            'rgba(200, 255, 200, 0.8)'
          ],
          borderColor: [
            'rgba(135, 184, 222, 1)',
            'rgba(144, 238, 144, 1)',
            'rgba(255, 160, 160, 1)',
            'rgba(255, 182, 222, 1)',
            'rgba(255, 218, 140, 1)',
            'rgba(200, 255, 200, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
          title: { 
            display: true, 
            text: 'Hours/SO  *Hours/containers specific only for 3PL receive txt file Pick and Post',
            font: {
              size: 12,
              weight: 'bold'
            },
            color: '#666'
          },
          grid: { 
            display: true,
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            stepSize: 5
          }
        },
        y: {
          title: { display: false },
          grid: { display: false },
          ticks: {
            font: {
              size: 12
            },
            color: '#008080'
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              return context.parsed.x + ' days'
            }
          }
        }
      },
      layout: {
        padding: {
          right: 30
        }
      }
    },
    plugins: [customDataLabelsPlugin]
  });
  // ANALYTIC COPPER CATHODE


  // ANALYTIC BY PRODUCT
  const filterAnalyticByProduct = reactive({
    types: shipmentTypes[0],
    startDate: firstDateOfMonth,
    endDate: currentDate
  })

  const analyticsByProductAmount = computed<InstanceType<typeof AmountCardWithBackground>['$props'][]>(() => [
    {
      img: orderIcon,
      title: 'Sales Order',
      amount: countAnalyticByProduct.value?.sales_order ? countAnalyticByProduct.value?.sales_order : 0,
      cardType: "grey",
    },
  ]);

  // Make chart config reactive
  const ChartAnalyticsByProduct = ref<BarType>({
    data: {
      labels: [
        'Receive Suppdoc - Draftin BC 4.1/PPKEK',
        'Draft BC 4.1/PPKEK Reviewed - SPPB',
        'Gate Out - Permohonan Pembetulan Data BC',
        'Permohonan Pembetulan Data BC - SKEP Release',
        'SKEP Release - Pembetulan Data di CEISA/PPKEK',
        'Pembetulan Data di CEISA/PPKEK - SPPD'
      ],
      datasets: [
        {
          label: 'Days',
          data: [],
          backgroundColor: [
            'rgba(135, 184, 222, 0.8)',
            'rgba(144, 238, 144, 0.8)',
            'rgba(255, 160, 160, 0.8)',
            'rgba(255, 182, 222, 0.8)',
            'rgba(255, 218, 140, 0.8)',
            'rgba(200, 255, 200, 0.8)'
          ],
          borderColor: [
            'rgba(135, 184, 222, 1)',
            'rgba(144, 238, 144, 1)',
            'rgba(255, 160, 160, 1)',
            'rgba(255, 182, 222, 1)',
            'rgba(255, 218, 140, 1)',
            'rgba(200, 255, 200, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
          title: { 
            display: true, 
            text: 'Hours/SO  *Hours/containers specific only for 3PL receive txt file Pick and Post',
            font: {
              size: 12,
              weight: 'bold'
            },
            color: '#666'
          },
          grid: { 
            display: true,
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            stepSize: 5
          }
        },
        y: {
          title: { display: false },
          grid: { display: false },
          ticks: {
            font: {
              size: 12
            },
            color: '#008080'
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              return context.parsed.x + ' days'
            }
          }
        }
      },
      layout: {
        padding: {
          right: 30
        }
      }
    },
    plugins: [customDataLabelsPlugin]
  });
  // ANALYTIC BY PRODUCT

  // ONMOUNTED
  onMounted(async () => {
    countDataCustomInProgress.value = await getCustomInProgressCount();
    countDataCustomInProgressBP.value = await getCustomInProgressByProductCount();
    await fetchAnalyticDataCC();
    await fetchChartDataAnalyticDataCC();
    await fetchAnalyticDataBP();
    await fetchChartDataAnalyticDataBP();
  }); 

  // WATCH
  watch(
    () => [
      filterAnalyticCopperCathode.startDate, filterAnalyticCopperCathode.endDate, filterAnalyticCopperCathode.types,
      filterAnalyticByProduct.startDate, filterAnalyticByProduct.endDate, filterAnalyticByProduct.types
    ],
    async () => {
      await fetchAnalyticDataCC();
      await fetchChartDataAnalyticDataCC();
      await fetchAnalyticDataBP();
      await fetchChartDataAnalyticDataBP();
    }
  );

  const fetchAnalyticDataCC = async () => {
    countAnalyticCopperCathode.value = await getAnalyticCopperCathodeCount({
      start_date: filterAnalyticCopperCathode.startDate,
      end_date: filterAnalyticCopperCathode.endDate,
      types: filterAnalyticCopperCathode.types
    });
  };

  const fetchAnalyticDataBP = async () => {
    countAnalyticByProduct.value = await getAnalyticByProductCount({
      start_date: filterAnalyticByProduct.startDate,
      end_date: filterAnalyticByProduct.endDate,
      types: filterAnalyticByProduct.types
    });
  };

  const fetchChartDataAnalyticDataCC = async () => {
    const response = await getAnalyticCopperCathodeChart({
      start_date: filterAnalyticCopperCathode.startDate,
      end_date: filterAnalyticCopperCathode.endDate,
      types: filterAnalyticCopperCathode.types
    });

     // Update data reactively
    ChartAnalyticsChoperChatode.value.data.datasets[0].data = [
      response.receive_email,
      response.threepl_receive,
      response.pick_post,
      response.exim_recive,
      response.submit_custom,
      response.analyzing_point
    ];

    chartKeyCC.value++;
  };

  const fetchChartDataAnalyticDataBP = async () => {
    const response = await getAnalyticByProductChart({
      start_date: filterAnalyticByProduct.startDate,
      end_date: filterAnalyticByProduct.endDate,
      types: filterAnalyticByProduct.types,
    });

     // Update data reactively
    ChartAnalyticsByProduct.value.data.datasets[0].data = [
      response.receive_supdoc,
      response.draft_bc,
      response.gate_out,
      response.bc_skep,
      response.skep_release,
      response.ceisa_sppd
    ];

    chartKeyBP.value++;
  };

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
          image="/src/assets/icon/mdi_truck-check-outline.svg"
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

    <VRow class="pt-4">
      <VCol>
        <CardWithTitleImage 
          title="Customs Clearance" 
          color="light" 
          titleClass="title-center"
          image="/src/assets/icon/custom-clearance.svg"
        >

          <VRow class="pa-2 pt-6">
            <VCol>
              <CardWithTitleImage 
                title="Customs In Progress - Copper Cathode" 
                color="light" 
                titleClass="title-left"
              >
                <VRow>
                  <VCol v-for="data, idx in customInProgressAmount" :key="idx">
                    <AmountCardWithBackground v-bind="data" />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol>
                    <div class="d-flex align-end">
                      <div class="d-flex pa-1">
                      </div> 
                    <VSpacer />

                    <div class="d-flex">
                      <VTextField
                          v-model="tableFilterCustomInProgress.search"
                          density="compact"
                          hide-details="auto"
                          label="Search"
                          prepend-inner-icon="mdi-magnify"
                          rounded="pill"
                          :width="210"
                        />
                    </div>
                  </div>
                  
                    <VCard class="mt-3" :elevation="2">
                      <VDataTableServer
                        :header-props="{ class: 'font-weight-bold text-primary' }"
                        :headers="customInProgressHeader"
                        :items="tableCustomInProgress.data.value?.results"
                        :items-length="tableCustomInProgress.data.value?.count ?? 0"
                        :items-per-page="tableFilterCustomInProgress.itemsPerPage"
                        :loading="tableCustomInProgress.isLoading.value"
                        :page="tableFilterCustomInProgress.page"
                        @update:options="onUpdateTableOptionsCustomInProgress"
                      >
                        <template #item.last_status="{ item }">
                          <VChip
                            :class="[
                              'rounded',
                              'pa-2',
                              'text-center',
                            ]"
                            :color="item.last_status === 'Pickup Container' ? 'yellow-darken-4' : 'primary'"
                          >
                            {{ item.last_status }}
                          </VChip>
                        </template>
                      </VDataTableServer>
                    </VCard>
                  </VCol>
                </VRow>
              </CardWithTitleImage>
            </VCol>
          </VRow>

          <VRow class="pa-2 pt-6">
            <VCol>
              <CardWithTitleImage 
                title="Analytics Copper Cathode" 
                color="light" 
                titleClass="title-left"
              >
                <VRow> 
                  <VCol>
                    <div class="d-flex align-end">
                      <div class="d-flex pa-1">
                      </div> 
                    <VSpacer />

                    <div class="d-flex">
                      <VTextField
                        v-model="filterAnalyticCopperCathode.startDate"
                        class="flex-0-1 ml-3"
                        density="compact"
                        hide-details="auto"
                        label="Start Date"
                        rounded="pill"
                        type="date"
                        :width="200"
                      />
                      <VTextField
                        v-model="filterAnalyticCopperCathode.endDate"
                        class="flex-0-1 ml-3"
                        density="compact"
                        hide-details="auto"
                        label="End Date"
                        rounded="pill"
                        type="date"
                        :width="200"
                      />
                      <VSelect
                        v-model="filterAnalyticCopperCathode.types"
                        class="flex-0-1 ml-3"
                        density="compact"
                        hide-details="auto"
                        :items="shipmentTypes"
                        label="Types"
                        rounded="pill"
                        :width="210"
                      />
                    </div>
                  </div>
                  </VCol>
                </VRow>
                
                <VRow>
                  <VCol :md="8">
                    <BarChartHorizontalCard
                      :key="chartKeyCC"
                      :chart="ChartAnalyticsChoperChatode"
                      title=""
                    >
                    </BarChartHorizontalCard>
                    <VSpacer />
                  </VCol>
                  <VCol v-for="data, idx in analyticsCopperChatodeAmount" :key="idx" :md="2">
                    <AmountCardWithBackground v-bind="data" />
                  </VCol>
                </VRow>
              </CardWithTitleImage>
            </VCol>
          </VRow>

          <VRow class="pa-2 pt-6">
            <VCol>
              <CardWithTitleImage 
                title="Custom In Progress By Product" 
                color="light" 
                titleClass="title-left"
              >
                <VRow>
                  <VCol v-for="data, idx in customInProgressByProductAmount" :key="idx">
                    <AmountCardWithBackground v-bind="data" />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol>
                    <div class="d-flex align-end">
                      <div class="d-flex pa-1">
                      </div> 
                    <VSpacer />

                    <div class="d-flex">
                      <VTextField
                        v-model="tableFilterCustomInProgressBP.search"
                        density="compact"
                        hide-details="auto"
                        label="Search"
                        prepend-inner-icon="mdi-magnify"
                        rounded="pill"
                        :width="210"
                      />
                    </div>
                  </div>
                  
                    <VCard class="mt-3" :elevation="2">
                      <VDataTableServer
                        :header-props="{ class: 'font-weight-bold text-primary' }"
                        :headers="customInProgressBPHeader"
                        :items="tableCustomInProgressBP.data.value?.results"
                        :items-length="tableCustomInProgressBP.data.value?.count ?? 0"
                        :items-per-page="tableFilterCustomInProgressBP.itemsPerPage"
                        :loading="tableCustomInProgressBP.isLoading.value"
                        :page="tableFilterCustomInProgressBP.page"
                        @update:options="onUpdateTableOptionsCustomInProgressBP"
                      >
                        <template #item.last_status="{ item }">
                          <VChip
                            :class="[
                              'rounded',
                              'pa-2',
                              'text-center',
                            ]"
                            :color="item.last_status === 'Pickup Container' ? 'yellow-darken-4' : 'primary'"
                          >
                            {{ item.last_status }}
                          </VChip>
                        </template>
                      </VDataTableServer>
                    </VCard>
                  </VCol>
                </VRow>
                
              </CardWithTitleImage>
            </VCol>
          </VRow>

          <VRow class="pa-2 pt-6">
            <VCol>
              <CardWithTitleImage 
                title="Analytics By Product" 
                color="light" 
                titleClass="title-left"
              >
                <VRow>
                  <VCol>
                    <div class="d-flex align-end">
                      <div class="d-flex pa-1">
                      </div> 
                    <VSpacer />

                    <div class="d-flex">
                      <VTextField
                        v-model="filterAnalyticByProduct.startDate"
                        class="flex-0-1 ml-3"
                        density="compact"
                        hide-details="auto"
                        label="Start Date"
                        rounded="pill"
                        type="date"
                        :width="200"
                      />
                      <VTextField
                        v-model="filterAnalyticByProduct.endDate"
                        class="flex-0-1 ml-3"
                        density="compact"
                        hide-details="auto"
                        label="End Date"
                        rounded="pill"
                        type="date"
                        :width="200"
                      />
                      <VSelect
                        v-model="filterAnalyticByProduct.types"
                        class="flex-0-1 ml-3"
                        density="compact"
                        hide-details="auto"
                        :items="shipmentTypes"
                        label="Shipment"
                        rounded="pill"
                        :width="210"
                      />
                    </div>
                  </div>
                  </VCol>
                </VRow>

                <VRow>
                  <VCol :md="8">
                    <BarChartHorizontalCard
                      :key="chartKeyBP"
                      :chart="ChartAnalyticsByProduct"
                      title=""
                    >
                    </BarChartHorizontalCard>
                    <VSpacer />
                  </VCol>
                  <VCol v-for="data, idx in analyticsByProductAmount" :key="idx" :md="2">
                    <AmountCardWithBackground v-bind="data" />
                  </VCol>
                </VRow>
                
              </CardWithTitleImage>
            </VCol>
          </VRow>

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
