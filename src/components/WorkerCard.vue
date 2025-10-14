<script setup lang="ts">
  import svgWorker from '@/assets/icon/icon-park-twotone_worker.svg'
</script>

<template>
  <div class="primary-shadow d-flex align-center px-6 py-0 rounded-pill">
    <div class="font-weight-bold">TODAY</div>
    <div class="px-1">
      <VImg :src="svgWorker" :width="36" />
    </div>
    <div>
      <div class="font-weight-bold">15 Workers</div>
      <div class="mt-n1">Shift 1</div>
    </div>
  </div>
</template>
