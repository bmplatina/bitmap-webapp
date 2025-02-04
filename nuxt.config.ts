// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  //...
  build: {
    transpile: ['vuetify'],
  },

  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'dayjs-nuxt',
    '@nuxt/image',

    // Vuetify
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  // i18n
  i18n: {
    vueI18n: './locales/i18n.config.ts',
  },

  // Day.js
  dayjs: {
    locales: ['en', 'ko'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'ko',
    defaultTimezone: 'Asia/Seoul',
  },

  compatibilityDate: '2025-02-04',
})