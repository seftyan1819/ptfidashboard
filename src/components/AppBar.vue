<script setup lang="ts">
  import { useLogout } from '@/api/auth.api';
  import { useAuthStore } from '@/stores';

  const route = useRoute()
  const router = useRouter()
  const auth = useAuthStore()

  const { mutate: logout } = useLogout(() => {
    auth.clearAccessToken()
    router.push('/login')
  })
  const drawer = ref(false)

  const title = computed(() => {
    if (route.name.startsWith('/3pl')) {
      return '3PL Dashboard'
    }else if (route.name.startsWith('/3pl-ptfi')) {
      return '3PL PTFI Dashboard'
    } else if (route.name.startsWith('/ff')) {
      return 'Freight Forwarding'
    } else {
      return 'Dashboard PTFI'
    }
  })
</script>

<template>
  <VAppBar class="bg-gradient" :elevation="4">
    <template #prepend>
      <VAppBarNavIcon color="white" @click="drawer = !drawer" />
    </template>
    <VAppBarTitle class="font-weight-bold">
      <div class="d-flex align-center">
        <div class="mr-4">
          <VImg
            div
            src="@/assets/img/ckb-logo-white.png"
            :width="100"
          />
        </div>
        <div class="mr-4">
          <VImg
            div
            src="@/assets/img/freeport-mcmoran-logo-only.png"
            :width="64"
          />
        </div>
        <div>{{ title }}</div>
      </div>
    </VAppBarTitle>

    <template #append>
      <div class="d-flex pr-6" style="font-size: 15px" @click="logout()">
        <VImg src="@/assets/icon/qlementine-icons_user-16.svg" :width="36" />
        <div class="pl-2">
          <div class="font-weight-bold">{{ auth.user?.user_id }}</div>
          <div>{{ auth.user?.role }}</div>
        </div>
      </div>
    </template>
  </VAppBar>
  <AppDrawer v-model="drawer" />
</template>

<style lang="sass" scoped>
.bg-gradient
  background-image: linear-gradient(
    to right,
    rgb(var(--v-theme-primary)),
    white 400px
  ) !important
</style>
