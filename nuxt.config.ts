import PostCSSCombineMediaQuery from 'postcss-combine-media-query'

export default defineNuxtConfig({
  css: ['@/assets/styles/index.scss'],

  vite: {
    css: {
      postcss: {
        plugins: [PostCSSCombineMediaQuery],
      },
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  typescript: {
    strict: false,
  },

  runtimeConfig: {
    public: {
      ENVIROMENT: process.env.NODE_ENV,
    },
  },
})
