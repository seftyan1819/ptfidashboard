<script setup lang="ts">
  import { useAuthStore } from './stores';

  const auth = useAuthStore()

  onMounted(() => {
    // auth.refreshLogin()
  })
</script>

<template>
  <RouterView />
  <!-- <RouterView v-if="auth.ready" /> -->
</template>
