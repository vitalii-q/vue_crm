import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase/app"

Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    name: 'test',
    meta: {layout: 'empty'},
    component: () => import('../views/Test.vue')
  },

  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import('../views/Register.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Home')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Record.vue')
  },
  {
    path: '/record_detail/:id',
    name: 'record_detail',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Record-detail.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/History.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Planning.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Profile.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// проверка авторизации
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if(requireAuth && !currentUser) {
    next('/login?message=login') // перевод на страницу логина
  } else {
    next() // перевод за запрашиваемую страницу
  }
})

export default router
