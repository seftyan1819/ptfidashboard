<script setup lang="ts">
  withDefaults(
    defineProps<{
      img: string
      title: string
      amount: number
      color?: string
      cardType: string,
    }>(),
    {
      color: 'primary',
      percentageColor: 'primary',
    }
  )
    const getGradientStyle = (type: string) => {
      const gradients: Record<string, string> = {
        yellow: 'background: linear-gradient(135deg, #fef6d5 0%, #fde896 100%)',
        blue: 'background: linear-gradient(135deg, #d4ebf7 0%, #a8d5f2 100%)',
        lightblue: 'background: linear-gradient(135deg, #d4ebf7 0%, #92FFF6 100%)',
        green: 'background: linear-gradient(135deg, #d4f5d4 0%, #a8e6a8 100%)',
        darkgreen: 'background: linear-gradient(135deg, #d4f5d4 0%, #039A03 100%)',
        red: 'background: linear-gradient(135deg, #fdd5d5 0%, #fcb3b3 100%)',
        purple: 'background: linear-gradient(135deg, #f5d4f5 0%, #eba8eb 100%)',
        darkpurple: 'background: linear-gradient(135deg, #f5d4f5 0%, #8C088C 100%)',
        orange: 'background: linear-gradient(135deg, #fff5d4 0%, #E9A944 100%)',
        lightorange: 'background: linear-gradient(135deg, #fff5d4 0%, #F4D099 100%)',
        lightgreen: 'background: linear-gradient(135deg, #d9f7d9 0%, #b3f0b3 100%)',
        grey: 'background: linear-gradient(135deg, #BEBEBE 0%, #EBECF0 100%)'
      };
      return gradients[type] || gradients.yellow;
    }

    const getImageFilter = (type: string) => {
      const filters: Record<string, string> = {
        yellow: 'invert(77%) sepia(48%) saturate(455%) hue-rotate(358deg) brightness(102%) contrast(98%)',
        blue: 'invert(64%) sepia(25%) saturate(819%) hue-rotate(169deg) brightness(96%) contrast(92%)',
        lightblue: 'invert(64%) sepia(25%) saturate(819%) hue-rotate(169deg) brightness(96%) contrast(92%)',
        green: 'invert(85%) sepia(18%) saturate(1018%) hue-rotate(71deg) brightness(94%) contrast(89%)',
        darkgreen: 'invert(85%) sepia(18%) saturate(1018%) hue-rotate(71deg) brightness(94%) contrast(89%)',
        red: 'invert(69%) sepia(25%) saturate(1753%) hue-rotate(310deg) brightness(101%) contrast(98%)',
        purple: 'invert(70%) sepia(25%) saturate(1444%) hue-rotate(254deg) brightness(95%) contrast(92%)',
        darkpurple: 'invert(70%) sepia(25%) saturate(1444%) hue-rotate(254deg) brightness(95%) contrast(92%)',
        orange: 'invert(81%) sepia(35%) saturate(682%) hue-rotate(340deg) brightness(104%) contrast(101%)',
        lightorange: 'invert(81%) sepia(35%) saturate(682%) hue-rotate(340deg) brightness(104%) contrast(101%)',
        lightgreen: 'invert(90%) sepia(12%) saturate(831%) hue-rotate(67deg) brightness(98%) contrast(91%)',
        grey: 'invert(20%) sepia(12%) saturate(200%) hue-rotate(20deg) brightness(100%) contrast(50%)'
      };
      return filters[type] || filters.blue;
    }
</script>

<template>
<VCard class="d-flex flex-column" :elevation="4" :style="getGradientStyle(cardType)">
  <div class="d-flex pt-2">
    <div class="text-left flex-1-1 py-2 pl-3 d-flex align-center">
      <div class="text-secondary text-h4 font-weight-bold">{{ amount }}</div>
    </div>
    <div class="pa-2 flex-1-1 d-flex justify-end align-center">
      <div
        class="rounded-circle d-flex justify-center align-center"
        style="height: 40px; width: 40px; background-color: rgba(255, 255, 255, 0.6); "
      >
        <VImg :src="img" :style="`height: 60%; width: 60%; filter: ${getImageFilter(cardType)}`"  contain />
      </div>
    </div>
  </div>
  <div class="text-primary font-weight-bold pb-2 pl-3">{{ title }}</div>
</VCard>
</template>