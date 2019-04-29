import Modular from 'modular-core'
import Vue from 'vue'
import { cloneDeep } from 'lodash'

import vueModule from '@/index'
import store from '@/store'

import { application, application2, testModules } from './vue.data'

const VAS_NAME = `VAS:${application.name}-${application.version}`

describe('modular-vue 单元测试', () => {
  test.each([[1, 2], [3, 4], [5, 6]])('扩展点测试', (a, b) => {
    document.body.innerHTML = '<div id="app"></div>'
    const modular = new Modular(
      cloneDeep({
        modules: [vueModule, testModules[a - 1], testModules[b - 1]],
        application: a < 5 ? application : application2
      })
    )
    modular.start()

    const vm = modular.getAttribute('vue.instance')

    // 验证 vue.plugins
    const v: any = Vue
    expect(v['$test' + a].data).toEqual({
      hello: `testModule${a}`
    })
    expect(v['$test' + b].data).toEqual({
      hello: `testModule${b}`
    })

    // 验证 vue.options
    if (a < 5) {
      expect(vm['$created' + a]).toEqual('test' + a)
      expect(vm['$mounted' + a]).toEqual('test' + a)
      expect(vm['$created' + b]).toEqual('test' + b)
      expect(vm['$mounted' + b]).toEqual('test' + b)
    }

    if (a === 1) {
      // 验证 vueRoute
      const routes = modular.getAttribute('vue.routes')
      expect(routes).toEqual([
        {
          name: 'index',
          path: '/',
          component: {
            name: 'index'
          },
          children: [
            {
              name: 'test',
              path: 'test',
              component: {
                name: 'test'
              }
            }
          ]
        }
      ])
      // 验证 vuex
      expect(store.state.test1.name).toEqual('vuexTest')
      store.commit('test1/setName', 'vuexTest2')
      expect(store.state.test1.name).toEqual('vuexTest2')

      const { localStorage, sessionStorage } = window
      expect(JSON.parse(localStorage.getItem(VAS_NAME))).toEqual({
        '9Q0+jSID7l0kTaDhykUEbA': {
          test2: {}
        }
      })
      expect(JSON.parse(sessionStorage.getItem(VAS_NAME))).toEqual({
        '9Q0+jSID7l0kTaDhykUEbA': {
          test1: {
            name: 'vuexTest2'
          }
        }
      })
    }
  })
})
