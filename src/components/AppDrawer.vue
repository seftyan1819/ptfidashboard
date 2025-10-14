<script setup lang="ts">
  import { useLogout } from '@/api/auth.api';
  import { useAuthStore } from '@/stores';
  import type { VListItem } from 'vuetify/components';

  const visible = defineModel<boolean>({ default: false })

  const route = useRoute()
  const router = useRouter()
  const auth = useAuthStore()

  const { mutate: logout, isLoading: logoutLoading } = useLogout(() => {
    auth.clearAccessToken()
    router.push('/login')
  })
  const textLogout = 'Log Out'
  const items = computed<VListItem['$props'][]>(() => [
    { title: 'Main Menu', to: '/', active: route.name === '/' },
    { title: '3PL Dashboard', to: '/3pl' },
    { title: '3PL PTFI Dashboard', to: '/3pl-ptfi' },
    { title: 'FF Dashboard', to: '/ff' },
    { title: 'Upload', to: '/upload' },
    {
      title: textLogout,
      prependIcon: 'mdi-logout',
      disabled: logoutLoading.value,
      onClick: () => logout(),
    },
  ])
</script>

<template>
  <VNavigationDrawer v-model="visible">
    <VListItem
      v-for="{ prependIcon, ...item}, idx in items"
      :key="idx"
      v-bind="item"
      :height="50"
    >
      <template #title>
        <VListItemTitle
          :class="{
            'text-uppercase': item.title !== textLogout,
            'font-weight-bold': item.title !== textLogout,
            'text-end': item.title === textLogout,
            'text-decoration-underline': item.title === textLogout,
          }"
        >
          <VIcon v-if="prependIcon" class="mr-3" :icon="prependIcon" size="small" />
          <span>{{ item.title }}</span>
        </VListItemTitle>
      </template>
    </VListItem>
  </VNavigationDrawer>
</template>
