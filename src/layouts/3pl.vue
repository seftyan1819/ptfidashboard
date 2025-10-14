<template>
  <AppWrapper
    :drawer-links="drawerLinks"
    title="Dashboard PTFI - 3PL"
  />
</template>

<script setup lang="ts">
  const drawerLinks = [
    { title: 'Daily', to: '/3pl/daily' },
    { title: 'Monthly', to: '/3pl/monthly' },
    { title: 'KPI', to: '/3pl/kpi' },
    { title: 'Financial', to: '/3pl/financial' },
    { title: 'Operation and Safety', to: '/3pl/operation-and-safety' },
    { title: 'Logout', to: '/', color: 'error' },
  ]
</script>
