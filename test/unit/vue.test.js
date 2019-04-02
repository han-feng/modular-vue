// import { mount } from '@vue/test-utils'

import Modular from 'modular-core'
import Vue from 'vue'

import vueModule from '@/index'
import { application, testModule1, testModule2 } from './vue.data'

describe('modular-vue 单元测试', () => {
  test('扩展点测试', () => {
    document.body.innerHTML = '<div id="app"></div>'

    const modular = new Modular({
      modules: [vueModule, testModule1, testModule2],
      application
    })
    modular.start()

    expect(Vue.$test1.data).toEqual({
      hello: 'testModule1'
    })
    expect(Vue.$test2.data).toEqual({
      hello: 'testModule2'
    })
  })
})
