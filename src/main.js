import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// ---
import axios from 'axios'
import './plugins/element'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'

// ---
import './plugins/function'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://127.0.0.1:8089/'

axios.interceptors.request.use(conf => {
  return conf
})

axios.interceptors.response.use(conf => {
  return conf
})

Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
