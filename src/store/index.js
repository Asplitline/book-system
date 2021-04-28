import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import { getSession, setSession } from '@utils'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    currentAMenu: getSession('aMenu'),
    currentHMenu: getSession('hMenu'),
    allCategory: getSession('allCategory')
  },
  getters: {
    getCategoryById: (state) => (id) => {
      return state.allCategory &&
        state.allCategory.find(item => item.id === id)
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
    setAllCategory (state, data) {
      state.allCategory = data
      setSession('allCategory', data)
    }
  },
  actions: {
    async getFileById ({ commit }, id) {
      const { data } = await Axios.get('/util/getFilesByUserId/', {
        params: {
          id
        }
      })
      if (data.length > 0) {
        return { name: data[0].filename, id: data[0].id }
      } else {
        return { name: 'default_pic.png' }
      }
    },
    async getAllCategory ({ commit }, _this) {
      const data = await _this.$api.getCategory()
      commit('setAllCategory', data)
    }
  }
})
