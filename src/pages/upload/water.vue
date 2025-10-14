<script setup lang="ts">
  import dayjs from 'dayjs';
</script>

<template>
  <UploadPage
    download-template-url="/upload-template/template-water.xlsx"
    get-data-url="upload/water/"
    import-url="upload/water/import/"
    :table-headers="[
      { key: 'id', title: 'ID' },
      {
        key: 'date',
        title: 'Date',
        value: (item) => dayjs(item.date).format('YYYY-MM-DD')
      },
      { key: 'water_consumption', title: 'Water Consumption', align: 'end' },
      { key: 'target', title: 'Target', align: 'end' },
    ]"
  />
</template>
