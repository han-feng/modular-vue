// tslint:disable:no-empty
import { ModuleConfig, ApplicationConfig } from 'modular-core'
import App from './App.vue'

export const application: ApplicationConfig = {
  name: 'application',
  version: '0.1.2-test',
  extensions: {
    'vue.app': {
      component: App
    }
  }
}

export const application2: ApplicationConfig = {
  name: process.env.VUE_APP_NAME || 'application',
  version: process.env.VUE_APP_VERSION
}

const testModule1: ModuleConfig = {
  name: 'testModule1',
  dependencies: ['vue'],
  extensions: {
    'vue.plugins': {
      install(Vue: any) {
        Vue.$test1 = {
          data: {
            hello: 'testModule1'
          }
        }
      }
    },
    'vue.options': {
      created() {
        this.$created1 = 'test1'
      },
      mounted() {
        this.$mounted1 = 'test1'
      }
    },
    'vue.router.routes': {
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
    },
    'vue.router.hooks': {
      beforeEach: () => {}
    },
    'vuex.modules': {
      test1: {
        storage: 'session',
        namespaced: true,
        state: {
          name : 'vuexTest'
        },
        mutations: {
          setName (state: any, name: string) {
            state.name = name
          }
        }
      }
    }
  }
}

const testModule2: ModuleConfig = {
  name: 'testModule2',
  dependencies: ['vue', 'testModule1'],
  extensions: {
    'vue.plugins': {
      install(Vue: any) {
        Vue.$test2 = {
          data: {
            hello: 'testModule2'
          }
        }
      }
    },
    'vue.options': {
      created() {
        this.$created2 = 'test2'
      },
      mounted() {
        this.$mounted2 = 'test2'
      }
    },
    'vue.router.routes': {
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
    },
    'vue.router.hooks': {
      test: () => {}
    },
    'vuex.modules': {
      test2: {
        storage: 'local'
      }
    }
  }
}

const testModule3: ModuleConfig = {
  name: 'testModule3',
  dependencies: ['vue'],
  extensions: {
    'vue.plugins': {
      install(Vue: any) {
        Vue.$test3 = {
          data: {
            hello: 'testModule3'
          }
        }
      }
    },
    'vue.options': {
      created() {
        this.$created3 = 'test3'
      },
      mounted() {
        this.$mounted3 = 'test3'
      }
    },
    'vue.router.routes': [
      {
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
      {
        parent: 'index3',
        routes: []
      }
    ]
  }
}

const testModule4: ModuleConfig = {
  name: 'testModule4',
  dependencies: ['vue'],
  extensions: {
    'vue.plugins': {
      install(Vue: any) {
        Vue.$test4 = {
          data: {
            hello: 'testModule4'
          }
        }
      }
    },
    'vue.options': {
      created() {
        this.$created4 = 'test4'
      },
      mounted() {
        this.$mounted4 = 'test4'
      }
    },
    'vue.router.routes': {
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
    },
    'vue.router.hooks': {},
    'vuex.modules': {
      test4: {
        storage: 'session'
      }
    }
  }
}

const testModule5: ModuleConfig = {
  name: 'testModule5',
  dependencies: ['vue'],
  extensions: {
    'vue.plugins': {
      install(Vue: any) {
        Vue.$test5 = {
          data: {
            hello: 'testModule5'
          }
        }
      }
    },
    'vue.router.routes': {
      parent: 'root'
    },
    'vuex.modules': {
      test5: {
        storage: 'test'
      }
    }
  }
}

const testModule6: ModuleConfig = {
  name: 'testModule6',
  dependencies: ['vue'],
  extensions: {
    'vue.plugins': {
      install(Vue: any) {
        Vue.$test6 = {
          data: {
            hello: 'testModule6'
          }
        }
      }
    },
    'vue.router.routes': {
      routes: [
        {
          name: 'index6',
          path: '/6/',
          component: {
            name: 'index6'
          },
          children: []
        }
      ]
    },
    'vuex.modules': {
      test6: {}
    }
  }
}

export const testModules = [
  testModule1,
  testModule2,
  testModule3,
  testModule4,
  testModule5,
  testModule6
]
