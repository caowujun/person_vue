'use strict'
module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist', // 构建时的输出目录
  assetsDir: 'static', // 放置静态资源的目录
  indexPath: 'index.html', // html 的输出路径
  filenameHashing: true, // 文件名哈希值
  lintOnSave: true, // 是否在保存的时候使用 `eslint-loader` 进行检查。

  //    runtimeCompiler: false,

  //    transpileDependencies: [],//babel-loader 默认会跳过 node_modules 依赖。
  //    productionSourceMap: false,//是否为生产环境构建生成 source map？

  chainWebpack: () => {},

  // 配置 webpack-dev-server 行为。
  devServer: {
    open: true, // 编译后默认打开浏览器
    host: '0.0.0.0', // 域名
    port: 8081, // 端口
    https: false, // 是否https
    // 显示警告和错误
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5015/boot',
        changeOrigin: true, // 是否跨域
        ws: false, // 是否支持websocket
        secure: false, // 如果是https接口，需要配置这个参数
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
