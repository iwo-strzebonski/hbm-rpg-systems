import { resolve } from 'path'

import iconData from './public/icons.json' assert { type: 'json' }
import { APP_TITLE } from './settings/constants'

// https://nuxt.com/docs/api/configuration/nuxt-config
const properties = [
  {
    hid: 'og:locale',
    property: 'og:locale',
    content: 'pl_PL'
  },
  {
    hid: 'og:type',
    property: 'og:type',
    content: 'website'
  },
  {
    hid: 'og:title',
    property: 'og:title',
    content: 'Homebrew Magic: RPG Systems'
  },
  {
    hid: 'og:description',
    property: 'og:description',
    content:
      'Aplikacja do wyświetlania kart postaci z systemu Homebrew Magic 3.0. Kompatybilna z Kartami Postaci Google Sheets 2.0.'
  },
  {
    hid: 'og:url',
    property: 'og:url',
    content: 'https://rpg.octoturge.com/'
  },
  {
    hid: 'og:site_name',
    property: 'og:site_name',
    content: 'Homebrew Magic: RPG Systems'
  },
  {
    hid: 'og:image',
    property: 'og:image',
    content: 'https://i.postimg.cc/kGy4kyJD/octo-3d-logo.jpg'
  }
]

const twitterProperties = [
  {
    hid: 'twitter:card',
    name: 'twitter:card',
    content: 'Aplikacja do wyświetlania kart postaci z systemu Homebrew Magic'
  },
  {
    hid: 'twitter:description',
    name: 'twitter:description',
    content:
      'Aplikacja do wyświetlania kart postaci z systemu Homebrew Magic 3.0. Kompatybilna z Kartami Postaci Google Sheets 2.0.'
  },
  {
    hid: 'twitter:title',
    name: 'twitter:title',
    content: 'Homebrew Magic: RPG Systems'
  },
  {
    hid: 'twitter:image',
    name: 'twitter:image',
    content: 'https://i.postimg.cc/T2NmZ0t5/integra-logo.png'
  },
  {
    hid: 'twitter:site',
    name: 'twitter:site',
    content: '@hbm_rpg'
  },
  {
    hid: 'twitter:creator',
    name: 'twitter:creator',
    content: '@hbm_rpg'
  }
]

const msTileProperties = [
  {
    name: 'msapplication-TileColor',
    content: '#990000'
  },
  {
    name: 'msapplication-TileImage',
    content: 'https://i.postimg.cc/kGy4kyJD/octo-3d-logo.jpg'
  }
]

export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    layoutTransition: {
      name: 'slide',
      mode: 'out-in'
    },
    head: {
      title: APP_TITLE,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          hid: 'description',
          name: 'description',
          content: ''
        },
        ...properties,
        ...msTileProperties,
        ...twitterProperties
      ],
      link: [...iconData.icons],
      htmlAttrs: {
        lang: 'pl'
      }
    }
  },

  nitro: {
    // prerender: {
    //   routes: ['/sitemap.xml']
    // }
  },

  css: [
    '@/assets/css/content.css',
    '@/assets/css/flowbite.css',
    '@/assets/css/tailwind.css',
    '@/assets/css/main.css',
    '@/assets/css/markdown.css',
    '@/assets/css/treeview.css',
    'vue3-treeview/dist/style.css'
  ],

  components: true,

  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  content: {
    documentDriven: true,
    ignores: ['README.md', 'LICENSE.md', 'CHANGELOG.md', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'SECURITY.md'],
    sources: {
      content: {
        driver: 'fs',
        prefix: 'blog',
        base: resolve(__dirname, 'content')
      }
    }
  },

  pwa: {
    devOptions: { enabled: true },
    registerType: 'autoUpdate',
    manifest: {
      name: 'Homebrew Magic: RPG Systems',
      short_name: 'HbM: RPG Systems',
      theme_color: '#990000',
      icons: iconData.icons
    }
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxt/image-edge',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vite-pwa/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-brands-svg-icons'
    ]
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  runtimeConfig: {
    // JWT_SECRET: process.env.NUXT_JWT_SECRET,
    // JWT_EXPIRES_IN: process.env.NUXT_JWT_EXPIRES_IN,
    // JWT_ISSUER: process.env.NUXT_JWT_ISSUER
  }
})
