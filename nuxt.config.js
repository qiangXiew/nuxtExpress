module.exports = {
  /*
  ** Headers of the page 
  */
  head: {
    title: '币富-数字资产交易平台-比特币丨以太坊丨莱特币',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '币富数字资产交易网可为全球用户提供安全的比特币BTC/莱特币LTC/以太坊ETH/等交易,实时提供比特币价格,比特币行情.平台使用多重技术安全防护致力于为用户营造安全的交易环境。' },
      { name: "keywords", conotent: '币富,比特币,比特币交易,比特币价格,莱特币,莱特币交易,莱特币价格,以太坊,以太坊交易,数字货币,虚拟货币,BTC,ETH,交易所' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  srcDir: 'src/',
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css', '~/assets/css/icon/iconfont.css', 'element-ui/lib/theme-chalk/index.css'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push(
          // {
          //   enforce: 'pre',
          //   test: /\.(js|vue)$/,
          //   loader: 'eslint-loader',
          //   exclude: /(node_modules)/
          // }
          {
            enforce: 'pre',
            test: /\.less$/,
            loader: 'less-loader'
          },
          {
            test: /\.jade$/,
            loader: 'jade-loader'
          },
          {
            test: /\.pug$/,
            loader: 'pug-loader'
          }
        )
      }
    }
  },
  router: {
    middleware: ['i18n']
  },
  plugins: ['~/plugins/i18n.js', { src: '~/plugins/element-ui.js', ssr: true }, { src: '~/plugins/vue-particles.js', ssr: false }],
  babel: {
    "plugins": [["component", [
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-default"
      },
      'transform-async-to-generator',
      'transform-runtime'
    ]]],
    comments: true
  },
  vendor: ['element-ui']
}



