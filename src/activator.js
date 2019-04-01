import Vue from 'vue'
import { createVuexAlong } from 'vuex-along'

import router from './router'
import store from './store'

// router.hook 白名单
const HOOK_KEYS = Object.freeze({
  beforeEach: true,
  beforeResolve: true,
  afterEach: true,
  onReady: true,
  onError: true
})

export default {
  start (moduleConfig) {
    const application = moduleConfig.getApplication()
    const vuexAlong = {}
    vuexAlong.name = `vuexAlong:${application.name}-${application.version}`

    // 处理 vuex.modules
    const local = []
    const session = []
    let configs = moduleConfig.getExtension('vuex.modules')
    for (let key in configs) {
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
    for (let key in configs) {
      Vue.use(configs[key])
    }
    // 处理 vue.options
    const options = []
    configs = moduleConfig.getExtension('vue.options')
    for (let key in configs) {
      options.push(configs[key])
    }

    // 处理 vue.router.routes
    configs = moduleConfig.getExtension('vue.router.routes')
    const routes = []
    const parentRoutes = {}
    const unresolved = {}
    function registerParentRoutes (route) {
      // 有 children 属性的路由才可以作为父路由注册
      if (route.children && route.children.length) {
        const name = route.name
        if (name === undefined || name === '') {
          console.log(`Error: 路由名称未定义，${JSON.stringify(route)}`)
          return
        }
        parentRoutes[name] = route.children
        if (unresolved[name]) {
          // 加入后将未解决的该名称下子路由拷贝过来
          unresolved[name].forEach(item => {
            route.children.push(item)
          })
          delete unresolved[name]
        }
        route.children.forEach(item => {
          registerParentRoutes(item)
        })
      }
    }
    for (const key in configs) {
      const config = configs[key]
      if (config && config.parent && config.routes) {
        const parentName = config.parent
        let parent
        if (parentName === 'root') {
          parent = routes
        } else {
          parent = parentRoutes[parentName]
          if (!parent) {
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
    for (const key in unresolved) {
      // TODO 完善日志机制
      console.log(`Error: 父路由“${key}”不存在`)
    }

    // 加入路由
    router.addRoutes(routes)

    // 处理 vue.router.hooks
    configs = moduleConfig.getExtension('vue.router.hooks')
    for (let key in configs) {
      const config = configs[key]
      for (let hook in config) {
        if (HOOK_KEYS[hook]) {
          router[hook](config[hook])
        }
      }
    }

    // 处理 vue.app
    const app = moduleConfig.getExtension('vue.app')
    const vueOptions = {
      router,
      store,
      mixins: options,
      render: h => h(app.component)
    }

    new Vue(vueOptions).$mount('#app')
    // start end
  }
}
