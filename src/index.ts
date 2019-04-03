/**
 * modular-vue 模块
 */
import { ModuleConfig } from 'modular-core'

import store from './store'
import router from './router'
import activator from './activator'

export { store, router }

const config: ModuleConfig = {
  name: 'vue',
  extensionPoints: {
    'vue.app': {
      type: 'mixin'
    },
    'vue.plugins': {
      type: 'array'
    },
    'vue.options': {
      type: 'array'
    },
    'vue.router.routes': {
      type: 'array'
    },
    'vue.router.hooks': {
      type: 'array' // or mixin ?
    },
    'vuex.modules': {
      type: 'array'
    }
  },
  activator
}

export default config
