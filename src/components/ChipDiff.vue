<script setup lang="ts">
  defineProps<{
    percentage: number
    unit: string
  }>()
</script>

<template>
  <div>
    <VChip
      class="mx-1"
      :color="percentage >= 0 ? 'primary' : 'error'"
      density="compact"
      rounded="pill"
      size="small"
      :text="(percentage > 0 ? '+' : '') + percentage + '%'"
    />
    <span class="text-outline text-caption font-italic">vs last {{ unit }}</span>
  </div>
</template>
