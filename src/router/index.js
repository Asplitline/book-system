import Vue from 'vue'
import VueRouter from 'vue-router'
import { aMiniMenu, hMiniMenu } from '@static'
import store from '@store'
// base
const Admin = () => import(/* webpackChunkName:'admin' */'@views/Admin')
const Home = () => import(/* webpackChunkName:'home' */'@views/Home')
const Login = () => import(/* webpackChunkName:'login' */'@views/Login')
// home
const Index = () => import(/* webpackChunkName:'h-index' */'@views/home/Index')
const BookCenter = () => import(/* webpackChunkName:'h-book-center' */'@views/home/BookCenter')
const Errata = () => import(/* webpackChunkName:'h-errata' */'@views/home/Errata')
const MessageBoard = () => import(/* webpackChunkName:'h-message-board' */'@views/home/MessageBoard')
const Info = () => import(/* webpackChunkName:'h-info' */'@views/home/Info')
// admin
const User = () => import(/* webpackChunkName:'a-user' */'@views/admin/User')
const Book = () => import(/* webpackChunkName:'a-book' */'@views/admin/Book')
const Message = () => import(/* webpackChunkName:'a-message' */'@views/admin/Message')
const Correction = () => import(/* webpackChunkName:'a-correction' */'@views/admin/Correction')
const Borrow = () => import(/* webpackChunkName:'a-borrow' */'@views/admin/Borrow')
const Log = () => import(/* webpackChunkName:'a-log' */'@views/admin/Log')
Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login },
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: { name: 'index' },
    children: [
      { path: '/index', name: 'index', component: Index },
      { path: '/bookCenter', name: 'borrow', component: BookCenter },
      { path: '/errata', name: 'suggest', component: Errata },
      { path: '/messageBoard', name: 'repair', component: MessageBoard },
      { path: '/info', name: 'post', component: Info }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    redirect: { name: 'user' },
    children: [
      { path: '/user', name: 'user', component: User },
      { path: '/book', name: 'book', component: Book },
      { path: '/message', name: 'message', component: Message },
      { path: '/correction', name: 'correction', component: Correction },
      { path: '/borrow', name: 'borrow', component: Borrow },
      { path: '/log', name: 'log', component: Log }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const path = to.path.split('/')[1]
  if (aMiniMenu.includes(path)) {
    store.commit('setAMenu', path)
  }
  if (hMiniMenu.includes(path)) {
    store.commit('setHMenu', path)
  }
  next()
})
export default router
