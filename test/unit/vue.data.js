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

const testModule1 = {
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
      test1: {
        storage: 'session'
      }
    }
  }
}

const testModule2 = {
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
      test2: {
        storage: 'local'
      }
    }
  }
}

const testModule3 = {
  name: 'testModule3',
  dependencies: ['vue', 'testModule4'],
  extensions: {
    'vue.plugins': {
      test3: {
        install (Vue) {
          Vue.$test3 = {
            data: {
              hello: 'testModule3'
            }
          }
        }
      }
    },
    'vue.options': {
      test3: {}
    },
    'vue.router.routes': {
      test3: {
        parent: 'index4',
        routes: [
          {
            name: 'test3',
            path: 'test3',
            component: {
              name: 'test'
            }
          },
          {
            path: 'test31',
            children: []
          }
        ]
      },
      test31: {
        parent: 'index3',
        routes: []
      }
    },
    'vue.router.hooks': {
      test3: {}
    }
  }
}

const testModule4 = {
  name: 'testModule4',
  dependencies: ['vue'],
  extensions: {
    'vue.plugins': {
      test1: {
        install (Vue) {
          Vue.$test4 = {
            data: {
              hello: 'testModule4'
            }
          }
        }
      }
    },
    'vue.options': {
      test4: {}
    },
    'vue.router.routes': {
      test4: {
        parent: 'root',
        routes: [
          {
            name: 'index4',
            path: '/4/',
            component: {
              name: 'index4'
            },
            children: []
          }
        ]
      }
    },
    'vue.router.hooks': {
      test4: {}
    },
    'vuex.modules': {
      test4: {
        storage: 'session'
      }
    }
  }
}

export const testModules = [testModule1, testModule2, testModule3, testModule4]
