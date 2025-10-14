<script setup lang="ts">
  import dayjs from 'dayjs';
</script>

<template>
  <UploadPage
    download-template-url="/upload-template/template-forklift.xlsx"
    get-data-url="upload/forklift/"
    import-url="upload/forklift/import/"
    :table-headers="[
      { key: 'id', title: 'ID' },
      { key: 'forklift_id', title: 'Forklift ID' },
      { key: 'km_usage', title: 'KM Usage', align: 'end' },
      { key: 'condition', title: 'Condition' },
      {
        key: 'date',
        title: 'Date',
        value: (item) => dayjs(item.date).format('YYYY-MM-DD')
      },
    ]"
  />
</template>
