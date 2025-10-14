<script setup lang="ts">
  import { api } from '@/helpers/api'
  import type { VDataTable } from 'vuetify/components'

  const props = defineProps<{
    tableHeaders: VDataTable['$props']['headers'],
    getDataUrl: string,
    importUrl: string,
    downloadTemplateUrl: string
  }>()

  // table
  type Options = {
    page: number,
    itemsPerPage: number,
    sortBy: { key: string, order: 'asc' | 'desc' }[],
  }
  const tableOptions = ref<Options>({ page: 1, itemsPerPage: 10, sortBy: [] })
  const tableData = ref<{ data: unknown[], count: number }>()
  const loading = ref(false)
  const loadData = async (options?: Options) => {
    console.log(options?.sortBy)
    loading.value = true
    try {
      // await new Promise(resolve => setTimeout(resolve, 1000))
      tableData.value = await api.get(props.getDataUrl, {
        limit: tableOptions.value.itemsPerPage,
        offset: (tableOptions.value.page - 1) * tableOptions.value.itemsPerPage,
        sortBy: JSON.stringify(tableOptions.value.sortBy),
      })
    } catch {
      alert('Get data error!')
    } finally {
      loading.value = false
    }
  }

  // import
  const file = ref()
  const importLoading = ref(false)
  const submitImport = async () => {
    if (!file.value) {
      alert('File required!')
      return
    }

    importLoading.value = true
    const formData = new FormData()
    formData.append('file', file.value)
    try {
      await api.post(props.importUrl, formData)
      loadData()
      file.value = undefined
    } catch {
      alert('Import error!')
    } finally {
      importLoading.value = false
    }
  }
</script>
<template>
  <VContainer>
    <VCard>
      <VCardTitle class="d-flex">
        <div>
          Import
        </div>
        <VSpacer />
        <div>
          <VBtn
            :href="downloadTemplateUrl"
            prepend-icon="mdi-download"
            text="Download Template"
            variant="tonal"
          />
        </div>
      </VCardTitle>
      <VCardText class="d-flex">
        <VFileInput
          v-model="file"
          density="compact"
          hide-details="auto"
          label="File"
          rounded="pill"
        />
        <div>
          <VBtn
            class="ml-3"
            :disabled="importLoading"
            prepend-icon="mdi-upload"
            text="Upload"
            @click="submitImport"
          />
        </div>
      </VCardText>
    </VCard>

    <VCard class="mt-4" :elevation="4">
      <VDataTableServer
        v-model:options="tableOptions"
        :header-props="{ class: 'font-weight-bold text-primary' }"
        :headers="tableHeaders"
        :items="tableData ? tableData.data : []"
        :items-length="tableData ? tableData.count : 0"
        :loading="loading"
        @update:options="loadData"
      />
    </VCard>

  </VContainer>
</template>
