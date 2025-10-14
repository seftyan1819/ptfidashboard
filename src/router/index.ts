/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { useAuthStore } from '@/stores'
import { until } from '@vueuse/core'

// routes.find(r => r.path === '/3pl')?.children?.push({
//   path: '',
//   redirect: '/3pl/daily',
// })

routes.find(r => r.path === '/')?.children?.push({
  path: '/',
  redirect: '/ptfiDaily',
  // redirect: '/3pl-ptfi/daily',
})
// routes.find(r => r.path === '/ff')?.children?.push({
//   path: '',
//   redirect: '/ff/cargo-and-delivery-performance',
// })
// routes.find(r => r.path === '/upload')?.children?.push({
//   path: '',
//   redirect: '/upload/kpi',
// })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

// router.beforeEach(async to => {
//   const auth = useAuthStore()
//   const { ready } = storeToRefs(auth)

//   await until(ready).toBe(true)
//   if (to.meta.authRequired !== false && !auth.isLoggedIn) {
//     return { name: '/login', query: { next: to.path } }
//   }
// })

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
