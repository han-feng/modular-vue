/**
 * modular-vue 模块
 */
import { ModuleConfig, ExtensionPointType } from 'modular-core'

import store from './store'
import router from './router'
import activator from './activator'

const { Single, Mixin, Multiple } = ExtensionPointType

const config: ModuleConfig = {
  name: 'vue',
  extensionPoints: {
    'vue.app': {
      type: Single
    },
    'vue.plugins': {
      type: Multiple
    },
    'vue.options': {
      type: Multiple
    },
    'vue.router.routes': {
      type: Multiple
    },
    'vue.router.hooks': {
      type: Multiple
    },
    'vuex.modules': {
      type: Mixin
    }
  },
  activator
}

export { store, router }
export default config
