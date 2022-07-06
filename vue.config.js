const { defineConfig } = require('@vue/cli-service')

const port = process.env.port || process.env.npm_config_port || 9901 // dev port
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: port,
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    }
  },
  chainWebpack: config => {
    config.module
        .rule('svg')
        .exclude.add(resolve('src/icons'))
        .end()
    config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()
  }
})
