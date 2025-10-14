<template>
  <AppWrapper
    :drawer-links="drawerLinks"
    title="Dashboard PTFI - 3PL PTFI"
  />
</template>

<script setup lang="ts">
  const drawerLinks = [
    { title: 'Daily', to: '/3pl-ptfi/daily' },
    { title: 'Monthly', to: '/3pl-ptfi/monthly' },
    { title: 'KPI', to: '/3pl-ptfi/kpi' },
    { title: 'Financial', to: '/3pl-ptfi/financial' },
    { title: 'Operation and Safety', to: '/3pl-ptfi/operation-and-safety' },
    { title: 'Logout', to: '/', color: 'error' },
  ]
</script>
