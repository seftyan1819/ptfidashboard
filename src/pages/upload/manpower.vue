<script setup lang="ts">
  import dayjs from 'dayjs';
</script>

<template>
  <UploadPage
    download-template-url="/upload-template/template-manpower.xlsx"
    get-data-url="upload/manpower/"
    import-url="upload/manpower/import/"
    :table-headers="[
      { key: 'id', title: 'ID' },
      {
        key: 'shift_date',
        title: 'Shift Date',
        value: (item) => dayjs(item.shift_date).format('YYYY-MM-DD')
      },
      { key: 'total_manpower', title: 'Total Manpower', align: 'end' },
      { key: 'shift_1', title: 'Shift 1', align: 'end' },
      { key: 'shift_2', title: 'Shift 2', align: 'end' },
    ]"
  />
</template>
