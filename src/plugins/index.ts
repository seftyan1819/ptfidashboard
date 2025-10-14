/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'

// Defaults
import './chartjs'

// Types
import type { App } from 'vue'
import { PiniaColada } from '@pinia/colada'

export const registerPlugins = (app: App) => {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(PiniaColada, {
      queryOptions: {
        staleTime: 1800 * 1000, // 30 minutes
      },
    })
}
