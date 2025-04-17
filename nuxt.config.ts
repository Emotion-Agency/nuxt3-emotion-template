import { pageTransition } from './transitions/base'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  css: ['~/assets/styles/index.scss'],

  app: {
    pageTransition: pageTransition as any,
  },

  typescript: {
    strict: false,
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/helpers/index.scss" as *;',
          api: 'modern-compiler',
        },
      },
    },
  },

  eslint: {
    config: {
      typescript: true,
    },
  },

  build: {
    transpile: [
      process.env.NODE_ENV === 'production' ? '@emotionagency/utils' : null,
    ],
  },

  modules: ['@vueuse/nuxt', '@nuxt/eslint'],
})
