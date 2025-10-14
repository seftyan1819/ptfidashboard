<script setup lang="ts">
  const route = useRoute()
  const navType = computed(() => route.name.split('/')[1])
</script>

<template>
  <VApp>
    <!-- <AppBar /> -->

    <VMain>
      <VContainer v-if="$route.name !== '/'">
        <NavigationTabs :type="navType" />
      </VContainer>

      <RouterView />
    </VMain>
  </VApp>
</template>
