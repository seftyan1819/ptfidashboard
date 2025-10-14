<script lang="ts">
  import type { RouteLocationRaw } from 'vue-router';

  type NavItem = { title: string; to: RouteLocationRaw }
  const kpiItems: NavItem[] = [
    { title: 'Daily', to: '/3pl/daily' },
    { title: 'Monthly', to: '/3pl/monthly' },
    { title: 'KPI', to: '/3pl/kpi' },
    { title: 'Financial', to: '/3pl/financial' },
    { title: 'Operation and Safety', to: '/3pl/operation-and-safety' },
  ]
  const triplptfiItems: NavItem[] = [
    { title: 'Daily', to: '/3pl-ptfi/daily' },
    { title: 'Monthly', to: '/3pl-ptfi/monthly' },
    { title: 'KPI', to: '/3pl-ptfi/kpi' },
    { title: 'Financial', to: '/3pl-ptfi/financial' },
    { title: 'Operation and Safety', to: '/3pl-ptfi/operation-and-safety' },
  ]
  const ffItems: NavItem[] = [
    { title: 'Cargo and Delivery Performance', to: '/ff/cargo-and-delivery-performance' },
    { title: 'Container and Truck Utilization', to: '/ff/container-and-truck-utilization' },
    { title: 'Documents', to: '/ff/documents' },
    { title: 'KPI', to: '/ff/kpi' },
  ]
  const uploadItems: NavItem[] = [
    { title: 'KPI', to: '/upload/kpi' },
    { title: 'Forklift', to: '/upload/forklift' },
    { title: 'Water', to: '/upload/water' },
    { title: 'Manpower', to: '/upload/manpower' },
    { title: 'Shipment By Product', to: '/upload/shipmentbyproduct' },
  ]
</script>

<script setup lang="ts">
  const props = defineProps<{ type: string }>()
  const items = computed<NavItem[] | null>(() => {
    switch (props.type) {
      case '3pl':
        return kpiItems;
      case '3pl-ptfi':
        return triplptfiItems;
      case 'ff':
        return ffItems;
      case 'upload':
        return uploadItems;
      default:
        return null
    }
  });
</script>

<template>
  <VCard v-if="items" class="d-flex justify-space-between" :elevation="3">
    <VBtn icon :to="items[0].to">
      <VImg src="@/assets/icon/home.svg" :width="24" />
    </VBtn>
    <VBtn
      v-for="(item, idx) in items"
      :key="idx"
      :active="false"
      class="font-weight-bold"
      :elevation="0"
      :height="48"
      :min-width="type !== 'ff' ? 150 : undefined"
      :text="item.title"
      :to="item.to"
      :value="item.to"
      :variant="$route.name === item.to ? 'elevated' : 'text'"
    />
  </VCard>
</template>
