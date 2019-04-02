// import { mount } from '@vue/test-utils'

import Modular from 'modular-core'
import Vue from 'vue'

import vueModule from '@/index'
import { application, testModule } from './vue.data'

describe('modular-vue 单元测试', () => {
  test('扩展点测试', () => {
    const mopdular = new Modular({
      modules: [vueModule, testModule],
      application
    })
    mopdular.start()
    expect(Vue.$test.data).toEqual({
      hello: 'modular-vue'
    })
  })
})
