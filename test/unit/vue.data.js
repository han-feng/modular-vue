import App from './App'

export const application = {
  name: process.env.VUE_APP_NAME,
  version: process.env.VUE_APP_VERSION,
  extensions: {
    'vue.app': {
      component: App
    }
  }
}

export const testModule = {
  name: 'testModule',
  dependencies: ['vue'],
  extensions: {
    'vue.plugins': {
      test: {
        install (Vue) {
          Vue.$test = {
            data: {
              hello: 'modular-vue'
            }
          }
        }
      }
    },
    'vue.options': {
      test: {}
    },
    'vue.router.routes': {
      test: {
        parent: 'root',
        routes: []
      }
    },
    'vue.router.hooks': {
      test: {}
    },
    'vuex.modules': {
      test: {}
    }
  }
}
