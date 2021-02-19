import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(sessionStorage.getItem('userInfo'))
  },
  mutations: {
    initUser (state, data) {
      sessionStorage.setItem('userInfo', JSON.stringify(data))
      state.user = data
    }
  },
  actions: {
  },
  modules: {
  }
})
