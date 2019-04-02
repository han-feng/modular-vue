// import { mount } from '@vue/test-utils'
import { cloneDeep } from 'lodash'

import Modular from 'modular-core'
import Vue from 'vue'

import vueModule from '@/index'
import { application, testModules } from './vue.data'

describe('modular-vue 单元测试', () => {
  test.each([
    [1, 2],
    [3, 4]
  ])('扩展点测试', (a, b) => {
    document.body.innerHTML = '<div id="app"></div>'
    const modular = new Modular(cloneDeep({
      modules: [vueModule, testModules[a - 1], testModules[b - 1]],
      application
    }))
    modular.start()

    expect(Vue['$test' + a].data).toEqual({
      hello: `testModule${a}`
    })
    expect(Vue['$test' + b].data).toEqual({
      hello: `testModule${b}`
    })
  })
})
