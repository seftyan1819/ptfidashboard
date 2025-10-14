<script setup lang="ts">
  // import iconHome from '@/assets/icon/home.svg'
  // import iconShip from '@/assets/icon/ship.svg'
  // import iconUpload from '@/assets/icon/upload.svg'

  // const buttons = [
  //   { text: '3PL', iconSrc: iconHome, to: '/3pl' },
  //   { text: '3PL PTFI', iconSrc: iconHome, to: '/3pl-ptfi' },
  //   { text: 'FREIGHT FORWARDER', iconSrc: iconShip, to: '/ff' },
  //   { text: 'UPLOAD', iconSrc: iconUpload, to: '/upload' },
  // ]



  const router = useRouter()
  const route = useRoute('/')
  router.push(route.query.next?.toString() ?? '/ptfiDaily')
  
</script>

<template>
  <div class="h-100 position-relative">
    <VImg
      class="position-absolute h-100 w-100"
      cover
      src="@/assets/img/ckb-background.png"
    />
    <!-- <VContainer
      class="d-flex h-100 align-center justify-center flex-wrap ga-16"
    >
      <VBtn v-for="btn in buttons" :key="btn.text" class="button" :to="btn.to">
        <div class="pt-3 text-center">
          <VImg class="mx-auto" :height="160" :src="btn.iconSrc" :width="160" />
          <div class="font-weight-bold pt-2">{{ btn.text }}</div>
        </div>
      </VBtn>
    </VContainer> -->
  </div>
</template>

<style lang="sass" scoped>
.button
  height: 240px !important
  width: 240px
  font-size: 15px
</style>
