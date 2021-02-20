import Vue from 'vue'
import VueRouter from 'vue-router'
// -----------1
import Home from '@/components/Home'
import Admin from '@/components/Admin'
import Login from '@/components/Login'
// -----------2
// home
import Index from '@/components/home/index/Index'
import Borrow from '@/components/home/borrow/Borrow'
import Suggest from '@/components/home/suggest/Suggest'
import Repair from '@/components/home/repair/Repair'
import Post from '@/components/home/post/Post'
import Info from '@/components/home/info/Info'
import PostDetail from '@/components/home/post/PostDetail'
// admin
import aBorrow from '@/components/admin/borrow/Borrow'
import aGoods from '@/components/admin/goods/Goods'
import aLog from '@/components/admin/log/Log'
import aPost from '@/components/admin/post/Post'
import aRepair from '@/components/admin/repair/Repair'
import aSuggest from '@/components/admin/suggest/Suggest'
import aUser from '@/components/admin/user/User'
Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login },
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
      { path: '/info', name: 'info', component: Info },
      // -----
      { path: '/post/:id', name: 'postDetail', component: PostDetail }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      { path: '/_borrow', name: 'aBorrow', component: aBorrow },
      { path: '/_goods', name: 'aGoods', component: aGoods },
      { path: '/_log', name: 'aLog', component: aLog },
      { path: '/_post', name: 'aPost', component: aPost },
      { path: '/_repair', name: 'aRepair', component: aRepair },
      { path: '/_suggest', name: 'aSuggest', component: aSuggest },
      { path: '/_user', name: 'aUser', component: aUser }
    ],
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem('userInfo')) next()
      else next('/login')
    }
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   console.log(to, from)
//   next()
// })
export default router
