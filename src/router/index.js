import Vue from 'vue'
import VueRouter from 'vue-router'
// -----------1
import Home from '@/components/Home'
import Admin from '@/components/Admin'

// -----------2
// home
import Index from '@/components/home/Index'
import Borrow from '@/components/home/Borrow'
import Suggest from '@/components/home/Suggest'
import Repair from '@/components/home/Repair'
import Post from '@/components/home/Post.vue'
import Info from '@/components/home/Info'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      { path: '/index', name: 'index', component: Index },
      { path: '/borrow', name: 'borrow', component: Borrow },
      { path: '/suggest', name: 'suggest', component: Suggest },
      { path: '/repair', name: 'repair', component: Repair },
      { path: '/post', name: 'post', component: Post },
      { path: '/info', name: 'info', component: Info }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = new VueRouter({
  routes
})

export default router
