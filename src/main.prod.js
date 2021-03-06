import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// ---
import axios from 'axios'
// import './plugins/element'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import VueCookies from 'vue-cookies'
// ---
import './plugins/function'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
import VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor/* { default global options } */)
Vue.use(VueCookies)

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://127.0.0.1:8088/'
// 携带cookie
axios.defaults.withCredentials = true
axios.interceptors.request.use(conf => {
  // console.log(conf)
  return conf
}, error => {
  return Promise.reject(error)
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
