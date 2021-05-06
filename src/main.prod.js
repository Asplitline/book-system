import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// ---
import axios from 'axios'
// import './plugins/element'
import './assets/css/global.less'
import MyPlugin from '@plugins/MyPlugin'

Vue.use(MyPlugin)
Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
