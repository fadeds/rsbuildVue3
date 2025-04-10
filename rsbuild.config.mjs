import { defineConfig } from '@rsbuild/core';
// import { pluginBabel } from '@rsbuild/plugin-babel';
// import { pluginImageCompress } from '@rsbuild/plugin-image-compress';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginVue } from '@rsbuild/plugin-vue';
// import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/rspack';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoComponents from 'unplugin-vue-components/rspack';
console.log(process.env.BASEURL)
export default defineConfig(({ env, command, envMode }) => {
  console.log('env:', env);
  // console.log('command:', command);
  // console.log('envMode:', envMode);
  return {
    // root: './foo', 指定项目根目录， 默认为 process.cwd()
    // mode 本项目通过 process.env.NODE_ENV 设置
    plugins: [
      // Vue 的 JSX 插件依赖 Babel 进行编译
      // pluginBabel({
      //   include: /\.(?:jsx|tsx)$/,
      // }),
      pluginVue(),
      // pluginVueJsx(), // 支持 jsx 语法
      pluginSass(), // 支持 sass 语法
      // pluginImageCompress(), // 使用图片压缩
    ],
    tools: {
      rspack: {
        plugins: [
          AutoImport({
            resolvers: [
              ElementPlusResolver({
                importStyle: "sass",
              }),
            ],
            dts: false,
            imports: ["vue", "vue-router", "pinia"],
            biomelintrc: {
              // 已存在文件设置默认 false，需要更新时再打开，防止每次更新都重新生成
              enabled: false,
              // 生成文件地址和名称
              filepath: "./.biomelintrc-auto-import.json", // Default `./.biomelintrc-auto-import.json`
            },
          }),
          AutoComponents({
            // 自动加载组件的目录配置,默认的为 'src/components'
            dirs: ["src/components"],
            // 组件支持的文件后缀名
            extensions: ["vue", "jsx", "tsx"],
            dts: false,
            resolvers: [
              ElementPlusResolver({
                importStyle: "sass",
              }),
            ],
          }),
        ],
      },
    },
    source: {
      entry: {
        index: "./src/index.js",
      },
      // 路径别名
      alias: {
        "@": "./src",
      },
    },
    output: {
      assetPrefix: "auto",
      target: "web", // 默认 environment
      polyfill: "usage", // polyfill 设置，具体请参照官网
      minify: true, // 默认在生产模式下压缩 js css
      cleanDistPath: env === "production",
      // 使用默认值
      // sourceMap: true,
    },
    dev: {
      lazyCompilation: true, // 开发模式启动，按需编译
      hmr: true, // 模块热更新,开发模式下默认启用
    },
    server: {
      open: true,
      port: 1234,
      htmlFallback: "index", // 默认情况下，当请求满足以下条件且未找到对应资源时，会回退到 index.html
      proxy: {
        "/app": {
          target: "http://47.92.117.5:12345/renren-fast/",
          // target: "https://68215bfc.r16.vip.cpolar.cn/renren-fast/",
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, "/app"),
          logLevel: 'debug', // 启用代理日志输出
        },
      },
    },
    // html: {
    //   // 设置页面 title
    //   title: 'Rsbuild Vue3',
    //   // template: './public/index.html',
    // },
    performance: {
      // 代码分割配置
      chunkSplit: {
        strategy: "split-by-experience",
        // strategy: 'split-by-size',
        // minSize: 30000,
        // maxSize: 500000,
      },
      removeConsole: true, // 生产模式构建时，是否自动移除代码中所有的 console.[methodName]
      bundleAnalyze: {}, // 开启分析产物体积，生成 ./dist/report-web.html 文件
    },
  }
});