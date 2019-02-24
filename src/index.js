/**
 * modular-vue 模块
 */
const activator = {}

export const router = {}
export const store = {}
export const i18n = {}

export default {
  name: 'vue',
  extensions: {
    'jest': { path: 'tests' }
  },
  extensionPoints: {
    'vue.plugin': {
    },
    'vue.options': {
    },
    'vue.route': {
    },
    'vuex.module': {
    }
  },
  activator
}

activator.start = function (moduleConfig) {
  // 处理 vue.plugin
  let configs = moduleConfig.getExtension('vue.plugin')
  for (let key in configs) {
    Vue.use(configs[key])
  }
  // 处理 vue.options
  const options = []
  configs = moduleConfig.getExtension('vue.options')
  for (let key in configs) {
    options.push(configs[key])
  }

  const vueOptions = {
    router,
    store,
    i18n,
    mixins: options,
    render: h => h(App)
  }

  new Vue(vueOptions).$mount('#app')
}
