# vue-express

> Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm start
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Backpack

We use [backpack](https://github.com/palmerhq/backpack) to watch and build the application, so you can use the latest ES6 features (module syntax, async/await, etc.).

## ToDoList
- [x] 日志系统
- [x] axios
- [x] vuex
- [ ] 路由鉴权
- [x] cluster
- [ ] 发包部署
- [ ] docker集成部署

## 为什么选择这个框架
什么选择 NUXT 来做 SSR ？
 1. 就是我们无需为了路由划分而烦恼，你只需要按照对应的文件夹层级创建 .vue 文件就行
 2. 无需考虑数据传输问题，nuxt 会在模板输出之前异步请求数据（需要引入 axios 库），而且对 vuex 有进一步的封装
 3. 内置了 webpack，省去了配置 webpack 的步骤，nuxt 会根据配置打包对应的文件


## pages目录简介
* login             登录
* register          注册
* retrieveAccount   找回
* trading           交易中心
* security          安全中心
* financial         财务中心