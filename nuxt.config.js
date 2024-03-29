export default {

  // Add by brgd
  server: {
    port: 80, // default: 3000
    host: '172.26.11.213' // default: localhost
  },

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate:
      '%s - Traditional Mongolian Archives Of Books Of Mongol Horse',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Where you can find all the archives of books of mongol horse in traditional mongolian'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#3B8070' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: './plugins/global-register.js' }],

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa', '@nuxtjs/apollo'],

  apollo: {
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
      },
    },
    includeNodeModules: true,
    clientConfigs: {
      default: {
        httpEndpoint: 'http://3.38.124.100:4000'
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
