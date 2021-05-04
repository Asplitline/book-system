import Vue from 'vue'
import Vuex from 'vuex'
import { getSession, setSession } from '@utils'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    currentAMenu: getSession('aMenu'),
    currentHMenu: getSession('hMenu'),
    currentUser: getSession('currentUser'),
    currentBook: getSession('currentBook'),
    allCategory: getSession('allCategory'),
    allFile: getSession('allFile'),
    allBook: getSession('allBook')
  },
  getters: {
    getCategoryById: (state) => (id) => {
      return state.allCategory &&
        state.allCategory.find(item => item.id === id)
    },
    getFileById: (state) => (id) => {
      return state.allFile.find(item => item.userId === id)
    },
    getMiniBook: (state) => () => {
      return state.allBook &&
        state.allBook.map(({ id, name }) => ({ id, name }))
    }
  },
  mutations: {
    setAMenu (state, data) {
      state.currentAMenu = data
      setSession('aMenu', data)
    },
    setHMenu (state, data) {
      state.currentHMenu = data
      setSession('hMenu', data)
    },
    setCurrentUser (state, data) {
      state.currentUser = data
      setSession('currentUser', data)
    },
    setCurrentBook (state, data) {
      state.currentBook = data
      setSession('currentBook', data)
    },
    setAllCategory (state, data) {
      state.allCategory = data
      setSession('allCategory', data)
    },
    setAllFile (state, data) {
      state.allFile = data
      setSession('allFile', data)
    },
    setAllBook (state, data) {
      state.allBook = data
      setSession('allBook', data)
    }
  },
  actions: {
    async getAllCategory ({ commit }, _this) {
      const data = await _this.$api.getCategory()
      commit('setAllCategory', data)
    },
    async getAllFile ({ commit }, _this) {
      const data = await _this.$api.getFile()
      commit('setAllFile', data)
    },
    async getAllBook ({ commit }, _this) {
      const data = await _this.$api.getBook()
      commit('setAllBook', data)
    }
  }
})
