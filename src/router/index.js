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
// home -
const BookDetail = () => import(/* webpackChunkName:'h-book-detail' */'@views/home/BookCenter/BookDetail')
// admin
const User = () => import(/* webpackChunkName:'a-user' */'@views/admin/User')
const Category = () => import(/* webpackChunkName:'a-category' */'@views/admin/Category')
const Book = () => import(/* webpackChunkName:'a-book' */'@views/admin/Book')
const Message = () => import(/* webpackChunkName:'a-message' */'@views/admin/Message')
const Correction = () => import(/* webpackChunkName:'a-correction' */'@views/admin/Correction')
const Borrow = () => import(/* webpackChunkName:'a-borrow' */'@views/admin/Borrow')
const Log = () => import(/* webpackChunkName:'a-log' */'@views/admin/Log')

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

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
      { path: '/bookCenter', name: 'bookCenter', component: BookCenter },
      { path: '/bookCenter/:id', name: 'bookDetail', component: BookDetail },
      { path: '/errata', name: 'errata', component: Errata },
      { path: '/messageBoard', name: 'messageBoard', component: MessageBoard },
      { path: '/info', name: 'info', component: Info }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    redirect: { name: 'user' },
    children: [
      { path: '/user', name: 'user', component: User },
      { path: '/category', name: 'category', component: Category },
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
  const user = store.state.currentUser
  if (aMiniMenu.includes(path)) {
    store.commit('setAMenu', path)
  } else if (hMiniMenu.includes(path)) {
    store.commit('setHMenu', path)
  }
  if (user === false || user === null) {
    if (path === 'login') {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    if (path === 'login') {
      next(from.path)
      // ques next(false) invalid
      // next(false)
    } else {
      if (user.level !== 1 && aMiniMenu.includes(path)) {
        next(from.path)
        // next(false)
      } else {
        next()
      }
    }
  }
  next()
})
export default router
