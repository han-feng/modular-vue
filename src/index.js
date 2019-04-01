/**
 * modular-vue 模块
 */
import activator from './activator'
import router from './router'
import store from './store'

export { router, store }

export default {
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
