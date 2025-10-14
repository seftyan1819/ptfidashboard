<route lang="yaml">
  meta:
    layout: blank
    authRequired: false
</route>

<script setup lang="ts">
  import { useAuthStore } from '@/stores'

  const router = useRouter()
  const route = useRoute('/login')
  const auth = useAuthStore()

  watchEffect(() => {
    if (auth.isLoggedIn) {
      router.push(route.query.next?.toString() ?? '/ptfiDaily')
    }
  })
</script>

<template>
  <div class="h-100 position-relative">
    <VImg
      class="position-absolute h-100 w-100"
      cover
      src="@/assets/img/ckb-background.png"
    />
    <VContainer
      class="d-flex h-100 align-center justify-center flex-column"
    >
      <div class="d-flex w-100 align-center">
        <div>
          <VImg
            div
            src="@/assets/img/ckb-logo.png"
            :width="160"
          />
        </div>
        <div class="ml-4">
          <VImg
            div
            src="@/assets/img/freeport-mcmoran-logo-only.png"
            :width="100"
          />
        </div>
      </div>
      <VSpacer />
      <VCard max-width="100%" :width="840">
        <VRow>
          <VCol :cols="6">
            <VImg
              class="w-100 h-100"
              cover
              rounded="xl"
              src="@/assets/img/ship.png"
            />
          </VCol>
          <VCol :cols="6">
            <div class="pr-6">
              <p
                class="text-center py-6 font-weight-bold text-primary"
                style="font-size: 14pt;"
              >
                3PL & FREIGHT FORWARDER DASHBOARD
              </p>
              <LoginCard />
            </div>
          </VCol>
        </VRow>
      </VCard>
      <VSpacer />
    </VContainer>
  </div>
</template>
