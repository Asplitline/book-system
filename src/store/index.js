import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(sessionStorage.getItem('userInfo')),
    currentImg: '',
    isLogin: false
  },
  mutations: {
    initUser (state, data) {
      sessionStorage.setItem('userInfo', JSON.stringify(data))
      state.user = data
    },
    initImg (state, name) {
      state.currentImg = name
    },
    initLoginStatus (state, flag) {
      state.isLogin = flag
    }
  },
  actions: {
    // getPictureById ({ commit }, id) {
    //   this.$http.get('/util/getFilesByUserId/')
    //   commit('')
    // }
  },
  modules: {
  }
})
