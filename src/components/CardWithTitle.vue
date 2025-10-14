<script setup lang="ts">
  withDefaults(
    defineProps<{ title: string, color?: string }>(),
    { color: 'primary' }
  )
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
      <slot />
    </VCardText>
  </VCard>
</template>

<style lang="sass" scoped>
  .title
    position: absolute
    left: 24px
    top: -16px
</style>
