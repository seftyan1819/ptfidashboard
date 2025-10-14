<script setup lang="ts">
  import { VCol } from 'vuetify/components'

  withDefaults(defineProps<{
    items: { title: string, value: number }[]
    md?: InstanceType<typeof VCol>['$props']['md']
  }>(), {
    md: 3,
  })
</script>

<template>
  <v-container>
    <div class="text-h3 mb-4">KPI</div>
    <v-row class="pa-1 justify-center">
      <v-col
        v-for="item, idx in items"
        :key="idx"
        class="pa-2"
        :cols="12"
        :md="md"
        :sm="6"
      >
        <div
          :class="['bg-surface-container', 'text-on-surface', 'rounded-lg',
                   'text-center', 'px-3', 'py-6', 'h-100', 'd-flex',
                   'flex-column', 'justify-center']"
        >
          <div class="text-h4">{{ item.value }}%</div>
          <div class="text-body-2">{{ item.title }}</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
