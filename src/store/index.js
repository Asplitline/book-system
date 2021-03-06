import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(sessionStorage.getItem('userInfo')),
    currentImg: ''
  },
  mutations: {
    initUser (state, data) {
      sessionStorage.setItem('userInfo', JSON.stringify(data))
      state.user = data
    },
    initImg (state, { data }) {
      state.currentImg = data.length > 0 ? data[0].filename : ''
    }
    // ,
    // initLoginStatus (state, flag) {
    //   state.isLogin = flag
    // }
  },
  actions: {
    async getFileById ({ commit }, id) {
      const { data } = await Axios.get('/util/getFilesByUserId/', {
        params: {
          id
        }
      })
      // console.log(data.length, '11111111')
      if (data.length > 0) {
        return { name: data[0].filename, id: data[0].id }
      } else {
        return null
      }
    },
    async getBookById ({ commit }, id) {
      const { data } = await Axios.get('/book/getById', {
        params: {
          id
        }
      })
      return data
    }
  },
  getters: {
    isLogin: state => {
      return state.user !== null
    }
  },
  modules: {
  }
})
