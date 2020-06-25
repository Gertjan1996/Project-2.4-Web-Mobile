import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

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
    component: () => import('../views/Admin.vue'),
    meta: {
      auth: ['Admin']
    }
  },
  {
    path: '/gebruiker',
    name: 'User',
    component: () => import('../views/User.vue'),
    meta: {
      auth: ['Admin', 'User']
    }
  },
  {
    path: '/categories',
    name: 'Categorieen',
    component: () => import('../views/Categories.vue'),
    meta: {
      auth: []
    }
  },
  {
    path: '/categorie/new',
    name: 'CreateCategory',
    component: () => import('../views/CreateCategory.vue'),
    meta: {
      auth: ['Admin']
    }
  },
  {
    path: '/categories/:categoryId',
    name: 'Category',
    props: true,
    component: () => import('../views/Category.vue'),
    meta: {
      auth: []
    }
  },
  {
    path: '/login',
    name: 'Inloggen',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/post/new',
    name: 'CreatePost',
    component: () => import('../views/Post.vue'),
    meta: {
      auth: ['User', 'Admin']
    }
  },
  {
    path: '/profiel',
    name: 'Profiel',
    component: () => import('../views/Profile.vue'),
    meta: {
      auth: ['User', 'Admin']
    }
  },
  {
    path: '/registreren',
    name: 'Registreren',
    component: () => import('../views/Register.vue')
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
