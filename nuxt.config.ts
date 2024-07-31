import { pageTransition } from './transitions/base'

export default defineNuxtConfig({
  css: ['@/assets/styles/index.scss'],

  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  app: {
    pageTransition,
  },

  typescript: {
    strict: false,
  },
})
