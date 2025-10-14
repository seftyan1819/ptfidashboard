<template>
  <v-app>
    <v-app-bar class="position-fixed" color="primary">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" class="position-fixed" location="left">
      <v-list-item
        v-for="(l, i) in drawerLinks"
        :key="i"
        :base-color="l.color"
        color="primary"
        link
        :title="l.title"
        :to="l.to"
      />
    </v-navigation-drawer>

    <v-main>
      <router-view />
      <AppFooter />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import type { RouteLocationRaw } from 'vue-router'

  type DrawerLink = { title: string; to: RouteLocationRaw, color?: string };

  defineProps<{
    title: string
    drawerLinks: DrawerLink[]
  }>()

  const drawer = ref(false)
</script>
