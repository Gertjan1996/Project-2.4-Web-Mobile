import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: []
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../components/Admin.vue'),
    meta: {
      auth: ['Admin']
    }
  },
  {
    path: '/gebruiker',
    name: 'User',
    component: () => import('../components/User.vue'),
    meta: {
      auth: ['Admin', 'User']
    }
  },
  {
    path: '/categories',
    name: 'Categorieen',
    component: () => import('../components/Categories.vue'),
    meta: {
      auth: []
    }
  },
  {
    path: '/categorie/new',
    name: 'CreateCategory',
    component: () => import('../components/CreateCategory.vue'),
    meta: {
      auth: ['Admin']
    }
  },
  {
    path: '/categories/:categoryId',
    name: 'Category',
    props: true,
    component: () => import('../components/Category.vue'),
    meta: {
      auth: []
    }
  },
  {
    path: '/login',
    name: 'Inloggen',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/profiel',
    name: 'Profiel',
    component: () => import('../components/Profile.vue'),
    meta: {
      auth: ['User', 'Admin']
    }
  },
  {
    path: '/registreren',
    name: 'Registreren',
    component: () => import('../components/Register.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const { auth } = to.meta
  const user = store.getters.user
  if (auth) {
    if (!user) {
      return next('/login')
    }
    if (auth.length && !auth.includes(user.role)) {
      return next('/')
    }
  }
  next()
})

export default router
