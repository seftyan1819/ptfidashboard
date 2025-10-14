<template>
  <AppWrapper
    :drawer-links="drawerLinks"
    title="Dashboard PTFI - Freight Forwarding"
  />
</template>

<script setup lang="ts">
  const drawerLinks = [
    { title: 'Cargo and Delivery Performance', to: '/ff/cargo-and-delivery-performance' },
    { title: 'Container and Truck Utilization', to: '/ff/container-and-truck-utilization' },
    { title: 'Documents', to: '/ff/documents' },
    { title: 'KPI', to: '/ff/kpi' },
    { title: 'Logout', to: '/', color: 'error' },
  ]
</script>
