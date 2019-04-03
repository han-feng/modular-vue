import Vue from 'vue'
import { RouteConfig } from 'vue-router'
import { createVuexAlong } from 'vuex-along'
import { Activator } from 'modular-core'

import router from './router'
import store from './store'

// router.hook 白名单
const HOOK_KEYS: { [index: string]: boolean } = Object.freeze({
  beforeEach: true,
  beforeResolve: true,
  afterEach: true,
  onReady: true,
  onError: true
})

const activator: Activator = {
  start (moduleConfig) {
    const application = moduleConfig.getApplication()
    const vuexAlong: any = {}
    vuexAlong.name = `VAS:${application.name}-${application.version}`

    // 处理 vuex.modules
    const local = []
    const session = []
    let configs = moduleConfig.getExtension('vuex.modules')
    for (const key of Object.keys(configs)) {
      const m = configs[key]
      store.registerModule(key, m)
      if (m.storage) {
        if (m.storage === 'session') {
          session.push(key)
        } else if (m.storage === 'local') {
          local.push(key)
        }
      }
    }
    if (session.length > 0) {
      vuexAlong.session = {
        list: session
      }
    }
    if (local.length > 0) {
      vuexAlong.local = {
        list: local
      }
    } else {
      vuexAlong.justSession = true
    }
    // vuex.plugin 的安装方法
    createVuexAlong(vuexAlong)(store)

    // 处理 vue.plugins
    configs = moduleConfig.getExtension('vue.plugins')
    for (const key of Object.keys(configs)) {
      Vue.use(configs[key])
    }
    // 处理 vue.options
    const options = []
    configs = moduleConfig.getExtension('vue.options')
    for (const key of Object.keys(configs)) {
      options.push(configs[key])
    }

    // 处理 vue.router.routes
    configs = moduleConfig.getExtension('vue.router.routes')
    const routes: RouteConfig[] = []
    const parentRoutes: { [index: string]: RouteConfig[] } = {}
    const unresolved: { [index: string]: RouteConfig[] } = {}
    function registerParentRoutes (route: RouteConfig) {
      // 有 children 属性的路由才可以作为父路由注册
      if (route.children !== undefined && Array.isArray(route.children)) {
        const name = route.name
        if (name === undefined || name === '') {
          // tslint:disable-next-line:no-console
          console.log(`Error: 路由名称未定义，${JSON.stringify(route)}`)
          return
        }
        const children = route.children
        parentRoutes[name] = children
        if (unresolved[name]) {
          // 加入后将未解决的该名称下子路由拷贝过来
          unresolved[name].forEach(item => {
            children.push(item)
          })
          delete unresolved[name]
        }
        route.children.forEach(item => {
          registerParentRoutes(item)
        })
      }
    }
    for (const key of Object.keys(configs)) {
      const config: { parent: string; routes: RouteConfig[] } = configs[key]
      if (config && config.parent && config.routes) {
        const parentName = config.parent
        let parent
        if (parentName === 'root') {
          parent = routes
        } else {
          parent = parentRoutes[parentName]
          if (parent === undefined) {
            // 暂存为未解决状态
            unresolved[parentName] = unresolved[parentName] || []
            parent = unresolved[parentName]
          }
        }
        config.routes.forEach(item => {
          // TODO 此处可以加入路由配置规则校验：路由名称未定义、路由缓存开启条件不满足……
          parent.push(item)
          registerParentRoutes(item)
        })
      }
    }
    for (const key of Object.keys(unresolved)) {
      // TODO 完善日志机制
      // tslint:disable-next-line:no-console
      console.log(`Error: 父路由“${key}”不存在`)
    }

    // 加入路由
    router.addRoutes(routes)

    // 处理 vue.router.hooks
    configs = moduleConfig.getExtension('vue.router.hooks')
    for (const key of Object.keys(configs)) {
      const config = configs[key]
      for (const hook in config) {
        if (HOOK_KEYS[hook]) {
          (router as any)[hook](config[hook])
        }
      }
    }

    // 处理 vue.app
    const app = moduleConfig.getExtension('vue.app')
    new Vue({
      router,
      store,
      mixins: options,
      render: h => h(app.component)
    }).$mount('#app')
    // start end
  }
}

export default activator
