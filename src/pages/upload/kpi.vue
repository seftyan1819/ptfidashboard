<template>
  <UploadPage
    download-template-url="/upload-template/template-kpi.xlsx"
    get-data-url="upload/kpi/"
    import-url="upload/kpi/import/"
    :table-headers="[
      { key: 'id', title: 'ID' },
      { key: 'category', title: 'Category' },
      { key: 'year', title: 'Year', align: 'end' },
      { key: 'month', title: 'Month', align: 'end' },
      { key: 'value', title: 'Value', align: 'end', value: item => item.value + '%' },
    ]"
  />
</template>
