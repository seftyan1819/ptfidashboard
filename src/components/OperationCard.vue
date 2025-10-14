<script setup lang="ts">
  defineProps<{
    color: string,
    title: string,
    image: string,
    amounts: {
      label: string,
      value: number,
      type: 'outlined' | 'separated' | 'separated-highlight'
    }[]
  }>()
</script>

<template>
  <VCard class="position-relative overflow-visible" :elevation="4">
    <div
      :class="[
        'title',
        'position-absolute',
        `text-${color}`,
        'font-weight-bold',
        'px-2',
      ]"
      style="background: rgb(var(--v-theme-background))"
    >
      {{ title }}
    </div>
    <VCardText>
      <VRow>
        <VCol :cols="3">
          <VCard class="h-100 pa-2" :elevation="4">
            <VImg :height="70" :src="image" />
          </VCard>
        </VCol>
        <VCol v-for="amount, idx in amounts" :key="idx" :cols="3">
          <VCard
            v-if="amount.type === 'outlined'"
            class="h-100 pa-2 text-center"
            :elevation="4"
          >
            <div :class="`text-caption font-weight-bold text-${color}`">
              {{ amount.label }}
            </div>
            <div class="text-h3">{{ amount.value }}</div>
          </VCard>
          <div v-else>
            <VCard
              class="mb-2 text-center text-caption font-weight-bold"
              :class="{
                [`bg-${color}`]: amount.type === 'separated-highlight',
                [`text-${color}`]: amount.type === 'separated',
              }"
              :elevation="4"
            >
              {{ amount.label }}
            </VCard>
            <VCard
              class="h-100 pa-1 text-center"
              :class="{ [`bg-${color}`]: amount.type === 'separated-highlight' }"
              :elevation="4"
            >
              <div :class="`text-caption font-weight-bold text-${color}`" />
              <div class="text-h3">{{ amount.value }}</div>
            </VCard>
          </div>
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <slot name="chart" />
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style lang="sass" scoped>
  .title
    position: absolute
    left: 24px
    top: -16px
</style>
