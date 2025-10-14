/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import materialTheme from '@/styles/material-theme.json'

// Composables
import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'

const theme = materialTheme.schemes.light
// const darkTheme = materialTheme.schemes.dark

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  blueprint: md3,
  theme: {
    // defaultTheme: 'dark',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: theme.primary,
          'on-primary': theme.onPrimary,
          'primary-container': theme.primaryContainer,
          'on-primary-container': theme.onPrimaryContainer,
          secondary: theme.secondary,
          'on-secondary': theme.onSecondary,
          tertiary: theme.tertiary,
          'on-tertiary': theme.onTertiary,
          error: theme.error,
          'on-error': theme.onError,
          'error-container': theme.errorContainer,
          'on-error-container': theme.onErrorContainer,
          // background: theme.background,
          background: '#ffffff',
          'on-background': theme.onBackground,
          // surface: lightTheme.surface,
          surface: '#ffffff',
          'on-surface': theme.onSurface,
          'surface-container': theme.surfaceContainer,
          'on-surface-container': theme.onSurface,
          success: theme.primary,
          'on-success': theme.onPrimary,
          outline: theme.outline,
          'outline-variant': theme.outlineVariant,
        },
      },
    },
  },
  defaults: {
    VCard: { rounded: 'xl' },
    // VRow: { class: 'ma-n4' },
    // VCol: { class: 'pa-4' },
  },
})
