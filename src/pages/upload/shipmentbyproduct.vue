<script setup lang="ts">
  import dayjs from 'dayjs';
  import customParseFormat from 'dayjs/plugin/customParseFormat';

  // Enable the plugin to parse custom formats
  dayjs.extend(customParseFormat);
</script>

<template>
  <UploadPage
    download-template-url="/upload-template/template-shipment-by-product.xlsx"
    get-data-url="upload/shipmentbyproduct/"
    import-url="upload/shipmentbyproduct/import/"
    :table-headers="[
      { key: 'id', title: 'ID' },
      {
        key: 'ship_date',
        title: 'Ship Date',
        value: (item) => dayjs(item.ship_date).format('YYYY-MM-DD')
      },
      { key: 'bol_no', title: 'BOL No.', align: 'end' },
      { key: 'shipment_description', title: 'Shipment Description', align: 'end' },
      { key: 'release_number', title: 'Release Number', align: 'end' },
      { key: 'carrier', title: 'Carrier', align: 'end' },
      { key: 'vehicle_no', title: 'Vehicle No', align: 'end' },
      { key: 'seal_number', title: 'Seal Number', align: 'end' },
      { key: 'origin_company', title: 'Origin Company', align: 'end' },
      { key: 'origin_plant', title: 'Origin Plant', align: 'end' },
      { key: 'material_group', title: 'Material Group', align: 'end' },
      { key: 'material_description', title: 'Material Description', align: 'end' },
      { key: 'ship_to_customer', title: 'Ship To Customer', align: 'end' },
      { key: 'country', title: 'Country', align: 'end' },
      { key: 'city', title: 'City', align: 'end' },
      { key: 'ship_to_state', title: 'Ship To State', align: 'end' },
      { key: 'bill_to_customer', title: 'Bill To Customer', align: 'end' },
      { key: 'sold_to_party', title: 'Sold To Party', align: 'end' },
      { key: 'sold_to_party_name', title: 'Sold To Party Name', align: 'end' },
      { key: 'shipping_type', title: 'Shipping Type', align: 'end' },
      { key: 'shipment_type', title: 'Shipment Type', align: 'end' },
      { key: 'sales_doc_type', title: 'Sales Doc Type', align: 'end' },
      { key: 'shipping_condition', title: 'Shipping Condition', align: 'end' },
      { key: 'freight_terms', title: 'Freight Terms', align: 'end' },
      { key: 'inco_terms_1', title: 'Inco Terms 1', align: 'end' },
      { key: 'inco_terms_2', title: 'Inco Terms 2', align: 'end' },
      { key: 'order_no', title: 'Order No', align: 'end' },
      { key: 'customer_po', title: 'Customer PO', align: 'end' },
      { key: 'quantity_ordered', title: 'Quantity Ordered', align: 'end' },
      { key: 'uom_quantity_ordered', title: 'UOM', align: 'end' },
      { key: 'stop', title: 'Stop', align: 'end' },
      { key: 'delivery_quantity', title: 'Delivery Quantity', align: 'end' },
      { key: 'net_quantity', title: 'Net Quantity', align: 'end' },
      { key: 'uom_net_quantity', title: 'UOM', align: 'end' },
      { key: 'gross_quantity', title: 'Gross Quantity', align: 'end' },
      { key: 'uom_gross_quantity', title: 'UOM', align: 'end' },
      { 
        key: 'sched_del_date',
        title: 'Shced Del Date',
        value: (item) => dayjs(item.sched_del_date).format('YYYY-MM-DD')
      },
      { 
        key: 'actual_del_date',
        title: 'Actual Del Date',
        value: (item) => dayjs(item.actual_del_date).format('YYYY-MM-DD') 
      },
      { 
        key: 'actual_delivery_time',
        title: 'Actual Delivery Time', 
        value: (item) => dayjs(item.actual_delivery_time, 'HH:mm:ss').format('h:mm A')
      },
      { 
        key: 'scheduled_shipment_start_date',
        title: 'Shceduled Shipment Start Date',
        value: (item) => dayjs(item.scheduled_shipment_start_date).format('YYYY-MM-DD')
      },
      { 
        key: 'scheduled_shipment_start_time',
        title: 'Shceduled Shipment Start Time',
        value: (item) => dayjs(item.scheduled_shipment_start_time, 'HH:mm:ss').format('h:mm A')
      },
      { 
        key: 'appt_pu_start_date',
        title: 'Appt p/u Start Date',
        value: (item) => dayjs(item.appt_pu_start_date).format('YYYY-MM-DD')
      },
      { 
        key: 'appt_pu_start_time',
        title: 'Appt p/u Start Time',
        value: (item) => dayjs(item.appt_pu_start_time, 'HH:mm:ss').format('h:mm A')  
      },
      { 
        key: 'appt_pu_end_date',
        title: 'Appt p/u End Date',
        value: (item) => dayjs(item.appt_pu_end_date).format('YYYY-MM-DD')
      },
      { 
        key: 'appt_pu_end_time',
        title: 'Appt p/u End Time',
        value: (item) => dayjs(item.appt_pu_end_time, 'HH:mm:ss').format('h:mm A')
      },
      { 
        key: 'check_in',
        title: 'Check In',
        value: (item) => dayjs(item.check_in).format('YYYY-MM-DD')
      },
      { 
        key: 'check_in_time',
        title: 'Check In Time',
        value: (item) => dayjs(item.check_in_time, 'HH:mm:ss').format('h:mm A')
      },
      { 
        key: 'shipment_complete',
        title: 'Shipment Complete',
        value: (item) => dayjs(item.shipment_complete).format('YYYY-MM-DD')
      },
      { 
        key: 'check_out_time',
        title: 'Check Out Time',
        value: (item) => dayjs(item.check_out_time, 'HH:mm:ss').format('h:mm A')
      },
      { key: 'total_lead_time', title: 'Total Lead Time', align: 'end' },
      { key: 'delivery', title: 'Delivery', align: 'end' },
      { key: 'storage_location', title: 'Storage Location', align: 'end' },
      { key: 'count', title: 'Count', align: 'end' },
      { 
        key: 'order_line_date',
        title: 'Order Line Date',
        value: (item) => dayjs(item.order_line_date).format('YYYY-MM-DD')
      },
      { 
        key: 'order_line_time',
        title: 'Order Line Time',
        value: (item) => dayjs(item.order_line_time, 'HH:mm:ss').format('h:mm A')  
      },
      { key: 'order_line_by', title: 'Order Line By', align: 'end' },
    ]"
  />
</template>



