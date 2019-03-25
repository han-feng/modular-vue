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
    },
    'vue.plugin': {
    },
    'vue.options': {
    },
    'vue.router.addRoutes': {
    },
    'vue.router.event': {
    },
    'vuex.module': {
    }
  },
  activator
}
