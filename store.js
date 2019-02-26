import Vue from 'vue'
import Vuex from 'vuex'

import vuexAlong from './vuex-along'

// 初始化 Vuex
Vue.use(Vuex)
vuexAlong.onlySession(true)
vuexAlong.watchSession(['session'], true)

export default new Vuex.Store({
  plugins: [vuexAlong]
})
