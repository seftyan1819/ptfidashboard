<script setup lang="ts">
  withDefaults(
    defineProps<{
      img: string
      title: string
      amount: string
      color?: string
      percentage?: number
      percentageColor?: string
    }>(),
    {
      color: 'primary',
      percentageColor: 'primary',
    }
  )
</script>

<template>
  <VCard class="d-flex" :elevation="4">
    <div
      class="pa-2"
      style="width: 90px; height: 90px"
    >
      <div
        class="rounded-xl pa-3"
        :class="[color === 'error' ? 'error-shadow' : 'primary-shadow']"
      >
        <VImg :src="img" />
      </div>
    </div>

    <div class="text-center flex-1-1 py-1 pr-2">
      <div class="text-primary font-weight-bold">{{ title }}</div>
      <div class="text-secondary text-h4 font-weight-bold">{{ amount }}</div>
      <div v-if="percentage" class="d-flex align-center ma-n1 px-2">
        <VProgressLinear
          :color="percentageColor"
          :height="8"
          :model-value="percentage"
          rounded="pill"
        />
        <div :class="`pl-2 text-caption text-${percentageColor}`">
          {{ percentage }}%
        </div>
      </div>
    </div>
  </VCard>
</template>
