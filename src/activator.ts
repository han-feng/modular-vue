import Vue from 'vue'
import { RouteConfig } from 'vue-router'
import createVuexAlong from 'vuex-along'
import Modular, { Activator, ModuleConfig } from 'modular-core'

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

const defaultAppComponent = { name: 'app', render: (h: any) => h('router-view') }
const defaultAppElement = '#app'

function addVuexModules(modular: Modular) {
  const application = modular.getApplication()
  const vuexAlong: any = {
    name: `VAS:${application.name}-${application.version}`
  }
  const local = []
  const session = []
  const vuexModules = modular.getExtension('vuex.modules')
  for (const key of Object.keys(vuexModules)) {
    const m = vuexModules[key]
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
}

function addPlugins(modular: Modular) {
  const vuePlugins = modular.getExtension('vue.plugins') as any[]
  if (vuePlugins !== null) {
    vuePlugins.forEach(plugin => Vue.use(plugin))
  }
}

function addRoutes(modular: Modular) {
  const routerConfigs: Array<{
    parent: string
    routes: RouteConfig[]
  }> = modular.getExtension('vue.router.routes')
  const routes: RouteConfig[] = []
  const parentRoutes: { [index: string]: RouteConfig[] } = {}
  const unresolved: { [index: string]: RouteConfig[] } = {}
  function registerParentRoutes(route: RouteConfig) {
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

  if (routerConfigs !== null) {
    routerConfigs.forEach(config => {
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
    })
    for (const key of Object.keys(unresolved)) {
      // TODO 完善日志机制
      // tslint:disable-next-line:no-console
      console.log(`Error: 父路由“${key}”不存在`)
    }
    // 加入路由
    router.addRoutes(routes)
    modular.setAttribute('vue.routes', routes)
  }
}

function addRouterHooks(modular: Modular) {
  const hooks = modular.getExtension('vue.router.hooks') as any[]
  if (hooks !== null) {
    const register: any = router
    hooks.forEach(config => {
      for (const hook in config) {
        if (HOOK_KEYS[hook] !== undefined) {
          register[hook](config[hook])
        }
      }
    })
  }
}

function createVueInstance(modular: Modular) {
  // 处理 vue.app
  let app = modular.getExtension('vue.app')
  if (app === undefined) {
    app = { component: defaultAppComponent, element: defaultAppElement }
  }
  const component = app.component || defaultAppComponent
  const options: any = {
    router,
    store,
    render: (h: any) => h(component)
  }
  // 处理 vue.options
  const vueOptions = modular.getExtension('vue.options')
  if (vueOptions !== null) {
    options.mixins = vueOptions
  }
  const vm = new Vue(options)
  const element: string = app.element || defaultAppElement
  vm.$mount(element)
  modular.setAttribute('vue.instance', vm)
}

const activator: Activator = {
  start(modular) {
    // 处理 vuex.modules
    addVuexModules(modular)
    // 处理 vue.plugins
    addPlugins(modular)
    // 处理 vue.router.routes
    addRoutes(modular)
    // 处理 vue.router.hooks
    addRouterHooks(modular)
    // 创建 Vue 实例
    createVueInstance(modular)
  }
}

export default activator
