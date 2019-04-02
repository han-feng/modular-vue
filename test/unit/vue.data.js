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

export const testModule1 = {
  name: 'testModule1',
  dependencies: ['vue'],
  extensions: {
    'vue.plugins': {
      test1: {
        install (Vue) {
          Vue.$test1 = {
            data: {
              hello: 'testModule1'
            }
          }
        }
      }
    },
    'vue.options': {
      test1: {}
    },
    'vue.router.routes': {
      test1: {
        parent: 'root',
        routes: [
          {
            name: 'index',
            path: '/',
            component: {
              name: 'index'
            },
            children: []
          }
        ]
      }
    },
    'vue.router.hooks': {
      test1: {}
    },
    'vuex.modules': {
      test1: {}
    }
  }
}

export const testModule2 = {
  name: 'testModule2',
  dependencies: ['vue', 'testModule1'],
  extensions: {
    'vue.plugins': {
      test2: {
        install (Vue) {
          Vue.$test2 = {
            data: {
              hello: 'testModule2'
            }
          }
        }
      }
    },
    'vue.options': {
      test2: {}
    },
    'vue.router.routes': {
      test2: {
        parent: 'index',
        routes: [
          {
            name: 'test',
            path: 'test',
            component: {
              name: 'test'
            }
          }
        ]
      }
    },
    'vue.router.hooks': {
      test2: {}
    },
    'vuex.modules': {
      test2: {}
    }
  }
}
