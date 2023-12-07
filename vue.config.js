const { defineConfig } = require('@vue/cli-service')
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false,
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("layouts", resolve("src/layouts"))
      .set("views", resolve("src/views"))
      .set("service", resolve("src/service"))
      .set("layouts", resolve("src/layouts"))
      .set("utils", resolve("src/utils"))
      .set("config", resolve("src/config"))
      .set("store", resolve("src/store"))
      .set("hooks", resolve("src/hooks"));
  },
  css: {
    loaderOptions: {
      less: {
        // 向Less传递一些全局变量，如果需要的话

      },
    },
  },
})
