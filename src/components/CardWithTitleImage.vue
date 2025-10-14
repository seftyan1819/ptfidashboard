<script setup lang="ts">
  import { computed } from 'vue'
  import { useDisplay } from 'vuetify'

  const props = 
  withDefaults(
    defineProps<{ title: string, color?: string, titleClass: string, image?: string}>(),
    { color: 'primary' },
  )

  const { mobile } = useDisplay()

  const titleClass = computed(() => mobile.value ? 'title-left' :  props.titleClass)
</script>

<template>
  <VCard class="position-relative overflow-visible px-3 pb-3 pt-4" :elevation="4">
    <div
      :class="[
          titleClass,
          'position-absolute',
          'bg-primary',
          'font-weight-bold',
          'text-light',
          'rounded-xl',
          'd-flex',
          'justify-start',
          'align-center',
          'border-sm'
      ]"
      style="background: rgb(var(--v-theme-background))"
    >
        <div class="d-flex align-center">
          <div v-if="image" class="pa-2 text-center bg-white rounded-xl">
            <VImg 
              :height="$vuetify.display.xs ? 18 : 22" 
              :src="image" 
              :width="$vuetify.display.xs ? 24 : 30" 
            />
          </div>  
          <div class="pa-2 text-center title-text">
            {{ title }}
          </div>
        </div> 
        
    </div>
    <VCardText>
      <slot />
    </VCardText>
  </VCard>
</template>

<style lang="sass" scoped>
  .title-left
    position: absolute
    left: 24px
    top: -16px
    
    // Mobile specific adjustments for title-left
    @media (max-width: 599px)
      left: 16px
      top: -12px
      
    @media (max-width: 480px)
      left: 12px
      top: -10px
    
  .title-center
    position: absolute
    left: 38%
    top: -16px
    
    // Desktop/tablet center positioning
    @media (min-width: 600px)
      left: 50%
      transform: translateX(-50%)
      
  .title-text
    @media (max-width: 599px)
      font-size: 0.875rem !important
      padding: 8px 12px !important
      
    @media (max-width: 480px)
      font-size: 0.75rem !important
      padding: 6px 8px !important
      
  // Adjust card padding on mobile
  .v-card
    @media (max-width: 599px)
      padding-left: 16px !important
      padding-right: 16px !important
      
    @media (max-width: 480px)
      padding-left: 12px !important
      padding-right: 12px !important
</style>