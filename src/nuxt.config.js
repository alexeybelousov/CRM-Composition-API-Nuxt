module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    script: [
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"
      }
    ],
    link: [
      {
        href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        rel: "stylesheet"
      },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#26a69a" },
  /*
   ** Global CSS
   */
  css: [
    "@node_modules/materialize-css/dist/css/materialize.min.css",
    "@assets/index.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["@/plugins/common", "@/plugins/client", "@/plugins/title.js"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/dotenv"],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** Build configuration
   */
  buildDir: "nuxt",
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  }
}
